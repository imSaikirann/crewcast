import * as z from 'zod';
import { RoleTypeSchema } from '../../enums/RoleType.schema';
import { ExperienceSchema } from '../../enums/Experience.schema';
import { WorkModeSchema } from '../../enums/WorkMode.schema';
import { JobStatusSchema } from '../../enums/JobStatus.schema';
// prettier-ignore
export const RecruiterFormModelSchema = z.object({
    id: z.string(),
    recruiterId: z.string(),
    recruiter: z.unknown(),
    domainId: z.string(),
    domain: z.unknown(),
    publicId: z.string(),
    title: z.string(),
    description: z.string(),
    specialization: z.string(),
    roleType: RoleTypeSchema,
    experience: ExperienceSchema,
    workMode: WorkModeSchema,
    location: z.string().nullable(),
    salaryMin: z.number().int().nullable(),
    salaryMax: z.number().int().nullable(),
    currency: z.string().nullable(),
    techStack: z.array(z.string()),
    contractDurationMonths: z.number().int().nullable(),
    showCompanyName: z.boolean(),
    status: JobStatusSchema,
    version: z.number().int(),
    publishedAt: z.date().nullable(),
    fields: z.unknown(),
    expiresAt: z.date(),
    applications: z.array(z.unknown()),
    createdAt: z.date(),
    updatedAt: z.date(),
    reportCount: z.number().int(),
    isFlagged: z.boolean(),
    viewCount: z.number().int(),
    views: z.array(z.unknown()),
    jobReport: z.array(z.unknown())
}).strict();

export type RecruiterFormPureType = z.infer<typeof RecruiterFormModelSchema>;
