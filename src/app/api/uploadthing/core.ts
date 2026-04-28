import { createUploadthing, type FileRouter } from "uploadthing/next";
import type { FileSize } from "@uploadthing/shared";
import { UploadThingError } from "uploadthing/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

const f = createUploadthing();

export const ourFileRouter = {
  resumeUploader: f({
    pdf: {
      maxFileSize: "5MB" as FileSize,
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const session = await getServerSession(authOptions);
      if (!session?.user?.id) {
        throw new UploadThingError("Unauthorized");
      }

      const recruiter = await prisma.recruiter.findUnique({
        where: { userId: session.user.id },
        select: { id: true },
      });

      if (!recruiter) {
        throw new UploadThingError("Recruiter profile required");
      }

      return { userId: session.user.id, recruiterId: recruiter.id };
    })
    .onUploadComplete(async ({ file }) => {
      return {
        url: file.ufsUrl || file.url,
        name: file.name,
        size: file.size,
        type: file.type,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
