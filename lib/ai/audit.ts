import type { AgentContext, AuthLevel } from "@/lib/ai/types";

export function auditToolCall(entry: {
  context: AgentContext;
  tool: string;
  authorizationLevel: AuthLevel;
  ok: boolean;
  code?: string;
  durationMs: number;
}): void {
  console.info(
    JSON.stringify({
      channel: "fha-ai",
      requestId: entry.context.requestId,
      principal: entry.context.principal,
      tool: entry.tool,
      authorizationLevel: entry.authorizationLevel,
      ok: entry.ok,
      code: entry.code ?? null,
      durationMs: entry.durationMs,
    })
  );
}
