import * as z from 'zod';

export const UserScalarFieldEnumSchema = z.enum(['id', 'name', 'email', 'emailVerified', 'image', 'role'])

export type UserScalarFieldEnum = z.infer<typeof UserScalarFieldEnumSchema>;