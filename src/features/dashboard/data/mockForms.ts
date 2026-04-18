import type { JobForm } from "../types/dashboard.types";

export const forms: JobForm[] = [
  {
    id: "1",
    publicId: "demo",
    title: "Full-Stack Engineer",
    description:
      "We're hiring a full-stack engineer to build and maintain real production software, not demo projects.",
    fieldsCount: 2,
    isActive: true,
    status: "PUBLISHED",
    createdAt: "2025-01-26",
    expiresAt: "2026-01-11",
    submissions: 6,
    newSubmissions: 3,
    views: 24,
  },
];
