import * as z from 'zod';
// prettier-ignore
export const FormFieldInputSchema = z.object({
    id: z.string(),
    roleId: z.string(),
    role: z.unknown(),
    label: z.string(),
    name: z.string(),
    type: z.string(),
    required: z.boolean(),
    options: z.array(z.string()),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type FormFieldInputType = z.infer<typeof FormFieldInputSchema>;
