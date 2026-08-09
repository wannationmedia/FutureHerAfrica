import {
  parseWav,
  writeWav,
  pcm16MonoSamples,
  samplesToPcm16,
} from "./wav.mjs";

/**
 * Light production polish only:
 * silence trim → peak normalize → head/tail pad.
 * Does not apply theatrical FX.
 */
export function normalizeProductionWav(inputBuffer, profiles) {
  const wav = parseWav(inputBuffer);
  if (wav.channels !== 1 || wav.bitsPerSample !== 16) {
    // Keep Azure PCM masters if already mono 16-bit; otherwise pass through with metadata.
    return {
      buffer: inputBuffer,
      sampleRate: wav.sampleRate,
      durationSec: wav.durationSec,
      format: "wav",
      notes: "passthrough-non-mono16",
    };
  }

  let samples = pcm16MonoSamples(wav.pcm);
  const threshold = dbToAmplitude(profiles.silenceTrimThresholdDb ?? -42);
  samples = trimSilence(samples, threshold, wav.sampleRate);
  samples = peakNormalize(samples, 0.89);
  samples = padSamples(
    samples,
    wav.sampleRate,
    profiles.headPadMs ?? 120,
    profiles.tailPadMs ?? 250
  );

  // Resample only if needed to production rate (simple linear; Azure already returns 48k).
  let sampleRate = wav.sampleRate;
  const targetRate = profiles.sampleRateHz ?? 48000;
  if (sampleRate !== targetRate) {
    samples = linearResample(samples, sampleRate, targetRate);
    sampleRate = targetRate;
  }

  const pcm = samplesToPcm16(samples);
  const buffer = writeWav({ pcm, sampleRate, channels: 1, bitsPerSample: 16 });
  return {
    buffer,
    sampleRate,
    durationSec: samples.length / sampleRate,
    format: "wav",
    notes: "trim+peak+pad",
  };
}

function dbToAmplitude(db) {
  return Math.pow(10, db / 20);
}

function trimSilence(samples, thresholdAmp, sampleRate) {
  const thresh = thresholdAmp * 32768;
  let start = 0;
  let end = samples.length - 1;
  while (start < samples.length && Math.abs(samples[start]) < thresh) start++;
  while (end > start && Math.abs(samples[end]) < thresh) end--;
  // Keep a tiny natural edge so consonants are not clipped.
  const keep = Math.floor(sampleRate * 0.02);
  start = Math.max(0, start - keep);
  end = Math.min(samples.length - 1, end + keep);
  return samples.slice(start, end + 1);
}

function peakNormalize(samples, targetPeak = 0.89) {
  let peak = 1;
  for (let i = 0; i < samples.length; i++) {
    const a = Math.abs(samples[i]);
    if (a > peak) peak = a;
  }
  const gain = (targetPeak * 32767) / peak;
  if (gain >= 0.99 && gain <= 1.01) return samples;
  const out = new Int16Array(samples.length);
  for (let i = 0; i < samples.length; i++) {
    out[i] = Math.round(samples[i] * gain);
  }
  return out;
}

function padSamples(samples, sampleRate, headMs, tailMs) {
  const head = Math.max(0, Math.floor((sampleRate * headMs) / 1000));
  const tail = Math.max(0, Math.floor((sampleRate * tailMs) / 1000));
  const out = new Int16Array(head + samples.length + tail);
  out.set(samples, head);
  return out;
}

function linearResample(samples, fromRate, toRate) {
  if (fromRate === toRate) return samples;
  const ratio = toRate / fromRate;
  const outLen = Math.max(1, Math.floor(samples.length * ratio));
  const out = new Int16Array(outLen);
  for (let i = 0; i < outLen; i++) {
    const src = i / ratio;
    const i0 = Math.floor(src);
    const i1 = Math.min(samples.length - 1, i0 + 1);
    const t = src - i0;
    out[i] = Math.round(samples[i0] * (1 - t) + samples[i1] * t);
  }
  return out;
}
