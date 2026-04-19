import * as z from 'zod';
// prettier-ignore
export const FormViewInputSchema = z.object({
    id: z.string(),
    formId: z.string(),
    form: z.unknown(),
    ip: z.string().optional().nullable(),
    userAgent: z.string().optional().nullable(),
    createdAt: z.date()
}).strict();

export type FormViewInputType = z.infer<typeof FormViewInputSchema>;
