import fs from "fs";
import path from "path";
import { loadProfiles, resolveVoiceId, assertFemaleVoiceId } from "./profiles.mjs";
import { episodeDir, loadSpeakableScript } from "./script_loader.mjs";
import { getProviderForLanguage } from "./providers/registry.mjs";
import { VoiceProviderError } from "./providers/base.mjs";
import { normalizeProductionWav } from "./normalize.mjs";
import { inspectAudioFile, writeQcReport } from "./qc.mjs";
import { requireAzureCredentials } from "./env.mjs";

export async function generateEpisodeVoice({
  episode,
  languages,
  speakingRate = 1.0,
  style = "editorial",
}) {
  const profiles = loadProfiles();
  const ep = episode.toUpperCase();
  const audioDir = path.join(episodeDir(ep), "audio");
  fs.mkdirSync(audioDir, { recursive: true });

  const requested = languages.map((l) => l.toUpperCase());
  const items = [];
  const manifestEntries = [];
  let generatedAny = false;
  let credentialGate = null;

  const needsAzure = requested.some((code) => {
    const p = profiles.languages[code];
    return p && p.provider === "azure";
  });
  if (needsAzure) {
    const creds = requireAzureCredentials();
    if (!creds.ok) {
      credentialGate = creds.message;
    }
  }

  for (const code of requested) {
    const langProfile = profiles.languages[code];
    if (!langProfile) {
      items.push({
        language: code,
        status: "FAIL",
        reasons: ["unknown language code"],
        provider: null,
        exists: false,
        bytes: 0,
        durationSec: 0,
      });
      continue;
    }

    const voiceId = resolveVoiceId(langProfile);
    const outputName = langProfile.outputPattern.replace("{episode}", ep);
    const outputPath = path.join(audioDir, outputName);

    if (langProfile.status === "NOT-SUPPORTED") {
      items.push({
        language: code,
        status: "FAIL",
        reasons: [
          "NOT-SUPPORTED — no verified commercial female TTS (see PROVIDER_CAPABILITY_MATRIX.md)",
        ],
        provider: "unsupported",
        voiceId: null,
        locale: langProfile.locale,
        outputFile: outputName,
        exists: false,
        bytes: 0,
        durationSec: 0,
      });
      continue;
    }

    if (credentialGate) {
      items.push({
        language: code,
        status: "FAIL",
        reasons: [credentialGate],
        provider: langProfile.provider,
        voiceId,
        locale: langProfile.locale,
        outputFile: outputName,
        exists: false,
        bytes: 0,
        durationSec: 0,
      });
      continue;
    }

    try {
      assertFemaleVoiceId(voiceId, code);
      if (langProfile.gender !== "female") {
        throw new Error(`[${code}] Profile gender must be female.`);
      }

      const script = loadSpeakableScript(ep, langProfile);
      const provider = getProviderForLanguage(langProfile);
      const result = await provider.generateVoice({
        language: code,
        locale: langProfile.locale,
        text: script.speakable,
        voice: voiceId,
        outputFormat: "wav",
        sampleRate: profiles.sampleRateHz,
        speakingRate,
        style,
      });

      const normalized = normalizeProductionWav(result.audio, profiles);
      fs.writeFileSync(outputPath, normalized.buffer);

      if (langProfile.alsoWriteLegacyEn && code === "EN" && ep === "EP001") {
        fs.writeFileSync(
          path.join(audioDir, langProfile.alsoWriteLegacyEn),
          normalized.buffer
        );
      }

      generatedAny = true;
      const qc = inspectAudioFile(outputPath, {
        language: code,
        gender: "female",
        voiceId,
        locale: langProfile.locale,
        sampleRate: profiles.sampleRateHz,
      });

      items.push({
        ...qc,
        provider: result.provider,
        model: result.model,
        voiceId,
        locale: langProfile.locale,
        outputFile: outputName,
        sourceScript: script.sourceScript,
      });

      manifestEntries.push({
        episode: ep,
        language: code,
        locale: langProfile.locale,
        provider: result.provider,
        model: result.model,
        voiceId,
        gender: "female",
        generationTimestamp: new Date().toISOString(),
        sourceScript: script.sourceScript,
        outputFile: path
          .relative(path.join(episodeDir(ep), "..", ".."), outputPath)
          .replace(/\\/g, "/"),
        outputPath: `launch/${ep}/audio/${outputName}`,
        sampleRate: normalized.sampleRate,
        format: "wav",
        duration: Number(normalized.durationSec.toFixed(3)),
        status: qc.status,
      });
    } catch (err) {
      const message =
        err instanceof VoiceProviderError ? err.message : err.message;
      items.push({
        language: code,
        status: "FAIL",
        reasons: [message],
        provider: langProfile.provider,
        voiceId,
        locale: langProfile.locale,
        outputFile: outputName,
        exists: fs.existsSync(outputPath),
        bytes: fs.existsSync(outputPath) ? fs.statSync(outputPath).size : 0,
        durationSec: 0,
      });
      manifestEntries.push({
        episode: ep,
        language: code,
        locale: langProfile.locale,
        provider: langProfile.provider,
        model: langProfile.model,
        voiceId,
        gender: "female",
        generationTimestamp: new Date().toISOString(),
        sourceScript: langProfile.scriptFile,
        outputPath: `launch/${ep}/audio/${outputName}`,
        sampleRate: profiles.sampleRateHz,
        format: "wav",
        duration: 0,
        status: "FAIL",
        error: message,
      });
    }
  }

  // Ensure summary always mentions canonical five when EP001 full intent is used.
  for (const code of ["EN", "NSO", "VE", "TS", "ZU"]) {
    if (!requested.includes(code) && !items.find((i) => i.language === code)) {
      // only annotate in QC summary via writeQcReport defaults
    }
  }

  const manifestPath = path.join(audioDir, "VOICE_MANIFEST.json");
  const manifest = {
    brand: "FutureHerAfrica",
    episode: ep,
    generatedAt: new Date().toISOString(),
    credentialGate: credentialGate || null,
    audioGenerated: generatedAny,
    entries: manifestEntries,
  };
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n", "utf8");

  const qcPath = writeQcReport({
    episode: ep,
    audioDir,
    items,
    credentialGate,
    generated: generatedAny,
  });

  const allPass =
    !credentialGate &&
    requested.every((code) => {
      const item = items.find((i) => i.language === code);
      return item && item.status === "PASS";
    });

  return {
    episode: ep,
    audioDir,
    manifestPath,
    qcPath,
    items,
    generatedAny,
    credentialGate,
    allPass,
  };
}
