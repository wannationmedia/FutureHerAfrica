import { publicAgentContext } from "@/lib/ai/context";
import { invokeRegisteredTool, listPublicToolManifest } from "@/lib/ai/orchestrator";
import { getConfiguredProvider } from "@/lib/ai/providers";
import { runFutureHerAi } from "@/lib/ai/runtime";
import {
  consumePublicPostBudget,
  rateLimitedHeaders,
  readPublicJsonBody,
} from "@/lib/http/public-request-guard";

export const dynamic = "force-dynamic";

export async function GET() {
  const provider = getConfiguredProvider();
  return Response.json({
    name: "FutureHer AI",
    modelProvider: provider ? provider.kind : null,
    provider: provider ? { id: provider.id, kind: provider.kind } : null,
    runtime: true,
    chatUi: false,
    authorization: "PUBLIC",
    notice: provider
      ? "This entrypoint executes allowlisted read tools only. Catalogue text is untrusted."
      : "This entrypoint executes allowlisted read tools only. Catalogue text is untrusted. No model provider is configured.",
    tools: listPublicToolManifest(),
  });
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return Response.json(
      { ok: false, error: { code: "UNSUPPORTED_MEDIA", message: "Expected application/json." } },
      { status: 415 }
    );
  }

  if (!consumePublicPostBudget(request, "ai-post")) {
    return rateLimitedResponse();
  }

  const parsed = await readPublicJsonBody(request);
  if (!parsed.ok) {
    if (parsed.reason === "payload") {
      return Response.json(
        { ok: false, error: { code: "PAYLOAD_TOO_LARGE", message: "Request body is too large." } },
        { status: 413 }
      );
    }
    return Response.json(
      { ok: false, error: { code: "INVALID_JSON", message: "Request body must be JSON." } },
      { status: 400 }
    );
  }
  const body = parsed.value;

  if (isDirectToolInvoke(body)) {
    const result = await invokeRegisteredTool(body, publicAgentContext());
    return Response.json(result, { status: result.ok ? 200 : statusFor(result.error.code) });
  }

  if (isRuntimeMessage(body)) {
    if (!consumePublicPostBudget(request, "ai-message")) {
      return rateLimitedResponse();
    }
    const provider = getConfiguredProvider();
    if (!provider) {
      return Response.json(
        {
          ok: false,
          error: {
            code: "PROVIDER_UNAVAILABLE",
            message: "No model provider is configured. Direct tool invocation remains available.",
          },
        },
        { status: 501 }
      );
    }
    try {
      const result = await runFutureHerAi({
        request: { message: body.message },
        provider,
        agent: publicAgentContext(),
      });
      return Response.json(result, { status: result.ok ? 200 : statusFor(result.error.code) });
    } catch {
      return Response.json(
        {
          ok: false,
          error: {
            code: "PROVIDER_FAILED",
            message: "The model provider could not complete this request.",
          },
        },
        { status: 502 }
      );
    }
  }

  return Response.json(
    { ok: false, error: { code: "INVALID_INPUT", message: "Expected { tool, input } or { message }." } },
    { status: 400 }
  );
}

function isDirectToolInvoke(body: unknown): body is { tool: unknown; input: unknown } {
  return Boolean(body && typeof body === "object" && !Array.isArray(body) && "tool" in body && "input" in body);
}

function isRuntimeMessage(body: unknown): body is { message: string } {
  return Boolean(
    body &&
      typeof body === "object" &&
      !Array.isArray(body) &&
      "message" in body &&
      !("tool" in body)
  );
}

function rateLimitedResponse() {
  return Response.json(
    { ok: false, error: { code: "RATE_LIMITED", message: "Too many requests. Try again shortly." } },
    { status: 429, headers: rateLimitedHeaders() }
  );
}

function statusFor(code: string): number {
  switch (code) {
    case "UNKNOWN_TOOL":
      return 404;
    case "UNAUTHORIZED":
    case "AUTH_REQUIRED":
      return 403;
    case "PROVIDER_UNAVAILABLE":
      return 501;
    case "PROVIDER_FAILED":
      return 502;
    case "LIMIT_EXCEEDED":
      return 400;
    case "INVALID_INPUT":
      return 400;
    default:
      return 400;
  }
}
