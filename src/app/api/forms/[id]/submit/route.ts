import { NextRequest, NextResponse } from "next/server";

import { submitApplication } from "@/features/public-form/services/applicationSubmission";
import {
  getClientFingerprint,
  publicFormRateLimits,
  rateLimit,
  rateLimitResponse,
} from "@/lib/rateLimit";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const fingerprint = getClientFingerprint(req);
    const submissionLimit = await rateLimit({
      key: `crewcast:rl:public-form:submit:${id}:${fingerprint.hash}`,
      ...publicFormRateLimits.submit,
    });

    if (!submissionLimit.allowed) {
      return rateLimitResponse(
        submissionLimit,
        "Too many applications from this device. Please try again later."
      );
    }

    const body = await req.json();
    const responses =
      typeof body === "object" && body !== null
        ? (body as Record<string, unknown>)
        : {};

    const result = await submitApplication({
      publicFormId: id,
      origin: req.nextUrl.origin,
      responses,
    });

    return NextResponse.json(result.body, { status: result.status });
  } catch (error) {
    console.error("Submit application route failed:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
