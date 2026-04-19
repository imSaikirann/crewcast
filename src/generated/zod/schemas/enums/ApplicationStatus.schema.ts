import * as z from 'zod';

export const ApplicationStatusSchema = z.enum(['APPLIED', 'SHORTLISTED', 'INTERVIEW', 'REJECTED', 'HIRED'])

export type ApplicationStatus = z.infer<typeof ApplicationStatusSchema>;