/**
 * Conceptual provider interface:
 * generateVoice({ language, text, voice, outputFormat, sampleRate, speakingRate, style })
 */

export class VoiceProviderError extends Error {
  constructor(message, { code = "PROVIDER_ERROR", language = null } = {}) {
    super(message);
    this.name = "VoiceProviderError";
    this.code = code;
    this.language = language;
  }
}

export class BaseVoiceProvider {
  constructor(name) {
    this.name = name;
  }

  async generateVoice(_request) {
    throw new VoiceProviderError(`${this.name}: generateVoice not implemented`);
  }
}
