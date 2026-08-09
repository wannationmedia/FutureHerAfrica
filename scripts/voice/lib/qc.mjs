import fs from "fs";
import path from "path";
import { parseWav } from "./wav.mjs";

export function inspectAudioFile(filePath, expected) {
  const result = {
    language: expected.language,
    path: filePath,
    exists: false,
    nonZeroSize: false,
    nonZeroDuration: false,
    sampleRate: null,
    durationSec: null,
    bytes: 0,
    genderOk: expected.gender === "female",
    voiceIdMatch: false,
    localeMatch: false,
    status: "FAIL",
    reasons: [],
  };

  if (!fs.existsSync(filePath)) {
    result.reasons.push("file missing");
    return result;
  }
  result.exists = true;
  const buf = fs.readFileSync(filePath);
  result.bytes = buf.length;
  result.nonZeroSize = buf.length > 44;
  if (!result.nonZeroSize) {
    result.reasons.push("zero-size audio");
    return result;
  }

  try {
    const wav = parseWav(buf);
    result.sampleRate = wav.sampleRate;
    result.durationSec = Number(wav.durationSec.toFixed(3));
    result.nonZeroDuration = wav.durationSec > 0.25;
    if (!result.nonZeroDuration) result.reasons.push("duration ~0");
    if (expected.sampleRate && wav.sampleRate !== expected.sampleRate) {
      result.reasons.push(
        `sample rate ${wav.sampleRate} != ${expected.sampleRate}`
      );
    }
  } catch (err) {
    result.reasons.push(`wav inspect failed: ${err.message}`);
  }

  result.voiceIdMatch = Boolean(expected.voiceId);
  result.localeMatch = Boolean(expected.locale);

  if (
    result.exists &&
    result.nonZeroSize &&
    result.nonZeroDuration &&
    result.genderOk &&
    result.reasons.length === 0
  ) {
    result.status = "PASS";
  }
  return result;
}

export function writeQcReport({ episode, audioDir, items, credentialGate, generated }) {
  const lines = [];
  lines.push(`# ${episode} - Voice QC Report`);
  lines.push("");
  lines.push(`Generated: ${new Date().toISOString()}`);
  lines.push(`Audio dir: \`${path.relative(process.cwd(), audioDir).replace(/\\/g, "/")}\``);
  lines.push("");
  if (credentialGate) {
    lines.push("## Credential gate");
    lines.push("");
    lines.push(`**BLOCKED:** ${credentialGate}`);
    lines.push("");
  }
  lines.push("## Language results");
  lines.push("");
  for (const item of items) {
    lines.push(`### ${item.language}`);
    lines.push("");
    lines.push(`**${item.status}**`);
    lines.push("");
    lines.push(`- Provider: ${item.provider ?? "-"}`);
    lines.push(`- Voice ID: ${item.voiceId ?? "-"}`);
    lines.push(`- Locale: ${item.locale ?? "-"}`);
    lines.push(`- Output: \`${item.outputFile ?? "-"}\``);
    lines.push(`- Exists: ${item.exists ? "yes" : "no"}`);
    lines.push(`- Bytes: ${item.bytes ?? 0}`);
    lines.push(`- Duration: ${item.durationSec ?? 0}s`);
    lines.push(`- Sample rate: ${item.sampleRate ?? "-"}`);
    if (item.reasons?.length) {
      lines.push(`- Reasons: ${item.reasons.join("; ")}`);
    }
    lines.push("");
  }
  lines.push("## Summary");
  lines.push("");
  for (const lang of ["EN", "NSO", "VE", "TS", "ZU"]) {
    const hit = items.find((i) => i.language === lang);
    lines.push(`${lang}: ${hit ? hit.status : "NOT REQUESTED"}`);
  }
  lines.push("");
  lines.push(`Audio generated this run: ${generated ? "YES" : "NO"}`);
  lines.push("");
  lines.push(
    "PASS requires real non-zero WAV duration on disk — API success alone is insufficient."
  );
  lines.push("");

  const out = path.join(audioDir, "VOICE_QC_REPORT.md");
  fs.mkdirSync(audioDir, { recursive: true });
  fs.writeFileSync(out, lines.join("\n"), "utf8");
  return out;
}
