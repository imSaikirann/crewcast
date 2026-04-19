import * as z from 'zod';

export const ExperienceSchema = z.enum(['JUNIOR', 'MID', 'SENIOR', 'LEAD'])

export type Experience = z.infer<typeof ExperienceSchema>;