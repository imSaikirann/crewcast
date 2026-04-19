import * as z from 'zod';
// prettier-ignore
export const ApplicationScoreInputSchema = z.object({
    id: z.string(),
    applicationId: z.string(),
    application: z.unknown(),
    totalScore: z.number(),
    breakdown: z.unknown(),
    evaluatedAt: z.date()
}).strict();

export type ApplicationScoreInputType = z.infer<typeof ApplicationScoreInputSchema>;
