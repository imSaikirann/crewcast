import * as z from 'zod';

export const FormViewScalarFieldEnumSchema = z.enum(['id', 'formId', 'ip', 'userAgent', 'createdAt'])

export type FormViewScalarFieldEnum = z.infer<typeof FormViewScalarFieldEnumSchema>;