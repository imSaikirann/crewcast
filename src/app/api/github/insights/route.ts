import { NextRequest, NextResponse } from "next/server";

import { scoreGitHubProfile } from "@/lib/githubScoring";

export async function POST(req: NextRequest) {
  try {
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
