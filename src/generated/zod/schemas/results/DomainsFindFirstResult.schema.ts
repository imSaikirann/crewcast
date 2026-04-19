import * as z from 'zod';
export const DomainsFindFirstResultSchema = z.nullable(z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  jobCount: z.number().int(),
  haveDefaultForm: z.boolean(),
  isActive: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  recruiterForms: z.array(z.unknown()),
  defaultFormSchemas: z.array(z.unknown())
}));