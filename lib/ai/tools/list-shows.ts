import { getPublishedCatalog, toAgentShow } from "@/lib/ai/published-catalog";
import { registerTool } from "@/lib/ai/registry";

registerTool<Record<string, never>, { shows: unknown[] }>({
  name: "listShows",
  description: "List published FutureHer shows available on the public catalogue.",
  authenticationRequirement: "none",
  authorizationLevel: "PUBLIC",
  sideEffectClassification: "read",
  auditRequirements: "log",
  inputSchema: {
    type: "object",
    additionalProperties: false,
    properties: {},
  },
  outputSchema: {
    type: "object",
    additionalProperties: false,
    required: ["shows"],
    properties: {
      shows: { type: "array" },
    },
  },
  async execute() {
    const catalog = await getPublishedCatalog();
    return {
      shows: [
        {
          ...toAgentShow(catalog),
          publishedEpisodeCount: catalog.episodes.length,
        },
      ],
    };
  },
});
