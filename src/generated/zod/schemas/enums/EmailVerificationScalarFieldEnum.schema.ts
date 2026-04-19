import * as z from 'zod';

export const EmailVerificationScalarFieldEnumSchema = z.enum(['id', 'userId', 'email', 'tokenHash', 'expiresAt', 'used', 'createdAt'])

export type EmailVerificationScalarFieldEnum = z.infer<typeof EmailVerificationScalarFieldEnumSchema>;