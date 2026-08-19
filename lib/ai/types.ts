export const AUTH_LEVELS = ["PUBLIC", "AUTHENTICATED", "PRIVILEGED", "FORBIDDEN"] as const;
export type AuthLevel = (typeof AUTH_LEVELS)[number];

export type AuthenticationRequirement = "none" | "session" | "privileged";
export type SideEffectClassification = "read" | "write" | "admin";
export type AuditRequirement = "log" | "log_and_retain";

export type JsonSchema = {
  type?: "object" | "string" | "integer" | "number" | "boolean" | "array" | "null";
  description?: string;
  properties?: Record<string, JsonSchema>;
  required?: string[];
  additionalProperties?: boolean;
  minLength?: number;
  maxLength?: number;
  minimum?: number;
  maximum?: number;
  pattern?: string;
  enum?: Array<string | number>;
  items?: JsonSchema;
  anyOf?: JsonSchema[];
};

export type ToolDefinition<TInput = Record<string, unknown>, TOutput = unknown> = {
  name: string;
  description: string;
  inputSchema: JsonSchema;
  outputSchema: JsonSchema;
  authenticationRequirement: AuthenticationRequirement;
  authorizationLevel: AuthLevel;
  sideEffectClassification: SideEffectClassification;
  auditRequirements: AuditRequirement;
  execute: (input: TInput, context: AgentContext) => Promise<TOutput>;
};

export type AgentPrincipal = "anonymous";

export type AgentContext = {
  principal: AgentPrincipal;
  authorizationLevel: AuthLevel;
  requestId: string;
};

export type UntrustedCatalogPayload<T> = {
  untrusted: true;
  source: "futureher_catalogue";
  notice: string;
  data: T;
};

export type ToolSuccess<T> = {
  ok: true;
  tool: string;
  authorizationLevel: AuthLevel;
  result: UntrustedCatalogPayload<T>;
};

export type ToolFailure = {
  ok: false;
  error: {
    code: string;
    message: string;
  };
};

export type ToolResult<T = unknown> = ToolSuccess<T> | ToolFailure;

export type InvokeRequest = {
  tool: string;
  input: Record<string, unknown>;
};
