export function parseWav(buffer) {
  if (buffer.length < 44) throw new Error("WAV too small.");
  if (buffer.toString("ascii", 0, 4) !== "RIFF") {
    throw new Error("Not a RIFF WAV.");
  }
  if (buffer.toString("ascii", 8, 12) !== "WAVE") {
    throw new Error("Not a WAVE file.");
  }

  let offset = 12;
  let channels = 1;
  let sampleRate = 0;
  let bitsPerSample = 16;
  let dataOffset = -1;
  let dataSize = 0;

  while (offset + 8 <= buffer.length) {
    const id = buffer.toString("ascii", offset, offset + 4);
    const size = buffer.readUInt32LE(offset + 4);
    const chunkStart = offset + 8;
    if (id === "fmt ") {
      channels = buffer.readUInt16LE(chunkStart + 2);
      sampleRate = buffer.readUInt32LE(chunkStart + 4);
      bitsPerSample = buffer.readUInt16LE(chunkStart + 14);
    } else if (id === "data") {
      dataOffset = chunkStart;
      dataSize = size;
      break;
    }
    offset = chunkStart + size + (size % 2);
  }

  if (dataOffset < 0) throw new Error("WAV data chunk missing.");
  const pcm = buffer.subarray(dataOffset, dataOffset + dataSize);
  const bytesPerSample = (bitsPerSample / 8) * channels;
  const frameCount = Math.floor(pcm.length / bytesPerSample);
  const durationSec = sampleRate > 0 ? frameCount / sampleRate : 0;

  return {
    channels,
    sampleRate,
    bitsPerSample,
    pcm,
    durationSec,
    byteLength: buffer.length,
  };
}

export function writeWav({ pcm, sampleRate, channels = 1, bitsPerSample = 16 }) {
  const blockAlign = (channels * bitsPerSample) / 8;
  const byteRate = sampleRate * blockAlign;
  const dataSize = pcm.length;
  const buffer = Buffer.alloc(44 + dataSize);
  buffer.write("RIFF", 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write("WAVE", 8);
  buffer.write("fmt ", 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(channels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(bitsPerSample, 34);
  buffer.write("data", 36);
  buffer.writeUInt32LE(dataSize, 40);
  pcm.copy(buffer, 44);
  return buffer;
}

export function pcm16MonoSamples(pcm) {
  const samples = new Int16Array(pcm.length / 2);
  for (let i = 0; i < samples.length; i++) {
    samples[i] = pcm.readInt16LE(i * 2);
  }
  return samples;
}

export function samplesToPcm16(samples) {
  const buf = Buffer.alloc(samples.length * 2);
  for (let i = 0; i < samples.length; i++) {
    let v = samples[i];
    if (v > 32767) v = 32767;
    if (v < -32768) v = -32768;
    buf.writeInt16LE(v, i * 2);
  }
  return buf;
}
