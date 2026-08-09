import fs from "fs";
import path from "path";
import { REPO_ROOT } from "./env.mjs";

const PROFILES_PATH = path.join(
  REPO_ROOT,
  "launch/VOICE/VOICE_PROFILES.json"
);

export function loadProfiles() {
  return JSON.parse(fs.readFileSync(PROFILES_PATH, "utf8"));
}

export function resolveVoiceId(langProfile) {
  const fromEnv = process.env[langProfile.voiceIdEnv]?.trim();
  if (fromEnv) return fromEnv;
  return langProfile.defaultVoiceId;
}

export function assertFemaleVoiceId(voiceId, langCode) {
  if (!voiceId) {
    throw new Error(`[${langCode}] Missing female voice ID.`);
  }
  const lower = voiceId.toLowerCase();
  const maleHints = [
    "luke",
    "themba",
    "willem",
    "brian",
    "byron",
    "male",
    "matthew",
    "guy",
    "andrew",
  ];
  if (maleHints.some((h) => lower.includes(h))) {
    throw new Error(
      `[${langCode}] Male or prohibited voice ID refused: ${voiceId}`
    );
  }
}
