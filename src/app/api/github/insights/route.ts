import { NextRequest, NextResponse } from "next/server";

import { getClientFingerprint, rateLimit, rateLimitResponse } from "@/lib/rateLimit";
import { scoreGitHubProfile } from "@/lib/githubScoring";

export async function POST(req: NextRequest) {
  try {
    const fingerprint = getClientFingerprint(req);
    const limit = await rateLimit({
      key: `crewcast:rl:github-insights:${fingerprint.hash}`,
      limit: 20,
      windowSeconds: 60,
    });
    if (!limit.allowed) return rateLimitResponse(limit);

    const body = await req.json();
    const username =
      typeof body?.username === "string" ? body.username.trim() : "";
    const techStack = Array.isArray(body?.techStack)
      ? body.techStack.filter((item: unknown): item is string => typeof item === "string")
      : [];

    if (!username) {
      return NextResponse.json(
        { error: "username is required" },
        { status: 400 }
      );
    }
    if (!/^[a-z\d](?:[a-z\d-]{0,37})$/i.test(username)) {
      return NextResponse.json(
        { error: "username is invalid" },
        { status: 400 }
      );
    }

    const score = await scoreGitHubProfile(username, {
      requiredTechStack: techStack,
    });

    return NextResponse.json(score);
  } catch (error) {
    console.error("GitHub insight test endpoint failed:", error);
    return NextResponse.json(
      {
        error: "GitHub scoring failed",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 502 }
    );
  }
}
