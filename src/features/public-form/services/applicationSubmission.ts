import type { Prisma } from "@prisma/client";

import { cacheKeys } from "@/lib/cacheKeys";
import { extractGitHubUsername, scoreGitHubProfile } from "@/lib/githubScoring";
import { prisma } from "@/lib/prisma";
import { cacheDel } from "@/lib/redis";

type SubmitApplicationInput = {
  publicFormId: string;
  origin: string;
  responses: Record<string, unknown>;
};

type SubmitApplicationResult =
  | {
      ok: true;
      status: number;
      body: {
        success: true;
        id: string;
        trackingUrl: string;
        scoreStatus: "pending";
      };
    }
  | {
      ok: false;
      status: number;
      body: {
        error: string;
      };
    };

type FormFieldLike = {
  id?: string;
  label?: string;
  type?: string;
  required?: boolean;
};

export async function submitApplication({
  publicFormId,
  origin,
  responses,
}: SubmitApplicationInput): Promise<SubmitApplicationResult> {
  if (!publicFormId) {
    return failure("Missing form id", 400);
  }

  const form = await prisma.recruiterForm.findUnique({
    where: { publicId: publicFormId },
    select: {
      id: true,
      isFlagged: true,
      fields: true,
      techStack: true,
      openings: true,
    },
  });

  if (!form) {
    return failure("Form not found", 404);
  }

  if (form.isFlagged) {
    return failure("This job has been flagged", 403);
  }

  const openings = form.openings ?? 1;
  const hiredCount = await prisma.application.count({
    where: { jobId: form.id, status: "HIRED" },
  });

  if (hiredCount >= openings) {
    return failure(
      "This role is already filled. The hiring team has completed the openings for this position.",
      409
    );
  }

  const validationError = validateRequiredResponses(responses, form.fields);
  if (validationError) {
    return failure(validationError, 400);
  }

  const fullName = getStringValue(
    responses.full_name || responses.name || responses.fullName
  );
  const email = getStringValue(responses.email);

  if (!fullName || !email) {
    return failure("Missing name or email", 400);
  }

  const existing = await prisma.application.findFirst({
    where: {
      jobId: form.id,
      email,
    },
  });

  if (existing) {
    return failure("You already applied to this job", 409);
  }

  const githubUsername = extractGitHubUsername(responses, form.fields);
  if (!githubUsername) {
    return failure("A valid GitHub username or profile URL is required", 400);
  }

  const application = await prisma.application.create({
    data: {
      jobId: form.id,
      fullName,
      email,
      responses: responses as Prisma.InputJsonValue,
    },
  });

  void persistGitHubScore({
    applicationId: application.id,
    githubUsername,
    publicFormId,
    requiredTechStack: form.techStack,
  });

  void invalidateApplicationsCache(publicFormId);

  return {
    ok: true,
    status: 200,
    body: {
      success: true,
      id: application.id,
      trackingUrl: `${origin}/application/status/${application.id}`,
      scoreStatus: "pending",
    },
  };
}

async function persistGitHubScore({
  applicationId,
  githubUsername,
  publicFormId,
  requiredTechStack,
}: {
  applicationId: string;
  githubUsername: string;
  publicFormId: string;
  requiredTechStack: string[];
}) {
  try {
    const score = await scoreGitHubProfile(githubUsername, {
      requiredTechStack,
    });

    await prisma.applicationScore.create({
      data: {
        applicationId,
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

    await cacheDel(cacheKeys.jobApplications(publicFormId));
  } catch (error) {
    console.error("Background GitHub scoring failed:", {
      applicationId,
      githubUsername,
      error,
    });
  }
}

async function invalidateApplicationsCache(publicFormId: string) {
  try {
    await cacheDel(cacheKeys.jobApplications(publicFormId));
  } catch (error) {
    console.error("Background application cache invalidation failed:", {
      publicFormId,
      error,
    });
  }
}

function validateRequiredResponses(
  data: Record<string, unknown>,
  fields: unknown
) {
  const fieldList = Array.isArray(fields) ? fields : [];

  for (const field of fieldList as FormFieldLike[]) {
    if (!field?.required || !field.id) continue;

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

function getStringValue(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function failure(error: string, status: number): SubmitApplicationResult {
  return {
    ok: false,
    status,
    body: { error },
  };
}
