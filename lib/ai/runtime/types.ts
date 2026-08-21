import type { AiServerLimits } from "@/lib/ai/config";
import type { AiProvider } from "@/lib/ai/providers/types";
import type { AgentContext, AuthLevel, AuthenticationRequirement, ToolResult, UntrustedCatalogPayload } from "@/lib/ai/types";

export type AiRuntimeRequest = {
  message: string;
};

export type RuntimeContext = {
  agent: AgentContext;
  authorizationLevel: Extract<AuthLevel, "PUBLIC">;
  authenticationRequirement: Extract<AuthenticationRequirement, "none">;
  allowlistedToolNames: string[];
};

export type AiRuntimeErrorCode =
  | "INVALID_INPUT"
  | "PROVIDER_UNAVAILABLE"
  | "PROVIDER_FAILED"
  | "UNKNOWN_TOOL"
  | "UNAUTHORIZED"
  | "AUTH_REQUIRED"
  | "TOOL_FAILED"
  | "TOOL_CHAIN_REFUSED"
  | "LIMIT_EXCEEDED";

export type AiRuntimeFailure = {
  ok: false;
  error: {
    code: AiRuntimeErrorCode;
    message: string;
  };
};

export type AiRuntimeSuccess = {
  ok: true;
  mode: "runtime";
  requestId: string;
  authorizationLevel: Extract<AuthLevel, "PUBLIC">;
  authenticationRequirement: Extract<AuthenticationRequirement, "none">;
  provider: {
    id: string;
    kind: AiProvider["kind"];
  };
  answer: string;
  toolInvocation: ToolResult | null;
  catalog: UntrustedCatalogPayload<unknown> | null;
  toolChainRefused: boolean;
};

export type AiRuntimeResult = AiRuntimeSuccess | AiRuntimeFailure;

export type RunFutureHerAiOptions = {
  request: AiRuntimeRequest;
  provider: AiProvider;
  agent?: AgentContext;
  limits?: Partial<AiServerLimits>;
};
