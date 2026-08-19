import { webmcpDiscoveryDocument } from "@/lib/ai/webmcp";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(webmcpDiscoveryDocument());
}
