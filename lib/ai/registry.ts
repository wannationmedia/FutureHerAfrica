import type { AuthLevel, ToolDefinition } from "@/lib/ai/types";

const tools = new Map<string, ToolDefinition>();

const NAME_PATTERN = /^[a-zA-Z][a-zA-Z0-9]{1,63}$/;

export function registerTool<TInput, TOutput>(definition: ToolDefinition<TInput, TOutput>): void {
  if (!NAME_PATTERN.test(definition.name)) {
    throw new Error(`Invalid tool name: ${definition.name}`);
  }
  if (definition.authorizationLevel === "FORBIDDEN") {
    throw new Error(`Refusing to register forbidden tool: ${definition.name}`);
  }
  if (definition.sideEffectClassification !== "read") {
    throw new Error(`Refusing to register non-read tool: ${definition.name}`);
  }
  if (definition.authenticationRequirement !== "none" || definition.authorizationLevel !== "PUBLIC") {
    throw new Error(
      `This phase only registers PUBLIC tools with authenticationRequirement=none. Rejected: ${definition.name}`
    );
  }
  if (tools.has(definition.name)) {
    throw new Error(`Duplicate tool: ${definition.name}`);
  }
  tools.set(definition.name, definition as ToolDefinition);
}

export function getRegisteredTool(name: string): ToolDefinition | undefined {
  return tools.get(name);
}

export function listRegisteredTools(): ToolDefinition[] {
  return [...tools.values()];
}

export function listToolsForAuthorization(level: AuthLevel): ToolDefinition[] {
  if (level === "FORBIDDEN") return [];
  return listRegisteredTools().filter((tool) => isAuthorized(level, tool.authorizationLevel));
}

export function isAuthorized(caller: AuthLevel, required: AuthLevel): boolean {
  if (required === "FORBIDDEN") return false;
  if (required === "PUBLIC") return caller === "PUBLIC" || caller === "AUTHENTICATED" || caller === "PRIVILEGED";
  if (required === "AUTHENTICATED") return caller === "AUTHENTICATED" || caller === "PRIVILEGED";
  if (required === "PRIVILEGED") return caller === "PRIVILEGED";
  return false;
}
