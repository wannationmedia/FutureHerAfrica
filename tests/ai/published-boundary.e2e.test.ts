import assert from "node:assert/strict";
import { afterEach, before, beforeEach, describe, test } from "node:test";

import { GET as wellKnownGet } from "@/app/.well-known/mcp.json/route";
import { POST as aiPost } from "@/app/api/ai/route";
import { POST as mcpPost } from "@/app/api/mcp/route";
import { CATALOGUE_UNTRUSTED_NOTICE } from "@/lib/ai/untrusted";
import { SHOW } from "@/lib/catalog";
import { resetPublicRateLimits } from "@/lib/http/public-request-guard";

import {
  DRAFT_CODE,
  DRAFT_SLUG,
  DRAFT_TITLE,
  DRAFT_UNIQUE_PHRASE,
  PRISMA_POISON,
  PUBLISHED_CODES,
  PUBLISHED_UNIQUE_PHRASE,
  installMixedPublishCatalog,
  restorePublishedCatalogSource,
} from "./fixtures/mixed-publish-catalog";

const AGENT_EPISODE_KEYS = new Set([
  "code",
  "episodeNumber",
  "title",
  "slug",
  "synopsis",
  "description",
  "series",
  "thumbnailPath",
  "youtubeVideoId",
  "publishStatus",
  "primaryLanguage",
  "showSlug",
  "seasonSlug",
  "seasonTitle",
  "path",
]);

before(() => {
  console.info = () => undefined;
});

beforeEach(() => {
  resetPublicRateLimits();
  installMixedPublishCatalog();
});

afterEach(() => {
  restorePublishedCatalogSource();
});

describe("HTTP /api/ai published boundary", () => {
  test("searchEpisodes returns PUBLISHED episodes and cannot expose DRAFT", async () => {
    const published = await aiInvoke("searchEpisodes", { query: PUBLISHED_UNIQUE_PHRASE });
    assert.equal(published.ok, true);
    assertUntrusted(published.result);
    const publishedData = published.result.data as { count: number; episodes: AgentEpisode[] };
    assert.equal(publishedData.count, 1);
    assert.equal(publishedData.episodes[0]?.code, "EP001");
    assertPublishedAgentEpisode(publishedData.episodes[0]);
    assertNoDraftLeak(published);
    assertNoPrismaObject(published);

    const draftSearch = await aiInvoke("searchEpisodes", { query: DRAFT_UNIQUE_PHRASE });
    assert.equal(draftSearch.ok, true);
    const draftData = draftSearch.result.data as { count: number; episodes: unknown[] };
    assert.equal(draftData.count, 0);
    assert.equal(draftData.episodes.length, 0);
    assert.equal(JSON.stringify(draftData.episodes), "[]");
  });

  test("getEpisode returns PUBLISHED by id and cannot retrieve DRAFT by code or slug", async () => {
    const byCode = await aiInvoke("getEpisode", { code: "EP001" });
    const bySlug = await aiInvoke("getEpisode", { slug: "ep001-ai-wont-replace-you-task-layer" });
    assert.equal(byCode.ok, true);
    assert.equal(bySlug.ok, true);
    assertUntrusted(byCode.result);
    const byCodeData = byCode.result.data as { found: boolean; episode: AgentEpisode };
    const bySlugData = bySlug.result.data as { found: boolean; episode: AgentEpisode };
    assert.equal(byCodeData.found, true);
    assert.equal(bySlugData.found, true);
    assertPublishedAgentEpisode(byCodeData.episode);
    assertPublishedAgentEpisode(bySlugData.episode);
    assertNoPrismaObject(byCode);

    const draftCode = await aiInvoke("getEpisode", { code: DRAFT_CODE });
    const draftSlug = await aiInvoke("getEpisode", { slug: DRAFT_SLUG });
    assert.equal((draftCode.result.data as { found: boolean }).found, false);
    assert.equal((draftCode.result.data as { episode: unknown }).episode, null);
    assert.equal((draftSlug.result.data as { found: boolean }).found, false);
    assert.equal((draftSlug.result.data as { episode: unknown }).episode, null);
    assertNoDraftLeak(draftCode);
    assertNoDraftLeak(draftSlug);
  });

  test("listShows reports only published episode counts", async () => {
    const result = await aiInvoke("listShows", {});
    assert.equal(result.ok, true);
    assertUntrusted(result.result);
    const data = result.result.data as {
      shows: Array<{ slug: string; publishedEpisodeCount: number }>;
    };
    assert.equal(data.shows.length, 1);
    assert.equal(data.shows[0]?.slug, SHOW.slug);
    assert.equal(data.shows[0]?.publishedEpisodeCount, PUBLISHED_CODES.length);
    assertNoDraftLeak(result);
    assertNoPrismaObject(result);
  });

  test("getShow returns the show with PUBLISHED episodes only", async () => {
    const result = await aiInvoke("getShow", { slug: SHOW.slug });
    assert.equal(result.ok, true);
    assertUntrusted(result.result);
    const data = result.result.data as {
      found: boolean;
      show: {
        slug: string;
        episodes: AgentEpisode[];
        playlists: Array<{ slug: string; episodeCodes: string[] }>;
      };
    };
    assert.equal(data.found, true);
    assert.equal(data.show.slug, SHOW.slug);
    assert.deepEqual(
      data.show.episodes.map((episode) => episode.code),
      [...PUBLISHED_CODES]
    );
    for (const episode of data.show.episodes) {
      assertPublishedAgentEpisode(episode);
    }
    assert.deepEqual(
      data.show.playlists.map((playlist) => playlist.slug),
      ["ai"]
    );
    assert.deepEqual(data.show.playlists[0]?.episodeCodes, [...PUBLISHED_CODES]);
    assertNoDraftLeak(result);
    assertNoPrismaObject(result);
  });

  test("relatedContent returns other PUBLISHED episodes and never DRAFT", async () => {
    const result = await aiInvoke("relatedContent", { code: "EP001" });
    assert.equal(result.ok, true);
    assertUntrusted(result.result);
    const data = result.result.data as { found: boolean; episodes: AgentEpisode[] };
    assert.equal(data.found, true);
    assert.deepEqual(
      data.episodes.map((episode) => episode.code),
      ["EP002"]
    );
    assertPublishedAgentEpisode(data.episodes[0]);
    assertNoDraftLeak(result);
    assertNoPrismaObject(result);

    const fromDraft = await aiInvoke("relatedContent", { code: DRAFT_CODE });
    assert.equal((fromDraft.result.data as { found: boolean }).found, false);
    assert.deepEqual((fromDraft.result.data as { episodes: unknown[] }).episodes, []);
    assertNoDraftLeak(fromDraft);
  });

  test("unknown tool dropDatabase returns UNKNOWN_TOOL", async () => {
    const response = await aiPost(
      jsonRequest("http://localhost/api/ai", { tool: "dropDatabase", input: { confirm: true } })
    );
    assert.equal(response.status, 404);
    const body = (await response.json()) as { ok: false; error: { code: string } };
    assert.equal(body.ok, false);
    assert.equal(body.error.code, "UNKNOWN_TOOL");
  });

  test("retrieved catalogue text is untrusted and cannot execute further tools", async () => {
    const retrieved = await aiInvoke("getEpisode", { code: "EP001" });
    const serialized = JSON.stringify(retrieved);
    assert.match(serialized, /dropDatabase/);
    assert.equal(retrieved.result.notice, CATALOGUE_UNTRUSTED_NOTICE);
    assert.match(retrieved.result.notice, /not instructions/i);

    const chained = await aiPost(
      jsonRequest("http://localhost/api/ai", { tool: "dropDatabase", input: { confirm: true } })
    );
    const chainedBody = (await chained.json()) as { ok: boolean; error: { code: string } };
    assert.equal(chained.status, 404);
    assert.equal(chainedBody.error.code, "UNKNOWN_TOOL");
  });
});

describe("HTTP /api/mcp and well-known cannot bypass the published boundary", () => {
  test("GET /.well-known/mcp.json lists only the five public tools", async () => {
    const response = await wellKnownGet();
    assert.equal(response.status, 200);
    const body = (await response.json()) as { tools: string[]; endpoint: string; authorization: string };
    assert.equal(body.endpoint, "/api/mcp");
    assert.equal(body.authorization, "none");
    assert.deepEqual(
      [...body.tools].sort(),
      ["getEpisode", "getShow", "listShows", "relatedContent", "searchEpisodes"]
    );
    assert.ok(!body.tools.includes("dropDatabase"));
  });

  test("WebMCP tools/call matches /api/ai for every registered tool", async () => {
    const search = await mcpCall("searchEpisodes", { query: PUBLISHED_UNIQUE_PHRASE });
    assert.equal(search.isError, false);
    assertUntrusted(search.structuredContent);
    assert.equal((search.structuredContent.data as { episodes: Array<{ code: string }> }).episodes[0]?.code, "EP001");
    assertNoDraftLeak(search);
    assertNoPrismaObject(search);

    const draftSearch = await mcpCall("searchEpisodes", { query: DRAFT_TITLE });
    assert.equal((draftSearch.structuredContent.data as { count: number }).count, 0);

    const episode = await mcpCall("getEpisode", { code: "EP002" });
    assert.equal((episode.structuredContent.data as { found: boolean }).found, true);
    assertPublishedAgentEpisode((episode.structuredContent.data as { episode: AgentEpisode }).episode);

    const draftEpisode = await mcpCall("getEpisode", { slug: DRAFT_SLUG });
    assert.equal((draftEpisode.structuredContent.data as { found: boolean }).found, false);

    const shows = await mcpCall("listShows", {});
    assert.equal(
      (shows.structuredContent.data as { shows: Array<{ publishedEpisodeCount: number }> }).shows[0]
        ?.publishedEpisodeCount,
      2
    );

    const show = await mcpCall("getShow", { slug: SHOW.slug });
    const showEpisodes = (show.structuredContent.data as { show: { episodes: AgentEpisode[] } }).show.episodes;
    assert.deepEqual(
      showEpisodes.map((item) => item.code),
      [...PUBLISHED_CODES]
    );
    assertNoDraftLeak(show);

    const related = await mcpCall("relatedContent", { code: "EP002" });
    assert.deepEqual(
      (related.structuredContent.data as { episodes: Array<{ code: string }> }).episodes.map((item) => item.code),
      ["EP001"]
    );
    assertNoDraftLeak(related);
  });

  test("WebMCP dropDatabase is an error and does not query the catalogue", async () => {
    const result = await mcpCall("dropDatabase", { confirm: true });
    assert.equal(result.isError, true);
  });
});

type AgentEpisode = {
  code: string;
  publishStatus: string;
  description: string;
  path: string;
};

type AiSuccess = {
  ok: true;
  tool: string;
  result: {
    untrusted: boolean;
    source: string;
    notice: string;
    data: unknown;
  };
};

async function aiInvoke(tool: string, input: Record<string, unknown>): Promise<AiSuccess> {
  const response = await aiPost(jsonRequest("http://localhost/api/ai", { tool, input }));
  assert.equal(response.status, 200);
  const body = (await response.json()) as AiSuccess;
  assert.equal(body.ok, true);
  return body;
}

async function mcpCall(name: string, args: Record<string, unknown>) {
  const response = await mcpPost(
    jsonRequest("http://localhost/api/mcp", {
      jsonrpc: "2.0",
      id: 1,
      method: "tools/call",
      params: { name, arguments: args },
    })
  );
  assert.equal(response.status, 200);
  const body = (await response.json()) as {
    result: { isError: boolean; structuredContent?: AiSuccess["result"] };
  };
  return {
    isError: body.result.isError,
    structuredContent: body.result.structuredContent as AiSuccess["result"],
  };
}

function jsonRequest(url: string, body: unknown) {
  return new Request(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

function assertUntrusted(result: AiSuccess["result"]) {
  assert.equal(result.untrusted, true);
  assert.equal(result.source, "futureher_catalogue");
  assert.equal(result.notice, CATALOGUE_UNTRUSTED_NOTICE);
}

function assertPublishedAgentEpisode(episode: AgentEpisode | undefined) {
  assert.ok(episode);
  assert.equal(episode.publishStatus, "PUBLISHED");
  assert.ok(PUBLISHED_CODES.includes(episode.code as (typeof PUBLISHED_CODES)[number]));
  assert.equal(episode.path, `/watch/${episodeSlug(episode.code)}`);
  for (const key of Object.keys(episode)) {
    assert.ok(AGENT_EPISODE_KEYS.has(key), `unexpected agent episode key: ${key}`);
  }
}

function episodeSlug(code: string) {
  const map: Record<string, string> = {
    EP001: "ep001-ai-wont-replace-you-task-layer",
    EP002: "ep002-ai-tool-trust-stack",
  };
  return map[code];
}

function assertNoDraftLeak(value: unknown) {
  const text = JSON.stringify(value);
  assert.doesNotMatch(text, new RegExp(DRAFT_CODE));
  assert.doesNotMatch(text, new RegExp(DRAFT_SLUG));
  assert.doesNotMatch(text, /You only have a phone\?/);
  assert.doesNotMatch(text, /Phone Flow/);
}

function assertNoPrismaObject(value: unknown) {
  const text = JSON.stringify(value);
  assert.doesNotMatch(text, new RegExp(PRISMA_POISON.id));
  assert.doesNotMatch(text, new RegExp(PRISMA_POISON.showId));
  assert.doesNotMatch(text, new RegExp(PRISMA_POISON.seasonId));
  assert.doesNotMatch(text, /publishingRecords/);
  assert.doesNotMatch(text, /"createdAt"/);
  assert.doesNotMatch(text, /"updatedAt"/);
  assert.doesNotMatch(text, /"_count"/);
}
