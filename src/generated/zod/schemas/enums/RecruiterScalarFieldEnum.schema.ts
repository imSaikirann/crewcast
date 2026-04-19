import * as z from 'zod';

export const RecruiterScalarFieldEnumSchema = z.enum(['id', 'userId', 'companyName', 'companyEmail', 'website', 'linkedinLink', 'verified', 'plan', 'formLimit', 'activeFormCount', 'totalFormsCount', 'totalFormsLimit', 'createdAt', 'updatedAt'])

export type RecruiterScalarFieldEnum = z.infer<typeof RecruiterScalarFieldEnumSchema>;