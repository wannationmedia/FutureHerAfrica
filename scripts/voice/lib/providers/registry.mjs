import { AzureVoiceProvider } from "./azure.mjs";
import { UnsupportedVoiceProvider } from "./unsupported.mjs";
import { VoiceProviderError } from "./base.mjs";
import { requireAzureCredentials } from "../env.mjs";

const UNSUPPORTED_REASON =
  "No verified commercial female TTS for this language in PROVIDER_CAPABILITY_MATRIX.md.";

export function getProviderForLanguage(langProfile, { allowCredentialGate = true } = {}) {
  if (langProfile.status === "NOT-SUPPORTED" || langProfile.provider === "unsupported") {
    return new UnsupportedVoiceProvider(UNSUPPORTED_REASON);
  }

  if (langProfile.provider === "azure") {
    const creds = requireAzureCredentials();
    if (!creds.ok) {
      if (allowCredentialGate) {
        throw new VoiceProviderError(creds.message, {
          code: "CREDENTIALS_MISSING",
          language: langProfile.code,
        });
      }
      throw new VoiceProviderError(creds.message, {
        code: "CREDENTIALS_MISSING",
        language: langProfile.code,
      });
    }
    return new AzureVoiceProvider({ key: creds.key, region: creds.region });
  }

  throw new VoiceProviderError(
    `[${langProfile.code}] No provider adapter registered for '${langProfile.provider}'.`,
    { code: "PROVIDER_MISSING", language: langProfile.code }
  );
}
