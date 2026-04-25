import * as z from 'zod';

export const RecruiterFormScalarFieldEnumSchema = z.enum(['id', 'recruiterId', 'domainId', 'publicId', 'title', 'description', 'specialization', 'roleType', 'experience', 'workMode', 'location', 'salaryMin', 'salaryMax', 'currency', 'techStack', 'openings', 'contractDurationMonths', 'showCompanyName', 'status', 'version', 'publishedAt', 'fields', 'expiresAt', 'createdAt', 'updatedAt', 'reportCount', 'isFlagged', 'viewCount'])

export type RecruiterFormScalarFieldEnum = z.infer<typeof RecruiterFormScalarFieldEnumSchema>;