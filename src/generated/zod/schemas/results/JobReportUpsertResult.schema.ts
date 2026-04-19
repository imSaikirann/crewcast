import * as z from 'zod';
export const JobReportUpsertResultSchema = z.object({
  id: z.string(),
  formId: z.string(),
  form: z.unknown(),
  reason: z.string(),
  message: z.string().optional(),
  ip: z.string().optional(),
  userAgent: z.string().optional(),
  createdAt: z.date()
});