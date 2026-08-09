import { BaseVoiceProvider, VoiceProviderError } from "./base.mjs";

export class UnsupportedVoiceProvider extends BaseVoiceProvider {
  constructor(reason) {
    super("unsupported");
    this.reason = reason;
  }

  async generateVoice({ language }) {
    throw new VoiceProviderError(
      `[${language}] NOT-SUPPORTED. ${this.reason} Never substituting English or another language.`,
      { code: "LANGUAGE_UNSUPPORTED", language }
    );
  }
}
