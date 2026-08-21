import assert from "node:assert/strict";
import { afterEach, before, beforeEach, describe, test } from "node:test";

import { POST as aiPost } from "@/app/api/ai/route";
import { POST as mcpPost } from "@/app/api/mcp/route";
import {
  PUBLIC_AI_MESSAGE_LIMIT,
  PUBLIC_AI_POST_LIMIT,
  PUBLIC_JSON_BODY_LIMIT_BYTES,
  PUBLIC_MCP_POST_LIMIT,
  consumePublicPostBudget,
  resetPublicRateLimits,
} from "@/lib/http/public-request-guard";
import { installMixedPublishCatalog, restorePublishedCatalogSource } from "./fixtures/mixed-publish-catalog";

const originalKeyPresent = "OPENAI_API_KEY" in process.env;
const originalKey = process.env.OPENAI_API_KEY;

before(() => {
  console.info = () => undefined;
});

beforeEach(() => {
  resetPublicRateLimits();
  installMixedPublishCatalog();
  delete process.env.OPENAI_API_KEY;
});

afterEach(() => {
  restorePublishedCatalogSource();
  resetPublicRateLimits();
  if (originalKeyPresent && originalKey !== undefined) process.env.OPENAI_API_KEY = originalKey;
  else delete process.env.OPENAI_API_KEY;
});

describe("public POST request guards", () => {
  test("rejects oversized AI and MCP bodies before parse", async () => {
    const oversized = "x".repeat(PUBLIC_JSON_BODY_LIMIT_BYTES);
    const ai = await aiPost(
      jsonRequest("http://localhost/api/ai", { tool: "getEpisode", input: { q: oversized } }, "203.0.113.8")
    );
    assert.equal(ai.status, 413);
    const aiBody = (await ai.json()) as { ok: boolean; error: { code: string } };
    assert.equal(aiBody.error.code, "PAYLOAD_TOO_LARGE");

    const mcp = await mcpPost(
      jsonRequest(
        "http://localhost/api/mcp",
        { jsonrpc: "2.0", id: 1, method: "ping", params: { q: oversized } },
        "203.0.113.9"
      )
    );
    assert.equal(mcp.status, 413);
  });

  test("rate-limits { message } more strictly than direct tool invokes", async () => {
    const ip = "203.0.113.10";
    for (let i = 0; i < PUBLIC_AI_MESSAGE_LIMIT; i += 1) {
      const response = await aiPost(jsonRequest("http://localhost/api/ai", { message: "Hello" }, ip));
      assert.equal(response.status, 501);
    }
    const blocked = await aiPost(jsonRequest("http://localhost/api/ai", { message: "Hello" }, ip));
    assert.equal(blocked.status, 429);
    assert.equal(blocked.headers.get("retry-after"), "60");
    const body = (await blocked.json()) as { ok: boolean; error: { code: string } };
    assert.equal(body.error.code, "RATE_LIMITED");

    const tool = await aiPost(
      jsonRequest("http://localhost/api/ai", { tool: "listShows", input: {} }, ip)
    );
    assert.equal(tool.status, 200);
  });

  test("rate-limits MCP POSTs per IP", async () => {
    const ip = "203.0.113.20";
    for (let i = 0; i < PUBLIC_MCP_POST_LIMIT; i += 1) {
      const response = await mcpPost(
        jsonRequest(
          "http://localhost/api/mcp",
          { jsonrpc: "2.0", id: i, method: "ping" },
          ip
        )
      );
      assert.equal(response.status, 200);
    }
    const blocked = await mcpPost(
      jsonRequest("http://localhost/api/mcp", { jsonrpc: "2.0", id: 99, method: "ping" }, ip)
    );
    assert.equal(blocked.status, 429);
  });

  test("token buckets isolate IPs and reset between tests", () => {
    const first = new Request("http://localhost/api/ai", {
      headers: { "x-forwarded-for": "198.51.100.1" },
    });
    const second = new Request("http://localhost/api/ai", {
      headers: { "x-forwarded-for": "198.51.100.2" },
    });
    for (let i = 0; i < PUBLIC_AI_POST_LIMIT; i += 1) {
      assert.equal(consumePublicPostBudget(first, "ai-post"), true);
    }
    assert.equal(consumePublicPostBudget(first, "ai-post"), false);
    assert.equal(consumePublicPostBudget(second, "ai-post"), true);
  });
});

function jsonRequest(url: string, body: unknown, ip: string) {
  return new Request(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": ip,
    },
    body: JSON.stringify(body),
  });
}
