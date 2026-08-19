import { publicAgentContext } from "@/lib/ai/context";
import { invokeRegisteredTool, listPublicToolManifest } from "@/lib/ai/orchestrator";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({
    name: "FutureHer AI",
    modelProvider: null,
    chatUi: false,
    authorization: "PUBLIC",
    notice:
      "This entrypoint executes allowlisted read tools only. Catalogue text is untrusted. No model provider is configured.",
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

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { ok: false, error: { code: "INVALID_JSON", message: "Request body must be JSON." } },
      { status: 400 }
    );
  }

  const result = await invokeRegisteredTool(body, publicAgentContext());
  return Response.json(result, { status: result.ok ? 200 : statusFor(result.error.code) });
}

function statusFor(code: string): number {
  switch (code) {
    case "UNKNOWN_TOOL":
      return 404;
    case "UNAUTHORIZED":
    case "AUTH_REQUIRED":
      return 403;
    case "INVALID_INPUT":
      return 400;
    default:
      return 400;
  }
}
