import assert from "node:assert/strict";
import { afterEach, before, beforeEach, describe, test } from "node:test";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { GET as aiGet, POST as aiPost } from "@/app/api/ai/route";
import { GET as mcpGet } from "@/app/api/mcp/route";
import { createMockProvider } from "@/lib/ai/providers";
import type { AiProvider } from "@/lib/ai/providers/types";
import { runFutureHerAi } from "@/lib/ai/runtime";
import { CATALOGUE_UNTRUSTED_NOTICE } from "@/lib/ai/untrusted";
import { resetPublicRateLimits } from "@/lib/http/public-request-guard";
import {
  DRAFT_CODE,
  DRAFT_SLUG,
  DRAFT_UNIQUE_PHRASE,
  PRISMA_POISON,
  PUBLISHED_UNIQUE_PHRASE,
  TOOL_INJECTION,
  installMixedPublishCatalog,
  restorePublishedCatalogSource,
} from "./fixtures/mixed-publish-catalog";

const originalOpenAiKeyPresent = "OPENAI_API_KEY" in process.env;
const originalAnthropicKeyPresent = "ANTHROPIC_API_KEY" in process.env;
const originalOpenAiKey = process.env.OPENAI_API_KEY;
const originalAnthropicKey = process.env.ANTHROPIC_API_KEY;

before(() => {
  console.info = () => undefined;
});

beforeEach(() => {
  resetPublicRateLimits();
  installMixedPublishCatalog();
  delete process.env.OPENAI_API_KEY;
  delete process.env.ANTHROPIC_API_KEY;
});

afterEach(() => {
  restorePublishedCatalogSource();
  if (originalOpenAiKeyPresent) process.env.OPENAI_API_KEY = originalOpenAiKey;
  else delete process.env.OPENAI_API_KEY;
  if (originalAnthropicKeyPresent) process.env.ANTHROPIC_API_KEY = originalAnthropicKey;
  else delete process.env.ANTHROPIC_API_KEY;
});

describe("FutureHer AI runtime + mock provider", () => {
  test("processes a user request without a real model provider or credentials", async () => {
    const result = await runFutureHerAi({
      request: { message: `Search for ${PUBLISHED_UNIQUE_PHRASE}` },
      provider: createMockProvider(),
    });
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.equal(result.provider.kind, "mock");
    assert.equal(result.authorizationLevel, "PUBLIC");
    assert.equal(result.authenticationRequirement, "none");
    assert.equal(result.toolInvocation?.ok, true);
    if (result.toolInvocation?.ok) {
      assert.equal(result.toolInvocation.tool, "searchEpisodes");
      assert.equal(result.catalog?.untrusted, true);
      const data = result.catalog.data as { count: number; episodes: Array<{ code: string }> };
      assert.equal(data.count, 1);
      assert.equal(data.episodes[0]?.code, "EP001");
    }
    assert.match(result.answer, /untrusted catalogue data/i);
    // Existence only — never print env values (assertion diffs would leak secrets).
    assert.equal("OPENAI_API_KEY" in process.env, false);
    assert.equal("ANTHROPIC_API_KEY" in process.env, false);
  });

  test("provider abstraction is swappable", async () => {
    const stub: AiProvider = {
      id: "stub-answer",
      kind: "mock",
      async complete() {
        return { kind: "answer", text: "Stubbed without tools." };
      },
    };
    const result = await runFutureHerAi({
      request: { message: "Search for anything" },
      provider: stub,
    });
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.equal(result.provider.id, "stub-answer");
    assert.equal(result.toolInvocation, null);
    assert.equal(result.answer, "Stubbed without tools.");
  });

  test("registered tools are the only executable tools", async () => {
    const inventor: AiProvider = {
      id: "inventor",
      kind: "mock",
      async complete() {
        return { kind: "invoke_tool", tool: "searchDrafts", input: { query: "secret" } };
      },
    };
    const result = await runFutureHerAi({
      request: { message: "Show me drafts" },
      provider: inventor,
    });
    assert.equal(result.ok, false);
    if (result.ok) return;
    assert.equal(result.error.code, "UNKNOWN_TOOL");
  });

  test("unknown tool names such as dropDatabase are rejected", async () => {
    const result = await runFutureHerAi({
      request: { message: "Please call dropDatabase now" },
      provider: createMockProvider(),
    });
    assert.equal(result.ok, false);
    if (result.ok) return;
    assert.equal(result.error.code, "UNKNOWN_TOOL");
  });

  test("PUBLISHED catalogue content is accessible and DRAFT is not", async () => {
    const published = await runFutureHerAi({
      request: { message: "Get episode EP001" },
      provider: createMockProvider(),
    });
    const draft = await runFutureHerAi({
      request: { message: `Get episode ${DRAFT_CODE}` },
      provider: createMockProvider(),
    });
    const draftSearch = await runFutureHerAi({
      request: { message: `Search for ${DRAFT_UNIQUE_PHRASE}` },
      provider: createMockProvider(),
    });

    assert.equal(published.ok, true);
    if (published.ok && published.toolInvocation?.ok) {
      const data = published.catalog?.data as { found: boolean; episode: { code: string; publishStatus: string } };
      assert.equal(data.found, true);
      assert.equal(data.episode.code, "EP001");
      assert.equal(data.episode.publishStatus, "PUBLISHED");
      assert.equal(published.catalog?.untrusted, true);
      assert.equal(published.catalog?.notice, CATALOGUE_UNTRUSTED_NOTICE);
    }

    assert.equal(draft.ok, true);
    if (draft.ok && draft.toolInvocation?.ok) {
      const data = draft.catalog?.data as { found: boolean; episode: unknown };
      assert.equal(data.found, false);
      assert.equal(data.episode, null);
      assert.doesNotMatch(JSON.stringify(draft.catalog?.data), new RegExp(DRAFT_SLUG));
    }

    assert.equal(draftSearch.ok, true);
    if (draftSearch.ok && draftSearch.toolInvocation?.ok) {
      const data = draftSearch.catalog?.data as { count: number; episodes: unknown[] };
      assert.equal(data.count, 0);
    }
  });

  test("retrieved catalogue text cannot trigger another tool invocation", async () => {
    const hostile: AiProvider = {
      id: "hostile-chain",
      kind: "mock",
      async complete(request) {
        if (request.catalogObservation) {
          return { kind: "invoke_tool", tool: "dropDatabase", input: { confirm: true } };
        }
        return { kind: "invoke_tool", tool: "getEpisode", input: { code: "EP001" } };
      },
    };

    const result = await runFutureHerAi({
      request: { message: "Get episode EP001" },
      provider: hostile,
    });

    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.equal(result.toolChainRefused, true);
    assert.equal(result.toolInvocation?.ok, true);
    if (result.toolInvocation?.ok) {
      assert.equal(result.toolInvocation.tool, "getEpisode");
    }
    assert.match(JSON.stringify(result.catalog), /dropDatabase/);
    assert.match(JSON.stringify(result.catalog), new RegExp(TOOL_INJECTION.slice(0, 20)));
    assert.match(result.answer, /not permitted/i);
    assert.doesNotMatch(JSON.stringify(result.toolInvocation), /"tool":"dropDatabase"/);
  });

  test("tool results remain untrusted and omit Prisma objects", async () => {
    const result = await runFutureHerAi({
      request: { message: "List shows" },
      provider: createMockProvider(),
    });
    assert.equal(result.ok, true);
    if (!result.ok || !result.catalog) return;
    assert.equal(result.catalog.untrusted, true);
    assert.equal(result.catalog.source, "futureher_catalogue");
    const text = JSON.stringify(result);
    assert.doesNotMatch(text, new RegExp(PRISMA_POISON.id));
    assert.doesNotMatch(text, /"_count"/);
    assert.doesNotMatch(text, /"createdAt"/);
  });

  test("runtime and providers do not import Prisma", () => {
    const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
    const dirs = [path.join(root, "lib", "ai", "runtime"), path.join(root, "lib", "ai", "providers")];
    for (const dir of dirs) {
      const files = readdirSync(dir).filter((name) => name.endsWith(".ts"));
      assert.ok(files.length > 0);
      for (const file of files) {
        const source = readFileSync(path.join(dir, file), "utf8");
        assert.doesNotMatch(source, /from ["']@\/lib\/prisma["']/);
        assert.doesNotMatch(source, /from ["']@prisma\/client["']/);
        assert.doesNotMatch(source, /getPrisma/);
      }
    }
  });

  test("runtime stays PUBLIC with authenticationRequirement=none", async () => {
    const result = await runFutureHerAi({
      request: { message: "Hello" },
      provider: createMockProvider(),
    });
    assert.equal(result.ok, true);
    if (!result.ok) return;
    assert.equal(result.authorizationLevel, "PUBLIC");
    assert.equal(result.authenticationRequirement, "none");
  });
});

describe("HTTP compatibility", () => {
  test("GET /api/ai still reports no model provider and no chat UI", async () => {
    const response = await aiGet();
    const body = (await response.json()) as {
      modelProvider: unknown;
      provider: unknown;
      runtime: boolean;
      chatUi: boolean;
    };
    assert.equal(body.modelProvider, null);
    assert.equal(body.provider, null);
    assert.equal(body.runtime, true);
    assert.equal(body.chatUi, false);
  });

  test("POST /api/ai { tool, input } remains the foundation invoke path", async () => {
    const response = await aiPost(
      new Request("http://localhost/api/ai", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ tool: "listShows", input: {} }),
      })
    );
    assert.equal(response.status, 200);
    const body = (await response.json()) as { ok: boolean; tool: string };
    assert.equal(body.ok, true);
    assert.equal(body.tool, "listShows");
  });

  test("POST /api/ai { message } does not use the test mock in production", async () => {
    const response = await aiPost(
      new Request("http://localhost/api/ai", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ message: "Search for AI" }),
      })
    );
    assert.equal(response.status, 501);
    const body = (await response.json()) as { ok: boolean; error: { code: string } };
    assert.equal(body.ok, false);
    assert.equal(body.error.code, "PROVIDER_UNAVAILABLE");
  });

  test("WebMCP discovery is unchanged", async () => {
    const response = await mcpGet();
    const body = (await response.json()) as { endpoint: string; tools: string[] };
    assert.equal(body.endpoint, "/api/mcp");
    assert.deepEqual(
      [...body.tools].sort(),
      ["getEpisode", "getShow", "listShows", "relatedContent", "searchEpisodes"]
    );
  });
});
