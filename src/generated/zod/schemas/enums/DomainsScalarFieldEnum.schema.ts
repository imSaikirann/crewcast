import * as z from 'zod';

export const DomainsScalarFieldEnumSchema = z.enum(['id', 'title', 'description', 'jobCount', 'haveDefaultForm', 'isActive', 'createdAt', 'updatedAt'])

export type DomainsScalarFieldEnum = z.infer<typeof DomainsScalarFieldEnumSchema>;