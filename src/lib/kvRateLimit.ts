import { Redis } from "@upstash/redis";
import { Ratelimit, type Duration } from "@upstash/ratelimit";
import { NextResponse } from "next/server";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

/**
 * Helper to create a sliding-window limiter with Upstash.
 * @param limit  requests allowed
 * @param window human-readable window size (e.g. "1 m", "30 s")
 */
function createLimiter(limit: number = 10, window: Duration = "1 m") {
  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(limit, window),
    prefix: "rl",
  });
}

// Default limiter: 10 req / minute
export const defaultLimiter = createLimiter();

type Handler = (req: Request) => Promise<Response> | Response;

interface RateLimitOptions {
  /** customise how to identify the caller */
  keyGenerator?: (req: Request) => string;
  /** override max requests (default 10) */
  limit?: number;
  /** override window (default "1 m") */
  window?: Duration;
}

/**
 * Wrap a Route Handler with global, KV-backed rate limiting.
 *
 * Example:
 *   export const GET = withRateLimit(async (req) => { ... });
 */
export function withRateLimit(
  handler: Handler,
  opts: RateLimitOptions = {},
): Handler {
  const { keyGenerator, limit = 10, window = "1 m" } = opts;
  const limiter = limit === 10 && window === "1 m"
    ? defaultLimiter
    : createLimiter(limit, window);

  return async function rateLimitedHandler(request: Request) {
    const key =
      (keyGenerator ? keyGenerator(request) : request.headers.get("authorization")) ??
      request.headers.get("x-forwarded-for") ??
      "anonymous";

    const { success, remaining, limit: total, reset } = await limiter.limit(key);

    if (!success) {
      return new NextResponse(
        JSON.stringify({ error: "Too many requests" }),
        {
          status: 429,
          headers: {
            "Content-Type": "application/json",
            "Retry-After": `${Math.ceil(reset / 1000)}`,
            "X-RateLimit-Limit": `${total}`,
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": `${Math.floor(reset / 1000)}`,
          },
        },
      );
    }

    const response = await handler(request);

    response.headers.set("X-RateLimit-Limit", `${total}`);
    response.headers.set("X-RateLimit-Remaining", `${remaining}`);
    response.headers.set("X-RateLimit-Reset", `${Math.floor(reset / 1000)}`);

    return response;
  };
} 