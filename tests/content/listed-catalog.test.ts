import assert from "node:assert/strict";
import { describe, test } from "node:test";

import { EPISODES, PLAYLISTS, SEASON, SHOW, isLocalVideoPath } from "@/lib/catalog";
import { isListedEpisode, listedCatalog, type PublicCatalog, type PublicEpisode } from "@/lib/content";
import { mixedPublishCatalog } from "../ai/fixtures/mixed-publish-catalog";

describe("public page catalogue listing", () => {
  test("listedCatalog and isListedEpisode hide DRAFT from page data", () => {
    const listed = listedCatalog(mixedPublishCatalog);
    const published = mixedPublishCatalog.episodes.filter((episode) => episode.publishStatus === "PUBLISHED");
    const drafts = mixedPublishCatalog.episodes.filter((episode) => episode.publishStatus !== "PUBLISHED");

    assert.ok(published.length > 0);
    assert.ok(drafts.length > 0);
    assert.equal(listed.episodes.length, published.length);
    assert.deepEqual(
      listed.episodes.map((episode) => episode.code),
      published.map((episode) => episode.code)
    );

    for (const episode of listed.episodes) {
      assert.equal(isListedEpisode(episode), true);
      assert.equal(episode.publishStatus, "PUBLISHED");
    }
    for (const episode of drafts) {
      assert.equal(isListedEpisode(episode), false);
      assert.equal(
        listed.episodes.some((entry) => entry.code === episode.code || entry.slug === episode.slug),
        false
      );
    }

    assert.equal(listed.featured?.publishStatus, "PUBLISHED");
    assert.equal(
      listed.playlists.some((playlist) =>
        playlist.episodes.some((episode) => episode.publishStatus !== "PUBLISHED")
      ),
      false
    );
    assert.doesNotMatch(JSON.stringify(listed), /EP003/);
    assert.doesNotMatch(JSON.stringify(listed), /ep003-phone-first-ai-flow/);
  });

  test("the static editorial seed lists EP001 only", () => {
    const listed = listedCatalog(staticCatalog());
    assert.equal(listed.episodes.length, 1);
    assert.equal(listed.episodes[0]?.code, "EP001");
    assert.equal(listed.featured?.code, "EP001");
    assert.equal(listed.featured?.localVideoPath, "/api/media/episodes/ep001.mp4");
    assert.equal(isLocalVideoPath(listed.featured?.localVideoPath), true);
    assert.equal(listed.playlists.length, 1);
    assert.deepEqual(listed.playlists[0]?.episodeCodes, ["EP001"]);
    for (const episode of staticCatalog().episodes) {
      if (episode.code === "EP001") {
        assert.equal(episode.publishStatus, "PUBLISHED");
        assert.equal(isListedEpisode(episode), true);
      } else {
        assert.equal(episode.publishStatus, "DRAFT");
        assert.equal(isListedEpisode(episode), false);
      }
    }
  });

  test("isLocalVideoPath only accepts classroom media paths", () => {
    assert.equal(isLocalVideoPath("/media/episodes/ep001.mp4"), true);
    assert.equal(isLocalVideoPath("/api/media/episodes/ep001.mp4"), true);
    assert.equal(isLocalVideoPath("https://example.com/ep001.mp4"), false);
    assert.equal(isLocalVideoPath("/media/episodes/../secret.mp4"), false);
    assert.equal(isLocalVideoPath("/launch/EP001/PUBLISH/EP001_FutureHerAfrica_FINAL.mp4"), false);
  });
});

function staticCatalog(): PublicCatalog {
  const episodes: PublicEpisode[] = EPISODES.map((episode) => ({
    ...episode,
    showSlug: SHOW.slug,
    seasonSlug: SEASON.slug,
    seasonTitle: SEASON.title,
  }));
  const featured = episodes[0];
  if (!featured) {
    throw new Error("Editorial catalogue seed is empty.");
  }
  return {
    source: "catalog",
    show: SHOW,
    season: SEASON,
    episodes,
    playlists: PLAYLISTS.map((playlist) => ({
      ...playlist,
      episodes: playlist.episodeCodes
        .map((code) => episodes.find((episode) => episode.code === code))
        .filter((episode): episode is PublicEpisode => Boolean(episode)),
    })),
    featured,
  };
}
