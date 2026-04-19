import * as z from 'zod';

export const RoleScalarFieldEnumSchema = z.enum(['id', 'name', 'isActive', 'createdAt', 'updatedAt'])

export type RoleScalarFieldEnum = z.infer<typeof RoleScalarFieldEnumSchema>;