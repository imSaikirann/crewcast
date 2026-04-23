import { createUploadthing, type FileRouter } from "uploadthing/next";
import type { FileSize } from "@uploadthing/shared";

const f = createUploadthing();

export const ourFileRouter = {
  resumeUploader: f({
    pdf: {
      maxFileSize: "5MB" as FileSize,
      maxFileCount: 1,
    },
  })
    .middleware(() => {
      return {};
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
