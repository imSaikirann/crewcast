import * as z from 'zod';
import { ApplicationStatusSchema } from '../../enums/ApplicationStatus.schema';
// prettier-ignore
export const ApplicationInputSchema = z.object({
    id: z.string(),
    trackingToken: z.string(),
    jobId: z.string(),
    job: z.unknown(),
    fullName: z.string(),
    email: z.string(),
    responses: z.unknown(),
    status: ApplicationStatusSchema,
    scores: z.array(z.unknown()),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type ApplicationInputType = z.infer<typeof ApplicationInputSchema>;
