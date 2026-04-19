import * as z from 'zod';
// prettier-ignore
export const FormViewResultSchema = z.object({
    id: z.string(),
    formId: z.string(),
    form: z.unknown(),
    ip: z.string().nullable(),
    userAgent: z.string().nullable(),
    createdAt: z.date()
}).strict();

export type FormViewResultType = z.infer<typeof FormViewResultSchema>;
