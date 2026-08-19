import { findPublishedEpisode, getPublishedCatalog, toAgentEpisode } from "@/lib/ai/published-catalog";
import { registerTool } from "@/lib/ai/registry";
import type { JsonSchema } from "@/lib/ai/types";

const episodeOutput: JsonSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    found: { type: "boolean" },
    episode: { type: "object", additionalProperties: true },
  },
  required: ["found"],
};

registerTool<{ slug?: string; code?: string }, { found: boolean; episode: ReturnType<typeof toAgentEpisode> | null }>({
  name: "getEpisode",
  description: "Return one published FutureHer episode by slug or episode code.",
  authenticationRequirement: "none",
  authorizationLevel: "PUBLIC",
  sideEffectClassification: "read",
  auditRequirements: "log",
  inputSchema: {
    type: "object",
    additionalProperties: false,
    properties: {
      slug: {
        type: "string",
        minLength: 1,
        maxLength: 160,
        pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$",
      },
      code: {
        type: "string",
        minLength: 5,
        maxLength: 8,
        pattern: "^[Ee][Pp]\\d{3}$",
      },
    },
  },
  outputSchema: episodeOutput,
  async execute(input) {
    if (!input.slug && !input.code) {
      throw new Error("Provide slug or code.");
    }
    if (input.slug && input.code) {
      throw new Error("Provide slug or code, not both.");
    }
    const catalog = await getPublishedCatalog();
    const episode = findPublishedEpisode(catalog, input);
    if (!episode) {
      return { found: false as const, episode: null };
    }
    return { found: true as const, episode: toAgentEpisode(episode) };
  },
});
