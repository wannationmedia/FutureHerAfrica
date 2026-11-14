import { createReadStream, statSync } from "node:fs";
import { Readable } from "node:stream";
import { resolveEpisodeMaster } from "@/lib/media/episode-masters";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ code: string }>;
};

function videoHeaders(size: number, extra?: Record<string, string>) {
  return {
    "Accept-Ranges": "bytes",
    "Content-Type": "video/mp4",
    "Cache-Control": "private, max-age=0, must-revalidate",
    "X-Content-Type-Options": "nosniff",
    ...extra,
  };
}

function streamFile(filePath: string, request: Request) {
  let size = 0;
  try {
    size = statSync(filePath).size;
  } catch {
    return new Response("Not found", { status: 404 });
  }

  const range = request.headers.get("range");
  if (!range) {
    if (request.method === "HEAD") {
      return new Response(null, {
        status: 200,
        headers: videoHeaders(size, { "Content-Length": String(size) }),
      });
    }
    const stream = createReadStream(filePath);
    return new Response(Readable.toWeb(stream) as ReadableStream, {
      status: 200,
      headers: videoHeaders(size, { "Content-Length": String(size) }),
    });
  }

  const match = /^bytes=(\d*)-(\d*)$/.exec(range.trim());
  if (!match) {
    return new Response("Invalid range", { status: 416 });
  }

  const start = match[1] ? Number(match[1]) : 0;
  const end = match[2] ? Number(match[2]) : size - 1;
  if (
    !Number.isInteger(start) ||
    !Number.isInteger(end) ||
    start < 0 ||
    end < 0 ||
    start >= size ||
    end >= size ||
    start > end
  ) {
    return new Response(null, {
      status: 416,
      headers: { "Content-Range": `bytes */${size}` },
    });
  }

  if (request.method === "HEAD") {
    return new Response(null, {
      status: 206,
      headers: videoHeaders(size, {
        "Content-Range": `bytes ${start}-${end}/${size}`,
        "Content-Length": String(end - start + 1),
      }),
    });
  }

  const stream = createReadStream(filePath, { start, end });
  return new Response(Readable.toWeb(stream) as ReadableStream, {
    status: 206,
    headers: videoHeaders(size, {
      "Content-Range": `bytes ${start}-${end}/${size}`,
      "Content-Length": String(end - start + 1),
    }),
  });
}

export async function GET(request: Request, context: RouteContext) {
  const { code } = await context.params;
  const filePath = resolveEpisodeMaster(code);
  if (!filePath) return new Response("Not found", { status: 404 });
  return streamFile(filePath, request);
}

export async function HEAD(request: Request, context: RouteContext) {
  return GET(request, context);
}
