import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cacheDel } from "@/lib/redis";
import { cacheKeys } from "@/lib/cacheKeys";
import { extractGitHubUsername, scoreGitHubProfile } from "@/lib/githubScoring";


// ADD DATA VALIDATION
export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;   

    const data = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Missing form id" }, { status: 400 });
    }

    // find form
    const form = await prisma.recruiterForm.findUnique({
      where: { publicId: id },
      select: { id: true, isFlagged: true, fields: true },
    });

    if (!form) {
      return NextResponse.json({ error: "Form not found" }, { status: 404 });
    }

    if (form.isFlagged) {
      return NextResponse.json(
        { error: "This job has been flagged" },
        { status: 403 }
      );
    }

    const validationError = validateRequiredResponses(data, form.fields);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const fullName =
      data.full_name || data.name || data.fullName || null;
    const email = data.email || null;

    if (!fullName || !email) {
      return NextResponse.json(
        { error: "Missing name or email" },
        { status: 400 }
      );
    }

    // prevent duplicate apply
    const existing = await prisma.application.findFirst({
      where: {
        jobId: form.id,
        email,
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: "You already applied to this job" },
        { status: 409 }
      );
    }

    const githubUsername = extractGitHubUsername(data, form.fields);
    if (!githubUsername) {
      return NextResponse.json(
        { error: "A valid GitHub username or profile URL is required" },
        { status: 400 }
      );
    }

    const app = await prisma.application.create({
      data: {
        jobId: form.id,
        fullName,
        email,
        responses: data
      },
    });

    const score = await scoreGitHubProfile(githubUsername);
    await prisma.applicationScore.create({
      data: {
        applicationId: app.id,
        totalScore: score.totalScore,
        breakdown: {
          ...score.breakdown,
          profile: {
            ...score.breakdown.profile,
            username: score.breakdown.profile.username ?? githubUsername,
          },
        },
      },
    });

    await cacheDel(cacheKeys.jobApplications(id));

    return NextResponse.json({ success: true, id: app.id, score: score.totalScore });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

function validateRequiredResponses(
  data: Record<string, unknown>,
  fields: unknown
) {
  const fieldList = Array.isArray(fields) ? fields : [];

  for (const field of fieldList as any[]) {
    if (!field?.required) continue;

    const value = data[field.id];
    const empty =
      value === undefined ||
      value === null ||
      value === "" ||
      (Array.isArray(value) && value.length === 0);

    if (empty) {
      return `${field.label || "A required field"} is required.`;
    }

    if (field.type === "email" && typeof value === "string") {
      const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      if (!validEmail) return `${field.label || "Email"} must be a valid email.`;
    }

    if (field.type === "url" && typeof value === "string") {
      try {
        new URL(value);
      } catch {
        return `${field.label || "URL"} must be a valid URL.`;
      }
    }
  }

  return null;
}
