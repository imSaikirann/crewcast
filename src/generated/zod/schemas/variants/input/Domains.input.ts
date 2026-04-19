import * as z from 'zod';
// prettier-ignore
export const DomainsInputSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    jobCount: z.number().int(),
    haveDefaultForm: z.boolean(),
    isActive: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
    recruiterForms: z.array(z.unknown()),
    defaultFormSchemas: z.array(z.unknown())
}).strict();

export type DomainsInputType = z.infer<typeof DomainsInputSchema>;
