import { createHash } from "crypto";
import { NextRequest, NextResponse } from "next/server";

import { cacheExpire, cacheIncr } from "@/lib/redis";

type RateLimitConfig = {
  key: string;
  limit: number;
  windowSeconds: number;
};

type RateLimitResult = {
  allowed: boolean;
  limit: number;
  remaining: number;
  retryAfter: number;
};

export const publicFormRateLimits = {
  fetch: { limit: 30, windowSeconds: 60 },
  submit: { limit: 3, windowSeconds: 60 * 60 },
  report: { limit: 2, windowSeconds: 24 * 60 * 60 },
} as const;

export function getClientFingerprint(req: NextRequest) {
  const forwardedFor = req.headers.get("x-forwarded-for");
  const ip =
    forwardedFor?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  const userAgent = req.headers.get("user-agent") || "unknown";

  return {
    ip,
    userAgent,
    hash: hashKey(`${ip}:${userAgent}`),
  };
}

export async function rateLimit({
  key,
  limit,
  windowSeconds,
}: RateLimitConfig): Promise<RateLimitResult> {
  const count = await cacheIncr(key);

  if (count === null) {
    // Cache backend is unavailable. In production we fail closed to keep
    // rate limiting effective; in development we fail open so a missing or
    // cold Redis instance doesn't block local requests.
    const allowed = process.env.NODE_ENV !== "production";
    return {
      allowed,
      limit,
      remaining: allowed ? limit : 0,
      retryAfter: windowSeconds,
    };
  }

  if (count === 1) {
    await cacheExpire(key, windowSeconds);
  }

  return {
    allowed: count <= limit,
    limit,
    remaining: Math.max(limit - count, 0),
    retryAfter: windowSeconds,
  };
}

export function rateLimitResponse(
  result: RateLimitResult,
  message = "Too many requests. Please try again later."
) {
  return NextResponse.json(
    { error: message, message },
    {
      status: 429,
      headers: {
        "Retry-After": String(result.retryAfter),
        "X-RateLimit-Limit": String(result.limit),
        "X-RateLimit-Remaining": String(result.remaining),
      },
    }
  );
}

export function hashKey(value: string) {
  return createHash("sha256").update(value).digest("hex").slice(0, 32);
}
