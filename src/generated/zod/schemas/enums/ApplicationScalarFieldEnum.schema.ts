import * as z from 'zod';

export const ApplicationScalarFieldEnumSchema = z.enum(['id', 'trackingToken', 'jobId', 'fullName', 'email', 'responses', 'status', 'createdAt', 'updatedAt'])

export type ApplicationScalarFieldEnum = z.infer<typeof ApplicationScalarFieldEnumSchema>;