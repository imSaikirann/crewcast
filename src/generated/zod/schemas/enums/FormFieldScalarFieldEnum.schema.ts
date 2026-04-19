import * as z from 'zod';

export const FormFieldScalarFieldEnumSchema = z.enum(['id', 'roleId', 'label', 'name', 'type', 'required', 'options', 'createdAt', 'updatedAt'])

export type FormFieldScalarFieldEnum = z.infer<typeof FormFieldScalarFieldEnumSchema>;