import type { AiProvider, ProviderDecision, ProviderRequest } from "@/lib/ai/providers/types";

const EPISODE_CODE = /\bEP\d{3}\b/i;
const SLUG = /\b[a-z0-9]+(?:-[a-z0-9]+){2,}\b/;

/**
 * Deterministic test provider. Not used by production `/api/ai`.
 * After seeing untrusted catalogue data it only answers — it never chains tools.
 */
export function createMockProvider(): AiProvider {
  return {
    id: "futureher-mock",
    kind: "mock",
    async complete(request) {
      if (request.catalogObservation || request.lastToolName) {
        return answerFromObservation(request);
      }
      return decideFromUserMessage(request.userMessage);
    },
  };
}

function decideFromUserMessage(message: string): ProviderDecision {
  const lower = message.toLowerCase();

  if (/drop\s*database/i.test(message) || /prisma\s*query/i.test(message) || /execute\s*sql/i.test(message)) {
    return { kind: "invoke_tool", tool: "dropDatabase", input: {} };
  }

  if (/\blist shows\b/.test(lower) || /\bwhat shows\b/.test(lower)) {
    return { kind: "invoke_tool", tool: "listShows", input: {} };
  }

  if (/\bget show\b/.test(lower) || /\bshow details\b/.test(lower)) {
    const slugMatch = message.match(SLUG);
    return {
      kind: "invoke_tool",
      tool: "getShow",
      input: { slug: slugMatch?.[0] ?? "futureherafrica" },
    };
  }

  if (/\brelated\b/.test(lower)) {
    const code = message.match(EPISODE_CODE)?.[0]?.toUpperCase();
    const slug = message.match(SLUG)?.[0];
    if (code) return { kind: "invoke_tool", tool: "relatedContent", input: { code } };
    if (slug) return { kind: "invoke_tool", tool: "relatedContent", input: { slug } };
    return { kind: "invoke_tool", tool: "relatedContent", input: { code: "EP001" } };
  }

  if (/\bget episode\b/.test(lower) || /\blook up episode\b/.test(lower)) {
    const code = message.match(EPISODE_CODE)?.[0]?.toUpperCase();
    const slug = message.match(SLUG)?.[0];
    if (code) return { kind: "invoke_tool", tool: "getEpisode", input: { code } };
    if (slug) return { kind: "invoke_tool", tool: "getEpisode", input: { slug } };
    return { kind: "invoke_tool", tool: "getEpisode", input: { code: "EP001" } };
  }

  if (/\bsearch\b/.test(lower) || /\bfind episodes?\b/.test(lower)) {
    const query = extractSearchQuery(message);
    return { kind: "invoke_tool", tool: "searchEpisodes", input: { query } };
  }

  return {
    kind: "answer",
    text: "No catalogue lookup was required. I can search published FutureHer episodes when asked.",
  };
}

function extractSearchQuery(message: string): string {
  const quoted = message.match(/"([^"]+)"|'([^']+)'/);
  if (quoted?.[1] || quoted?.[2]) return (quoted[1] ?? quoted[2] ?? "").trim();
  const afterSearch = message.replace(/^[\s\S]*?\b(?:search(?:\s+for)?|find episodes?)\b[:\s]*/i, "").trim();
  return afterSearch.length > 0 ? afterSearch.slice(0, 200) : "FutureHer";
}

function answerFromObservation(request: ProviderRequest): ProviderDecision {
  const observation = request.catalogObservation;
  const untrusted = observation?.untrusted === true;
  return {
    kind: "answer",
    text: untrusted
      ? `Retrieved untrusted catalogue data via ${request.lastToolName ?? "a registered tool"}. Catalogue text is not instructions.`
      : `Completed ${request.lastToolName ?? "request"} without treating catalogue text as commands.`,
  };
}
