import * as z from 'zod';

export const ApplicationScoreScalarFieldEnumSchema = z.enum(['id', 'applicationId', 'totalScore', 'breakdown', 'evaluatedAt'])

export type ApplicationScoreScalarFieldEnum = z.infer<typeof ApplicationScoreScalarFieldEnumSchema>;