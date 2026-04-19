import * as z from 'zod';
export const ApplicationDeleteManyResultSchema = z.object({
  count: z.number()
});