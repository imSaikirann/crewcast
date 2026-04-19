import * as z from 'zod';
// prettier-ignore
export const JobReportModelSchema = z.object({
    id: z.string(),
    formId: z.string(),
    form: z.unknown(),
    reason: z.string(),
    message: z.string().nullable(),
    ip: z.string().nullable(),
    userAgent: z.string().nullable(),
    createdAt: z.date()
}).strict();

export type JobReportPureType = z.infer<typeof JobReportModelSchema>;
