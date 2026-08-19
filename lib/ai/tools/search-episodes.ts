import { getPublishedCatalog, toAgentEpisode } from "@/lib/ai/published-catalog";
import { registerTool } from "@/lib/ai/registry";
import type { SeriesKey } from "@/lib/catalog";

const SERIES = new Set<SeriesKey>(["AI", "MONEY"]);

function normalize(value: string): string {
  return value.toLowerCase();
}

registerTool<{ query: string; limit?: number; series?: SeriesKey }, { query: string; count: number; episodes: ReturnType<typeof toAgentEpisode>[] }>({
  name: "searchEpisodes",
  description:
    "Search published FutureHer episodes by title, synopsis, description, slug, or episode code.",
  authenticationRequirement: "none",
  authorizationLevel: "PUBLIC",
  sideEffectClassification: "read",
  auditRequirements: "log",
  inputSchema: {
    type: "object",
    additionalProperties: false,
    required: ["query"],
    properties: {
      query: { type: "string", minLength: 1, maxLength: 200 },
      limit: { type: "integer", minimum: 1, maximum: 10 },
      series: { type: "string", enum: ["AI", "MONEY"] },
    },
  },
  outputSchema: {
    type: "object",
    additionalProperties: false,
    required: ["query", "count", "episodes"],
    properties: {
      query: { type: "string" },
      count: { type: "integer" },
      episodes: { type: "array" },
    },
  },
  async execute(input) {
    const limit = input.limit ?? 5;
    const series = input.series;
    if (series !== undefined && !SERIES.has(series as SeriesKey)) {
      throw new Error("Unknown series.");
    }
    const needle = normalize(input.query.trim());
    const catalog = await getPublishedCatalog();
    const episodes = catalog.episodes
      .filter((episode) => (series ? episode.series === series : true))
      .filter((episode) => {
        const haystack = [
          episode.title,
          episode.synopsis,
          episode.description,
          episode.slug,
          episode.code,
        ]
          .join("\n")
          .toLowerCase();
        return haystack.includes(needle);
      })
      .slice(0, limit)
      .map(toAgentEpisode);

    return {
      query: input.query.trim(),
      count: episodes.length,
      episodes,
    };
  },
});
