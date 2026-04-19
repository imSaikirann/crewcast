import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { JobReportCreateManyFormInputObjectSchema as JobReportCreateManyFormInputObjectSchema } from './JobReportCreateManyFormInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => JobReportCreateManyFormInputObjectSchema), z.lazy(() => JobReportCreateManyFormInputObjectSchema).array()])
}).strict();
export const JobReportCreateManyFormInputEnvelopeObjectSchema: z.ZodType<Prisma.JobReportCreateManyFormInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.JobReportCreateManyFormInputEnvelope>;
export const JobReportCreateManyFormInputEnvelopeObjectZodSchema = makeSchema();
