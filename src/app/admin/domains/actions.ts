"use server";

import { revalidatePath } from "next/cache";

import { Prisma } from "@prisma/client";
import { cacheDel } from "@/lib/redis";
import { cacheKeys } from "@/lib/cacheKeys";
import { isGitHubField, withGitHubField, withRequiredGitHubField } from "@/lib/formFields";
import { prisma } from "@/lib/prisma";

export type DomainActionState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: {
    domainId?: string;
    title?: string;
    description?: string;
    fieldsJson?: string;
  };
};

async function parseDefaultFieldsOrError({
  createDefaultForm,
  fieldsJson,
  fieldErrors,
}: {
  createDefaultForm: boolean;
  fieldsJson: string;
  fieldErrors: NonNullable<DomainActionState["fieldErrors"]>;
}) {
  let fields: Prisma.InputJsonValue = [];

  if (!createDefaultForm) {
    return { fields };
  }

  if (!fieldsJson) {
    fieldErrors.fieldsJson = "Default fields JSON is required when enabled.";
    return { fields };
  }

  try {
    const parsed = JSON.parse(fieldsJson);
    if (!Array.isArray(parsed)) {
      fieldErrors.fieldsJson = "Default fields JSON must be an array.";
      return { fields };
    }
    if (parsed.length === 0) {
      fieldErrors.fieldsJson = "Add at least one default field.";
      return { fields };
    }
    /**
     * Admin may create non-software domains (Sales, Ops, etc.) where GitHub
     * isn't relevant. Only enforce the locked GitHub field if the admin included
     * it (or something that looks like it) in the JSON.
     */
    fields = (parsed.some(isGitHubField)
      ? withGitHubField(parsed, { ensure: true })
      : withGitHubField(parsed, { ensure: false })) as Prisma.InputJsonValue;
    return { fields };
  } catch {
    fieldErrors.fieldsJson =
      "Default fields JSON is invalid. Check commas, quotes, and brackets.";
    return { fields };
  }
}

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

  const { fields } = await parseDefaultFieldsOrError({
    createDefaultForm,
    fieldsJson,
    fieldErrors,
  });

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

export async function updateDomainAction(
  _previousState: DomainActionState,
  formData: FormData
): Promise<DomainActionState> {
  const domainId = String(formData.get("domainId") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const isActive = formData.get("isActive") === "on";
  const createDefaultForm = formData.get("createDefaultForm") === "on";
  const fieldsJson = String(formData.get("fieldsJson") ?? "").trim();

  const fieldErrors: NonNullable<DomainActionState["fieldErrors"]> = {};

  if (!domainId) {
    fieldErrors.domainId = "Domain id is missing.";
  }

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

  const { fields } = await parseDefaultFieldsOrError({
    createDefaultForm,
    fieldsJson,
    fieldErrors,
  });

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Please fix the highlighted domain fields.",
      fieldErrors,
    };
  }

  try {
    const existing = await prisma.domains.findUnique({
      where: { id: domainId },
      select: { id: true, title: true },
    });

    if (!existing) {
      return {
        status: "error",
        message: "Domain could not be found. Refresh and try again.",
      };
    }

    if (existing.title !== title) {
      const conflict = await prisma.domains.findUnique({
        where: { title },
        select: { id: true },
      });
      if (conflict && conflict.id !== domainId) {
        return {
          status: "error",
          message: "Please fix the highlighted domain fields.",
          fieldErrors: { title: "A domain with this title already exists." },
        };
      }
    }

    const domain = await prisma.domains.update({
      where: { id: domainId },
      data: {
        title,
        description,
        isActive,
        haveDefaultForm: createDefaultForm,
      },
      select: { id: true },
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
      message: `${title} has been updated.`,
    };
  } catch {
    return {
      status: "error",
      message: "Domain could not be updated. Please try again.",
    };
  }
}

export async function deleteDomainAction(
  _previousState: DomainActionState,
  formData: FormData
): Promise<DomainActionState> {
  const domainId = String(formData.get("domainId") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();

  if (!domainId) {
    return {
      status: "error",
      message: "Domain id is missing.",
      fieldErrors: { domainId: "Domain id is missing." },
    };
  }

  try {
    const existing = await prisma.domains.findUnique({
      where: { id: domainId },
      select: {
        id: true,
        title: true,
        _count: { select: { recruiterForms: true, defaultFormSchemas: true } },
      },
    });

    if (!existing) {
      return {
        status: "error",
        message: "Domain could not be found. Refresh and try again.",
      };
    }

    if (title && existing.title !== title) {
      return {
        status: "error",
        message: "Domain title mismatch. Refresh and try again.",
      };
    }

    await prisma.domains.delete({ where: { id: domainId } });

    revalidatePath("/admin");
    revalidatePath("/admin/domains");
    revalidatePath("/dashboard/domains");
    revalidatePath("/domains");

    await cacheDel(
      cacheKeys.domains,
      cacheKeys.publicDomains,
      cacheKeys.domainDefault(domainId),
      cacheKeys.adminOverview
    );

    const suffix =
      existing._count.recruiterForms > 0
        ? ` (deleted with ${existing._count.recruiterForms} form(s))`
        : "";

    return {
      status: "success",
      message: `${existing.title} has been deleted${suffix}.`,
    };
  } catch {
    return {
      status: "error",
      message: "Domain could not be deleted. Please try again.",
    };
  }
}
