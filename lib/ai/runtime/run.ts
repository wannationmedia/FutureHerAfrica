import { getAiServerConfig, getOpenAIApiKey, type AiServerLimits } from "@/lib/ai/config";
import { publicAgentContext } from "@/lib/ai/context";
import { invokeRegisteredTool, listPublicToolManifest } from "@/lib/ai/orchestrator";
import type { ProviderDecision, ProviderRequest, ProviderToolDescriptor } from "@/lib/ai/providers/types";
import { buildFutureHerSystemContext } from "@/lib/ai/runtime/system";
import type {
  AiRuntimeFailure,
  AiRuntimeResult,
  AiRuntimeSuccess,
  RunFutureHerAiOptions,
  RuntimeContext,
} from "@/lib/ai/runtime/types";
import type { AgentContext, ToolResult } from "@/lib/ai/types";
import { assertSchema, SchemaValidationError } from "@/lib/ai/validate";

const MESSAGE_SCHEMA = {
  type: "object" as const,
  additionalProperties: false,
  required: ["message"],
  properties: {
    message: { type: "string" as const, minLength: 1, maxLength: 2000 },
  },
};

export function createPublicRuntimeContext(agent: AgentContext = publicAgentContext()): RuntimeContext {
  return {
    agent,
    authorizationLevel: "PUBLIC",
    authenticationRequirement: "none",
    allowlistedToolNames: listPublicToolManifest().map((tool) => tool.name),
  };
}

export async function runFutureHerAi(options: RunFutureHerAiOptions): Promise<AiRuntimeResult> {
  const runtime = createPublicRuntimeContext(options.agent ?? publicAgentContext());
  const limits: AiServerLimits = { ...getAiServerConfig().limits, ...options.limits };

  try {
    assertSchema(MESSAGE_SCHEMA, options.request);
  } catch (error) {
    const message = error instanceof SchemaValidationError ? error.message : "Invalid runtime request.";
    return fail("INVALID_INPUT", message);
  }

  const tools = listPublicToolManifest().map(
    (tool): ProviderToolDescriptor => ({
      name: tool.name,
      description: tool.description,
      inputSchema: tool.inputSchema,
    })
  );

  const providerRequest: ProviderRequest = {
    requestId: runtime.agent.requestId,
    system: buildFutureHerSystemContext(tools),
    userMessage: options.request.message.trim(),
    allowlistedTools: tools,
    catalogObservation: null,
    lastToolName: null,
  };

  let decision: ProviderDecision;
  try {
    decision = await options.provider.complete(providerRequest);
  } catch {
    return fail("PROVIDER_FAILED", "The model provider could not complete this request.");
  }

  if (decision.kind === "answer") {
    return finalizeAnswer(runtime, options, decision.text, null, false, limits);
  }

  const firstLimit = checkToolBudget(decision, 0, 0, limits, false);
  if (firstLimit) return firstLimit;

  const toolResult = await invokeRegisteredTool(
    { tool: decision.tool, input: decision.input },
    runtime.agent
  );

  if (!toolResult.ok) {
    const code = mapToolError(toolResult.error.code);
    return fail(code, toolResult.error.message);
  }

  let followUp: ProviderDecision;
  try {
    followUp = await options.provider.complete({
      ...providerRequest,
      catalogObservation: toolResult.result,
      lastToolName: toolResult.tool,
    });
  } catch {
    return succeed(
      runtime,
      options.provider,
      "Retrieved untrusted catalogue data. The provider could not summarize it.",
      toolResult,
      false
    );
  }

  if (followUp.kind === "invoke_tool") {
    return succeed(
      runtime,
      options.provider,
      "Retrieved untrusted catalogue data. Additional tool invocations from catalogue text are not permitted.",
      toolResult,
      true
    );
  }

  return finalizeAnswer(runtime, options, followUp.text, toolResult, false, limits);
}

function checkToolBudget(
  decision: Extract<ProviderDecision, { kind: "invoke_tool" }>,
  toolCalls: number,
  executionDepth: number,
  limits: AiServerLimits,
  afterCatalog: boolean
): AiRuntimeFailure | null {
  if (afterCatalog) {
    return null;
  }
  if (toolCalls >= limits.maxToolCalls || executionDepth >= limits.maxExecutionDepth) {
    return fail("LIMIT_EXCEEDED", "The tool-call or execution-depth limit for this request was reached.");
  }
  const inputBytes = utf8Bytes(JSON.stringify(decision.input ?? {}));
  if (inputBytes > limits.maxToolInputBytes) {
    return fail("LIMIT_EXCEEDED", "Tool input exceeded the allowed size.");
  }
  return null;
}

function finalizeAnswer(
  runtime: RuntimeContext,
  options: RunFutureHerAiOptions,
  answer: string,
  toolInvocation: ToolResult | null,
  toolChainRefused: boolean,
  limits: AiServerLimits
): AiRuntimeResult {
  const redacted = redactSecrets(answer);
  if (utf8Bytes(redacted) > limits.maxResponseBytes) {
    return fail("LIMIT_EXCEEDED", "The model response exceeded the allowed size.");
  }
  return succeed(runtime, options.provider, redacted, toolInvocation, toolChainRefused);
}

function mapToolError(code: string): AiRuntimeFailure["error"]["code"] {
  switch (code) {
    case "UNKNOWN_TOOL":
    case "UNAUTHORIZED":
    case "AUTH_REQUIRED":
    case "INVALID_INPUT":
    case "TOOL_FAILED":
      return code;
    default:
      return "TOOL_FAILED";
  }
}

function succeed(
  runtime: RuntimeContext,
  provider: RunFutureHerAiOptions["provider"],
  answer: string,
  toolInvocation: ToolResult | null,
  toolChainRefused: boolean
): AiRuntimeSuccess {
  const catalog = toolInvocation && toolInvocation.ok ? toolInvocation.result : null;
  return {
    ok: true,
    mode: "runtime",
    requestId: runtime.agent.requestId,
    authorizationLevel: runtime.authorizationLevel,
    authenticationRequirement: runtime.authenticationRequirement,
    provider: { id: provider.id, kind: provider.kind },
    answer,
    toolInvocation,
    catalog,
    toolChainRefused,
  };
}

function fail(code: AiRuntimeFailure["error"]["code"], message: string): AiRuntimeFailure {
  return { ok: false, error: { code, message } };
}

function utf8Bytes(value: string): number {
  return new TextEncoder().encode(value).length;
}

function redactSecrets(text: string): string {
  const key = getOpenAIApiKey();
  if (!key || key.length < 8 || !text.includes(key)) {
    return text;
  }
  return text.split(key).join("[redacted]");
}
