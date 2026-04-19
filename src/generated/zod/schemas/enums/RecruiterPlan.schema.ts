import * as z from 'zod';

export const RecruiterPlanSchema = z.enum(['STARTER', 'HIRING', 'SCALE'])

export type RecruiterPlan = z.infer<typeof RecruiterPlanSchema>;