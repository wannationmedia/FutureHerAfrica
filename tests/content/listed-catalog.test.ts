import assert from "node:assert/strict";
import { describe, test } from "node:test";

import { EPISODES, PLAYLISTS, SEASON, SHOW } from "@/lib/catalog";
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

  test("the static editorial seed currently has no listed episodes", () => {
    const listed = listedCatalog(staticCatalog());
    assert.equal(listed.episodes.length, 0);
    assert.equal(listed.featured, null);
    assert.equal(listed.playlists.length, 0);
    for (const episode of staticCatalog().episodes) {
      assert.equal(episode.publishStatus, "DRAFT");
      assert.equal(isListedEpisode(episode), false);
    }
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
