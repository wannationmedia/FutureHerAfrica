import { getPublishedCatalog, isCatalogSlug, toAgentEpisode, toAgentShow } from "@/lib/ai/published-catalog";
import { registerTool } from "@/lib/ai/registry";

registerTool<{ slug: string }, { found: boolean; show: unknown }>({
  name: "getShow",
  description: "Return one FutureHer show and its published episodes by show slug.",
  authenticationRequirement: "none",
  authorizationLevel: "PUBLIC",
  sideEffectClassification: "read",
  auditRequirements: "log",
  inputSchema: {
    type: "object",
    additionalProperties: false,
    required: ["slug"],
    properties: {
      slug: {
        type: "string",
        minLength: 1,
        maxLength: 160,
        pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$",
      },
    },
  },
  outputSchema: {
    type: "object",
    additionalProperties: false,
    required: ["found"],
    properties: {
      found: { type: "boolean" },
      show: { type: "object", additionalProperties: true },
    },
  },
  async execute(input) {
    if (!isCatalogSlug(input.slug)) {
      return { found: false as const, show: null };
    }
    const catalog = await getPublishedCatalog();
    if (catalog.show.slug !== input.slug) {
      return { found: false as const, show: null };
    }
    return {
      found: true as const,
      show: {
        ...toAgentShow(catalog),
        playlists: catalog.playlists.map((playlist) => ({
          slug: playlist.slug,
          title: playlist.title,
          description: playlist.description,
          series: playlist.series,
          youtubePlaylistId: playlist.youtubePlaylistId,
          episodeCodes: playlist.episodeCodes,
        })),
        episodes: catalog.episodes.map(toAgentEpisode),
      },
    };
  },
});
