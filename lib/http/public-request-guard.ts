const IP_PATTERN =
  /^(?:\d{1,3}\.){3}\d{1,3}$|^[0-9a-fA-F:]+$/;

export const PUBLIC_JSON_BODY_LIMIT_BYTES = 64 * 1024;
export const PUBLIC_POST_WINDOW_MS = 60_000;
export const PUBLIC_AI_POST_LIMIT = 120;
export const PUBLIC_AI_MESSAGE_LIMIT = 10;
export const PUBLIC_MCP_POST_LIMIT = 60;

export type PublicPostBudget =
  | "ai-post"
  | "ai-message"
  | "mcp-post";

export type PublicJsonReadResult =
  | { ok: true; value: unknown }
  | { ok: false; reason: "payload" | "json" };

type Bucket = {
  tokens: number;
  updatedAt: number;
  limit: number;
};

const buckets = new Map<string, Bucket>();
const MAX_TRACKED_BUCKETS = 8_000;

export function resetPublicRateLimits(): void {
  buckets.clear();
}

export function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim() ?? "";
    if (isPlausibleIp(first)) return first;
  }
  const real = request.headers.get("x-real-ip")?.trim() ?? "";
  if (isPlausibleIp(real)) return real;
  return "unknown";
}

export function consumePublicPostBudget(
  request: Request,
  budget: PublicPostBudget
): boolean {
  const limit =
    budget === "ai-message"
      ? PUBLIC_AI_MESSAGE_LIMIT
      : budget === "mcp-post"
        ? PUBLIC_MCP_POST_LIMIT
        : PUBLIC_AI_POST_LIMIT;
  return takeToken(`${budget}:${clientIp(request)}`, limit, PUBLIC_POST_WINDOW_MS);
}

export async function readPublicJsonBody(request: Request): Promise<PublicJsonReadResult> {
  const declared = request.headers.get("content-length");
  if (declared) {
    const length = Number.parseInt(declared, 10);
    if (Number.isFinite(length) && length > PUBLIC_JSON_BODY_LIMIT_BYTES) {
      return { ok: false, reason: "payload" };
    }
  }

  const bytes = await readLimitedBytes(request, PUBLIC_JSON_BODY_LIMIT_BYTES);
  if (bytes === null) {
    return { ok: false, reason: "payload" };
  }

  try {
    const text = new TextDecoder().decode(bytes);
    return { ok: true, value: JSON.parse(text) as unknown };
  } catch {
    return { ok: false, reason: "json" };
  }
}

export function rateLimitedHeaders(): HeadersInit {
  return { "Retry-After": String(Math.ceil(PUBLIC_POST_WINDOW_MS / 1000)) };
}

function takeToken(key: string, limit: number, windowMs: number): boolean {
  pruneBuckets(windowMs);
  const now = Date.now();
  const current = buckets.get(key);
  if (!current) {
    buckets.set(key, { tokens: limit - 1, updatedAt: now, limit });
    return true;
  }

  const refill = ((now - current.updatedAt) / windowMs) * current.limit;
  const tokens = Math.min(current.limit, current.tokens + refill);
  if (tokens < 1) {
    current.tokens = tokens;
    current.updatedAt = now;
    return false;
  }

  current.tokens = tokens - 1;
  current.updatedAt = now;
  current.limit = limit;
  return true;
}

function pruneBuckets(windowMs: number): void {
  if (buckets.size < MAX_TRACKED_BUCKETS) return;
  const staleBefore = Date.now() - windowMs * 2;
  for (const [key, bucket] of buckets) {
    if (bucket.updatedAt < staleBefore) buckets.delete(key);
  }
  if (buckets.size >= MAX_TRACKED_BUCKETS) {
    buckets.clear();
  }
}

async function readLimitedBytes(
  request: Request,
  maxBytes: number
): Promise<Uint8Array | null> {
  if (!request.body) return new Uint8Array(0);

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let received = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    received += value.byteLength;
    if (received > maxBytes) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }

  const bytes = new Uint8Array(received);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return bytes;
}

function isPlausibleIp(value: string): boolean {
  return value.length > 0 && value.length <= 45 && IP_PATTERN.test(value);
}
