import * as z from 'zod';

export const VerificationTokenScalarFieldEnumSchema = z.enum(['id', 'identifier', 'token', 'expires'])

export type VerificationTokenScalarFieldEnum = z.infer<typeof VerificationTokenScalarFieldEnumSchema>;