import * as z from 'zod';
// prettier-ignore
export const UpgradeRequestInputSchema = z.object({
    id: z.string(),
    userId: z.string(),
    email: z.string(),
    company: z.string(),
    plan: z.string(),
    status: z.string(),
    createdAt: z.date()
}).strict();

export type UpgradeRequestInputType = z.infer<typeof UpgradeRequestInputSchema>;
