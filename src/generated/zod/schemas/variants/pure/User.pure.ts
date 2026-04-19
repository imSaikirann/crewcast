import * as z from 'zod';
// prettier-ignore
export const UserModelSchema = z.object({
    id: z.string(),
    name: z.string().nullable(),
    email: z.string().nullable(),
    emailVerified: z.date().nullable(),
    image: z.string().nullable(),
    role: z.string(),
    accounts: z.array(z.unknown()),
    sessions: z.array(z.unknown()),
    recruiter: z.unknown().nullable()
}).strict();

export type UserPureType = z.infer<typeof UserModelSchema>;
