"use server";

import { revalidatePath } from "next/cache";

import { Prisma } from "@prisma/client";
import { cacheDel } from "@/lib/redis";
import { cacheKeys } from "@/lib/cacheKeys";
import { withRequiredGitHubField } from "@/lib/formFields";
import { prisma } from "@/lib/prisma";

export type DomainActionState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: {
    title?: string;
    description?: string;
    fieldsJson?: string;
  };
};

export async function createDomainAction(
  _previousState: DomainActionState,
  formData: FormData
): Promise<DomainActionState> {
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const isActive = formData.get("isActive") === "on";
  const createDefaultForm = formData.get("createDefaultForm") === "on";
  const fieldsJson = String(formData.get("fieldsJson") ?? "").trim();

  const fieldErrors: DomainActionState["fieldErrors"] = {};

  if (!title) {
    fieldErrors.title = "Domain title is required.";
  } else if (title.length < 3) {
    fieldErrors.title = "Use at least 3 characters for the domain title.";
  }

  if (!description) {
    fieldErrors.description = "Description is required.";
  } else if (description.length < 20) {
    fieldErrors.description =
      "Add a clearer description so recruiters understand the domain.";
  }

  let fields: Prisma.InputJsonValue = [];
  if (createDefaultForm) {
    if (!fieldsJson) {
      fieldErrors.fieldsJson = "Default fields JSON is required when enabled.";
    } else {
      try {
        const parsed = JSON.parse(fieldsJson);
        if (!Array.isArray(parsed)) {
          fieldErrors.fieldsJson = "Default fields JSON must be an array.";
        } else if (parsed.length === 0) {
          fieldErrors.fieldsJson = "Add at least one default field.";
        } else {
          fields = withRequiredGitHubField(parsed) as Prisma.InputJsonValue;
        }
      } catch {
        fieldErrors.fieldsJson =
          "Default fields JSON is invalid. Check commas, quotes, and brackets.";
      }
    }
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Please fix the highlighted domain fields.",
      fieldErrors,
    };
  }

  try {
    const domain = await prisma.domains.upsert({
      where: { title },
      create: {
        title,
        description,
        isActive,
        haveDefaultForm: createDefaultForm,
      },
      update: {
        description,
        isActive,
        haveDefaultForm: createDefaultForm,
      },
    });

    if (createDefaultForm) {
      await prisma.defaultFormSchema.upsert({
        where: { domainId: domain.id },
        create: {
          domainId: domain.id,
          fields,
          isActive: true,
        },
        update: {
          fields,
          isActive: true,
          version: { increment: 1 },
        },
      });
    }

    revalidatePath("/admin");
    revalidatePath("/admin/domains");
    revalidatePath("/dashboard/domains");
    revalidatePath("/domains");

    await cacheDel(
      cacheKeys.domains,
      cacheKeys.publicDomains,
      cacheKeys.domainDefault(domain.id),
      cacheKeys.adminOverview
    );

    return {
      status: "success",
      message: `${title} has been saved.`,
    };
  } catch {
    return {
      status: "error",
      message: "Domain could not be saved. Please try again.",
    };
  }
}
