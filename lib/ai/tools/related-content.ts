import { findPublishedEpisode, getPublishedCatalog, toAgentEpisode } from "@/lib/ai/published-catalog";
import { registerTool } from "@/lib/ai/registry";

registerTool<
  { slug?: string; code?: string; limit?: number },
  { found: boolean; episodes: ReturnType<typeof toAgentEpisode>[] }
>({
  name: "relatedContent",
  description:
    "Return published episodes in the same series or playlist as a given published episode.",
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
      limit: { type: "integer", minimum: 1, maximum: 8 },
    },
  },
  outputSchema: {
    type: "object",
    additionalProperties: false,
    required: ["found"],
    properties: {
      found: { type: "boolean" },
      episodes: { type: "array" },
    },
  },
  async execute(input) {
    if (!input.slug && !input.code) {
      throw new Error("Provide slug or code.");
    }
    if (input.slug && input.code) {
      throw new Error("Provide slug or code, not both.");
    }
    const limit = input.limit ?? 5;
    const catalog = await getPublishedCatalog();
    const origin = findPublishedEpisode(catalog, input);
    if (!origin) {
      return { found: false as const, episodes: [] };
    }

    const playlistCodes = new Set(
      catalog.playlists
        .filter((playlist) => playlist.episodeCodes.includes(origin.code))
        .flatMap((playlist) => playlist.episodeCodes)
    );

    const related = catalog.episodes
      .filter((episode) => episode.code !== origin.code)
      .filter((episode) => episode.series === origin.series || playlistCodes.has(episode.code))
      .slice(0, limit)
      .map(toAgentEpisode);

    return { found: true as const, episodes: related };
  },
});
