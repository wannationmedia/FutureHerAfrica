import type { ProviderToolDescriptor } from "@/lib/ai/providers/types";
import type { JsonSchema } from "@/lib/ai/types";

export type OpenAIFunctionToolDefinition = {
  type: "function";
  name: string;
  description: string;
  parameters: Record<string, unknown>;
  strict: false;
};

export function toOpenAIFunctionTools(tools: ProviderToolDescriptor[]): OpenAIFunctionToolDefinition[] {
  return tools.map((tool) => ({
    type: "function",
    name: tool.name,
    description: tool.description,
    parameters: jsonSchemaToParameters(tool.inputSchema),
    strict: false,
  }));
}

function jsonSchemaToParameters(schema: JsonSchema): Record<string, unknown> {
  return {
    type: schema.type ?? "object",
    additionalProperties: schema.additionalProperties ?? false,
    properties: schema.properties ?? {},
    ...(schema.required ? { required: schema.required } : {}),
  };
}
