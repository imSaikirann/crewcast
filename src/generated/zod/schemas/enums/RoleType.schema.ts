import * as z from 'zod';

export const RoleTypeSchema = z.enum(['FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERNSHIP'])

export type RoleType = z.infer<typeof RoleTypeSchema>;