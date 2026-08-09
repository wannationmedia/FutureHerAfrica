import { BaseVoiceProvider, VoiceProviderError } from "./base.mjs";
import { wrapSsml } from "../script_loader.mjs";

const OUTPUT_FORMAT = "riff-48khz-16bit-mono-pcm";

export class AzureVoiceProvider extends BaseVoiceProvider {
  constructor({ key, region }) {
    super("azure");
    this.key = key;
    this.region = region;
  }

  async generateVoice({
    language,
    locale,
    text,
    voice,
    outputFormat = "wav",
    sampleRate = 48000,
    speakingRate = 1.0,
    style = "editorial",
  }) {
    if (outputFormat !== "wav") {
      throw new VoiceProviderError(
        `[${language}] Azure adapter outputs WAV masters only.`,
        { code: "FORMAT_UNSUPPORTED", language }
      );
    }
    if (!voice || /male|luke|themba|brian|byron/i.test(voice)) {
      throw new VoiceProviderError(
        `[${language}] Refusing non-female / prohibited voice: ${voice}`,
        { code: "MALE_VOICE_PROHIBITED", language }
      );
    }

    const ssml = wrapSsml({
      locale,
      voiceId: voice,
      speakable: text,
      speakingRate,
    });

    const endpoint = `https://${this.region}.tts.speech.microsoft.com/cognitiveservices/v1`;
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key": this.key,
        "Content-Type": "application/ssml+xml",
        "X-Microsoft-OutputFormat": OUTPUT_FORMAT,
        "User-Agent": "FutureHerAfrica-VoiceEngine",
      },
      body: ssml,
    });

    if (!res.ok) {
      const body = await res.text();
      throw new VoiceProviderError(
        `[${language}] Azure TTS failed (${res.status}): ${body.slice(0, 400)}`,
        { code: "AZURE_TTS_FAILED", language }
      );
    }

    const arrayBuffer = await res.arrayBuffer();
    const audio = Buffer.from(arrayBuffer);
    if (!audio.length) {
      throw new VoiceProviderError(`[${language}] Azure returned empty audio.`, {
        code: "EMPTY_AUDIO",
        language,
      });
    }

    return {
      provider: "azure",
      model: "neural",
      voiceId: voice,
      locale,
      language,
      style,
      sampleRate,
      format: "wav",
      audio,
      rawOutputFormat: OUTPUT_FORMAT,
    };
  }
}
