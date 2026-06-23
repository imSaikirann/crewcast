import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getClientFingerprint, rateLimit, rateLimitResponse } from "@/lib/rateLimit";
import {
  findGithubPeople,
  type FindGithubPeopleOptions,
} from "@/features/people/server/githubPeople";
import type { PeopleSort } from "@/features/people/types";

const PER_PAGE = 12;
const MAX_LANGUAGES = 5;
const VALID_SORTS: PeopleSort[] = ["followers", "repositories", "joined"];
const LANGUAGE_PATTERN = /^[\w +#.\-/]{1,40}$/;

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const fingerprint = getClientFingerprint(req);
    const limit = await rateLimit({
      key: `crewcast:rl:github-people:${session.user.id}:${fingerprint.hash}`,
      limit: 15,
      windowSeconds: 60,
    });
    if (!limit.allowed) return rateLimitResponse(limit);

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const languages = Array.isArray(body.languages)
      ? body.languages
          .filter((item: unknown): item is string => typeof item === "string")
          .map((item: string) => item.trim())
          .filter((item: string) => LANGUAGE_PATTERN.test(item))
          .slice(0, MAX_LANGUAGES)
      : [];

    const location =
      typeof body.location === "string" ? body.location.trim().slice(0, 60) : "";

    const minFollowersRaw = Number(body.minFollowers);
    const minFollowers =
      Number.isFinite(minFollowersRaw) && minFollowersRaw > 0
        ? Math.min(Math.floor(minFollowersRaw), 100_000)
        : 0;

    const sort: PeopleSort = VALID_SORTS.includes(body.sort)
      ? (body.sort as PeopleSort)
      : "followers";

    const pageRaw = Number(body.page);
    const page =
      Number.isFinite(pageRaw) && pageRaw >= 1 ? Math.min(Math.floor(pageRaw), 10) : 1;

    if (languages.length === 0 && !location && minFollowers === 0) {
      return NextResponse.json(
        { error: "Select at least one language, a location, or a follower minimum." },
        { status: 400 }
      );
    }

    const options: FindGithubPeopleOptions = {
      languages,
      location,
      minFollowers,
      sort,
      page,
      perPage: PER_PAGE,
    };

    const result = await findGithubPeople(options);
    return NextResponse.json(result);
  } catch (error) {
    console.error("GitHub people search failed:", error);
    const message =
      error instanceof Error ? error.message : "GitHub people search failed";
    const isRateLimit = message.toLowerCase().includes("rate limit");
    return NextResponse.json(
      { error: message },
      { status: isRateLimit ? 429 : 502 }
    );
  }
}
