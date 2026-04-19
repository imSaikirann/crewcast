import * as z from 'zod';
// prettier-ignore
export const EmailVerificationResultSchema = z.object({
    id: z.string(),
    userId: z.string(),
    email: z.string(),
    tokenHash: z.string(),
    expiresAt: z.date(),
    used: z.boolean(),
    createdAt: z.date(),
    user: z.unknown()
}).strict();

export type EmailVerificationResultType = z.infer<typeof EmailVerificationResultSchema>;
