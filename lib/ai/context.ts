import type { AgentContext } from "@/lib/ai/types";

export function publicAgentContext(): AgentContext {
  return {
    principal: "anonymous",
    authorizationLevel: "PUBLIC",
    requestId: crypto.randomUUID(),
  };
}
