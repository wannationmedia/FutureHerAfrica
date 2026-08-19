import { auditToolCall } from "@/lib/ai/audit";
import { getRegisteredTool, isAuthorized, listToolsForAuthorization } from "@/lib/ai/registry";
import { wrapUntrustedCatalog } from "@/lib/ai/untrusted";
import type { AgentContext, InvokeRequest, ToolResult } from "@/lib/ai/types";
import { assertSchema, SchemaValidationError } from "@/lib/ai/validate";

import "@/lib/ai/tools";

const INVOKE_ENVELOPE = {
  type: "object" as const,
  additionalProperties: false,
  required: ["tool", "input"],
  properties: {
    tool: { type: "string" as const, minLength: 1, maxLength: 64, pattern: "^[a-zA-Z][a-zA-Z0-9]{1,63}$" },
    input: { type: "object" as const, additionalProperties: true },
  },
};

export function listPublicToolManifest() {
  return listToolsForAuthorization("PUBLIC").map((tool) => ({
    name: tool.name,
    description: tool.description,
    inputSchema: tool.inputSchema,
    outputSchema: tool.outputSchema,
    authenticationRequirement: tool.authenticationRequirement,
    authorizationLevel: tool.authorizationLevel,
    sideEffectClassification: tool.sideEffectClassification,
    auditRequirements: tool.auditRequirements,
  }));
}

export async function invokeRegisteredTool(
  raw: unknown,
  context: AgentContext
): Promise<ToolResult> {
  const started = Date.now();
  let toolName = "unknown";

  try {
    assertSchema(INVOKE_ENVELOPE, raw);
    const request = raw as InvokeRequest;
    toolName = request.tool;

    const tool = getRegisteredTool(request.tool);
    if (!tool) {
      auditToolCall({
        context,
        tool: toolName,
        authorizationLevel: context.authorizationLevel,
        ok: false,
        code: "UNKNOWN_TOOL",
        durationMs: Date.now() - started,
      });
      return fail("UNKNOWN_TOOL", "Tool is not registered.");
    }

    if (!isAuthorized(context.authorizationLevel, tool.authorizationLevel)) {
      auditToolCall({
        context,
        tool: tool.name,
        authorizationLevel: tool.authorizationLevel,
        ok: false,
        code: "UNAUTHORIZED",
        durationMs: Date.now() - started,
      });
      return fail("UNAUTHORIZED", "Caller is not authorized to invoke this tool.");
    }

    if (tool.authenticationRequirement !== "none") {
      auditToolCall({
        context,
        tool: tool.name,
        authorizationLevel: tool.authorizationLevel,
        ok: false,
        code: "AUTH_REQUIRED",
        durationMs: Date.now() - started,
      });
      return fail("AUTH_REQUIRED", "This tool requires authentication that is not available.");
    }

    assertSchema(tool.inputSchema, request.input);
    const output = await tool.execute(request.input, context);

    auditToolCall({
      context,
      tool: tool.name,
      authorizationLevel: tool.authorizationLevel,
      ok: true,
      durationMs: Date.now() - started,
    });

    return {
      ok: true,
      tool: tool.name,
      authorizationLevel: tool.authorizationLevel,
      result: wrapUntrustedCatalog(output),
    };
  } catch (error) {
    const code = error instanceof SchemaValidationError ? "INVALID_INPUT" : "TOOL_FAILED";
    auditToolCall({
      context,
      tool: toolName,
      authorizationLevel: context.authorizationLevel,
      ok: false,
      code,
      durationMs: Date.now() - started,
    });
    return fail(code, safeMessage(error));
  }
}

function fail(code: string, message: string): ToolResult {
  return { ok: false, error: { code, message } };
}

function safeMessage(error: unknown): string {
  if (error instanceof SchemaValidationError) return error.message;
  if (error instanceof Error && error.message === "Provide slug or code.") return error.message;
  if (error instanceof Error && error.message === "Provide slug or code, not both.") return error.message;
  if (error instanceof Error && error.message === "Unknown series.") return error.message;
  return "The tool could not complete this request.";
}
