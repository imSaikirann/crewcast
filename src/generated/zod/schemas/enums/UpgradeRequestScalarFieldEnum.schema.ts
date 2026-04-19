import * as z from 'zod';

export const UpgradeRequestScalarFieldEnumSchema = z.enum(['id', 'userId', 'email', 'company', 'plan', 'status', 'createdAt'])

export type UpgradeRequestScalarFieldEnum = z.infer<typeof UpgradeRequestScalarFieldEnumSchema>;