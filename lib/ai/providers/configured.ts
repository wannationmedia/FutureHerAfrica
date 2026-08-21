import { getOpenAIApiKey } from "@/lib/ai/config";
import { createOpenAIProvider } from "@/lib/ai/providers/openai";
import type { AiProvider } from "@/lib/ai/providers/types";

/**
 * Returns the production model adapter when a server-side API key is present.
 * The test mock is never selected here.
 */
export function getConfiguredProvider(): AiProvider | null {
  if (!getOpenAIApiKey()) {
    return null;
  }
  try {
    return createOpenAIProvider();
  } catch {
    return null;
  }
}
