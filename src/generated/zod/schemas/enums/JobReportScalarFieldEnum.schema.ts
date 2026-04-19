import * as z from 'zod';

export const JobReportScalarFieldEnumSchema = z.enum(['id', 'formId', 'reason', 'message', 'ip', 'userAgent', 'createdAt'])

export type JobReportScalarFieldEnum = z.infer<typeof JobReportScalarFieldEnumSchema>;