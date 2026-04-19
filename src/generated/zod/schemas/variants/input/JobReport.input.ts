import * as z from 'zod';
// prettier-ignore
export const JobReportInputSchema = z.object({
    id: z.string(),
    formId: z.string(),
    form: z.unknown(),
    reason: z.string(),
    message: z.string().optional().nullable(),
    ip: z.string().optional().nullable(),
    userAgent: z.string().optional().nullable(),
    createdAt: z.date()
}).strict();

export type JobReportInputType = z.infer<typeof JobReportInputSchema>;
