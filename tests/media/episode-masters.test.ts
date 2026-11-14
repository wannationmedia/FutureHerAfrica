import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import path from "node:path";
import { describe, test } from "node:test";

import { resolveEpisodeMaster } from "@/lib/media/episode-masters";

describe("local episode masters", () => {
  test("resolves the EP001 classroom master under launch/", () => {
    const filePath = resolveEpisodeMaster("ep001");
    assert.ok(filePath);
    assert.equal(path.basename(filePath), "EP001_FutureHerAfrica_FINAL.mp4");
    assert.ok(filePath.startsWith(path.resolve(process.cwd(), "launch")));
    assert.equal(existsSync(filePath), true);
    assert.equal(resolveEpisodeMaster("EP001"), filePath);
  });

  test("rejects unknown and path-like codes", () => {
    assert.equal(resolveEpisodeMaster("ep002"), null);
    assert.equal(resolveEpisodeMaster("../secret"), null);
    assert.equal(resolveEpisodeMaster("ep001/../../package.json"), null);
  });
});
