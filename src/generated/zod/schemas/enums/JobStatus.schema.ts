import * as z from 'zod';

export const JobStatusSchema = z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED'])

export type JobStatus = z.infer<typeof JobStatusSchema>;