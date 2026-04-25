import * as z from 'zod';

export const DefaultFormSchemaScalarFieldEnumSchema = z.enum(['id', 'domainId', 'version', 'fields', 'isActive', 'isForSoftwareRoles', 'createdAt', 'updatedAt'])

export type DefaultFormSchemaScalarFieldEnum = z.infer<typeof DefaultFormSchemaScalarFieldEnumSchema>;