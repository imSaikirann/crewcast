import * as z from 'zod';
import { RoleTypeSchema } from '../../enums/RoleType.schema';
import { ExperienceSchema } from '../../enums/Experience.schema';
import { WorkModeSchema } from '../../enums/WorkMode.schema';
import { JobStatusSchema } from '../../enums/JobStatus.schema';
// prettier-ignore
export const RecruiterFormInputSchema = z.object({
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
    location: z.string().optional().nullable(),
    salaryMin: z.number().int().optional().nullable(),
    salaryMax: z.number().int().optional().nullable(),
    currency: z.string().optional().nullable(),
    techStack: z.array(z.string()),
    openings: z.number().int(),
    contractDurationMonths: z.number().int().optional().nullable(),
    showCompanyName: z.boolean(),
    status: JobStatusSchema,
    version: z.number().int(),
    publishedAt: z.date().optional().nullable(),
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

export type RecruiterFormInputType = z.infer<typeof RecruiterFormInputSchema>;
