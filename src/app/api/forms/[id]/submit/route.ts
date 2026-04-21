import { NextRequest, NextResponse } from "next/server";

import { submitApplication } from "@/features/public-form/services/applicationSubmission";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
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
