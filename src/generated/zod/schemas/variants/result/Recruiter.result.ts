import * as z from 'zod';
import { RecruiterPlanSchema } from '../../enums/RecruiterPlan.schema';
// prettier-ignore
export const RecruiterResultSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    companyName: z.string(),
    companyEmail: z.string(),
    website: z.string(),
    linkedinLink: z.string(),
    verified: z.boolean(),
    plan: RecruiterPlanSchema,
    formLimit: z.number().int(),
    activeFormCount: z.number().int(),
    totalFormsCount: z.number().int(),
    totalFormsLimit: z.number().int(),
    createdAt: z.date(),
    updatedAt: z.date(),
    recruiterForms: z.array(z.unknown()),
    verification: z.array(z.unknown())
}).strict();

export type RecruiterResultType = z.infer<typeof RecruiterResultSchema>;
