#!/usr/bin/env node
import { loadEnvFile } from "./lib/env.mjs";
import { generateEpisodeVoice } from "./lib/engine.mjs";

loadEnvFile();

function parseArgs(argv) {
  const args = {
    episode: "EP001",
    languages: ["EN", "ZU"],
    speakingRate: 1.0,
    style: "editorial",
  };

  const positional = [];
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--episode" && argv[i + 1]) {
      args.episode = argv[++i];
      continue;
    }
    if (a.startsWith("--episode=")) {
      args.episode = a.slice("--episode=".length);
      continue;
    }
    if (a === "--languages" && argv[i + 1]) {
      args.languages = argv[++i].split(",").map((s) => s.trim()).filter(Boolean);
      continue;
    }
    if (a.startsWith("--languages=")) {
      args.languages = a
        .slice("--languages=".length)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
      continue;
    }
    if (a === "--rate" && argv[i + 1]) {
      args.speakingRate = Number(argv[++i]);
      continue;
    }
    if (a === "--style" && argv[i + 1]) {
      args.style = argv[++i];
      continue;
    }
    if (a === "--help" || a === "-h") {
      args.help = true;
      continue;
    }
    if (!a.startsWith("-")) positional.push(a);
  }

  // npm run voice:episode -- EP002 --languages=en,zu
  if (positional[0] && /^EP\d{3}$/i.test(positional[0])) {
    args.episode = positional[0];
  }
  return args;
}

function printHelp() {
  console.log(`FutureHerAfrica Voice Engine

Usage:
  npm run voice:ep001 -- --languages=en,zu
  npm run voice:ep001 -- --languages=en,nso,ve,ts,zu
  npm run voice:episode -- EP002 --languages=en,zu

Rules:
  - Female African voices only
  - Unsupported languages fail closed (no substitution)
  - WAV masters only
  - No generation without Azure credentials for EN/ZU
`);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    process.exit(0);
  }

  console.log(
    `FutureHerAfrica Voice Engine · ${args.episode.toUpperCase()} · languages=${args.languages
      .map((l) => l.toUpperCase())
      .join(",")}`
  );

  const result = await generateEpisodeVoice({
    episode: args.episode,
    languages: args.languages,
    speakingRate: args.speakingRate,
    style: args.style,
  });

  for (const item of result.items) {
    const mark = item.status === "PASS" ? "PASS" : "FAIL";
    console.log(
      `  ${item.language}: ${mark}${
        item.reasons?.length ? ` — ${item.reasons.join("; ")}` : ""
      }`
    );
  }

  console.log(`Manifest: ${result.manifestPath}`);
  console.log(`QC:       ${result.qcPath}`);
  console.log(`Audio generated: ${result.generatedAny ? "YES" : "NO"}`);

  if (result.credentialGate) {
    console.error(`\nBLOCKER: ${result.credentialGate}`);
    process.exit(2);
  }
  if (!result.allPass) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
