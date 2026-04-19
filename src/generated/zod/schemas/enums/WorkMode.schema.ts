import * as z from 'zod';

export const WorkModeSchema = z.enum(['REMOTE', 'HYBRID', 'ONSITE'])

export type WorkMode = z.infer<typeof WorkModeSchema>;