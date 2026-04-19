import * as z from 'zod';
export const RecruiterFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  userId: z.string(),
  user: z.unknown(),
  companyName: z.string(),
  companyEmail: z.string(),
  website: z.string(),
  linkedinLink: z.string(),
  verified: z.boolean(),
  plan: z.unknown(),
  formLimit: z.number().int(),
  activeFormCount: z.number().int(),
  totalFormsCount: z.number().int(),
  totalFormsLimit: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  recruiterForms: z.array(z.unknown()),
  verification: z.array(z.unknown())
})),
  pagination: z.object({
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
  hasNext: z.boolean(),
  hasPrev: z.boolean()
})
});