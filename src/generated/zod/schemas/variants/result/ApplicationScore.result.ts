import * as z from 'zod';
// prettier-ignore
export const ApplicationScoreResultSchema = z.object({
    id: z.string(),
    applicationId: z.string(),
    application: z.unknown(),
    totalScore: z.number(),
    breakdown: z.unknown(),
    evaluatedAt: z.date()
}).strict();

export type ApplicationScoreResultType = z.infer<typeof ApplicationScoreResultSchema>;
