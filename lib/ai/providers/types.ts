import type { JsonSchema, UntrustedCatalogPayload } from "@/lib/ai/types";

export type ProviderKind = "mock" | "none" | "openai";

export type ProviderToolDescriptor = {
  name: string;
  description: string;
  inputSchema: JsonSchema;
};

export type ProviderRequest = {
  requestId: string;
  system: string;
  userMessage: string;
  allowlistedTools: ProviderToolDescriptor[];
  catalogObservation: UntrustedCatalogPayload<unknown> | null;
  lastToolName: string | null;
};

export type ProviderToolDecision = {
  kind: "invoke_tool";
  tool: string;
  input: Record<string, unknown>;
};

export type ProviderAnswerDecision = {
  kind: "answer";
  text: string;
};

export type ProviderDecision = ProviderToolDecision | ProviderAnswerDecision;

export type AiProvider = {
  id: string;
  kind: ProviderKind;
  complete(request: ProviderRequest): Promise<ProviderDecision>;
};
