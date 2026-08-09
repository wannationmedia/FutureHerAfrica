import fs from "fs";
import path from "path";
import { REPO_ROOT } from "./env.mjs";

const SKIP_PREFIXES = [
  "on-screen:",
  "demo notes:",
  "pinned comment:",
  "outro slots",
  "end card:",
  "framework name:",
  "series:",
  "topic:",
  "framework:",
  "target:",
  "read calm",
];

export function episodeDir(episode) {
  return path.join(REPO_ROOT, "launch", episode.toUpperCase());
}

export function loadSpeakableScript(episode, langProfile) {
  const filePath = path.join(episodeDir(episode), langProfile.scriptFile);
  if (!fs.existsSync(filePath)) {
    throw new Error(
      `[${langProfile.code}] Approved script missing: ${path.relative(
        REPO_ROOT,
        filePath
      )}. Do not substitute another language.`
    );
  }
  const raw = fs.readFileSync(filePath, "utf8");
  const speakable = extractSpeakableText(raw);
  if (!speakable.trim()) {
    throw new Error(
      `[${langProfile.code}] Script produced empty speakable text: ${langProfile.scriptFile}`
    );
  }
  return {
    sourceScript: path.relative(REPO_ROOT, filePath).replace(/\\/g, "/"),
    raw,
    speakable,
  };
}

export function extractSpeakableText(raw) {
  const lines = raw.replace(/\r\n/g, "\n").split("\n");
  const out = [];
  let started = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!started) {
      if (trimmed === "---") {
        started = true;
      }
      continue;
    }
    if (!trimmed) {
      out.push("");
      continue;
    }
    if (trimmed === "---") continue;
    if (/^\[[^\]]+\]$/.test(trimmed)) continue;
    if (/^\[[^\]]+\]\s*\[[^\]]+\]$/.test(trimmed)) continue;
    const lower = trimmed.toLowerCase();
    if (SKIP_PREFIXES.some((p) => lower.startsWith(p))) continue;
    if (trimmed === "/") {
      out.push('<break time="600ms"/>');
      continue;
    }
    if (trimmed.endsWith("/")) {
      out.push(escapeXml(trimmed.slice(0, -1).trim()));
      out.push('<break time="600ms"/>');
      continue;
    }
    out.push(escapeXml(trimmed));
  }

  return out
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function escapeXml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function wrapSsml({ locale, voiceId, speakable, speakingRate = 1.0 }) {
  const ratePct = `${Math.round(speakingRate * 100)}%`;
  return `<?xml version="1.0" encoding="UTF-8"?>
<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="${locale}">
  <voice name="${voiceId}">
    <prosody rate="${ratePct}">
${speakable}
    </prosody>
  </voice>
</speak>`;
}
