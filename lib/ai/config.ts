export type AiServerLimits = {
  maxToolCalls: number;
  maxToolInputBytes: number;
  maxResponseBytes: number;
  maxExecutionDepth: number;
};

export type OpenAIModelConfig = {
  model: string;
  temperature: number;
  maxOutputTokens: number;
  requestTimeoutMs: number;
};

export type AiServerConfig = {
  openai: OpenAIModelConfig;
  limits: AiServerLimits;
};

const MODEL_PATTERN = /^[a-zA-Z0-9][a-zA-Z0-9._-]{0,79}$/;

/**
 * Single server-side configuration point for the production model adapter.
 * Values are never accepted from the client.
 */
export function getAiServerConfig(): AiServerConfig {
  return {
    openai: {
      model: envModel("OPENAI_MODEL", "gpt-5.6-terra"),
      temperature: envNumber("OPENAI_TEMPERATURE", 0, 0, 1),
      maxOutputTokens: envInt("OPENAI_MAX_OUTPUT_TOKENS", 512, 16, 2048),
      requestTimeoutMs: envInt("OPENAI_TIMEOUT_MS", 15_000, 1_000, 60_000),
    },
    limits: {
      maxToolCalls: envInt("AI_MAX_TOOL_CALLS", 1, 1, 3),
      maxToolInputBytes: envInt("AI_MAX_TOOL_INPUT_BYTES", 4_096, 256, 16_384),
      maxResponseBytes: envInt("AI_MAX_RESPONSE_BYTES", 8_192, 256, 32_768),
      maxExecutionDepth: envInt("AI_MAX_EXECUTION_DEPTH", 1, 1, 3),
    },
  };
}

export function getOpenAIApiKey(): string | null {
  const value = process.env.OPENAI_API_KEY?.trim();
  return value ? value : null;
}

function envModel(name: string, fallback: string): string {
  const raw = process.env[name]?.trim();
  if (!raw) return fallback;
  return MODEL_PATTERN.test(raw) ? raw : fallback;
}

function envInt(name: string, fallback: number, min: number, max: number): number {
  const raw = process.env[name]?.trim();
  if (!raw) return fallback;
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(max, Math.max(min, parsed));
}

function envNumber(name: string, fallback: number, min: number, max: number): number {
  const raw = process.env[name]?.trim();
  if (!raw) return fallback;
  const parsed = Number.parseFloat(raw);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(max, Math.max(min, parsed));
}
