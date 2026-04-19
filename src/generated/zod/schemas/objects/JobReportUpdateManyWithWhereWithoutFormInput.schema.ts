import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { JobReportScalarWhereInputObjectSchema as JobReportScalarWhereInputObjectSchema } from './JobReportScalarWhereInput.schema';
import { JobReportUpdateManyMutationInputObjectSchema as JobReportUpdateManyMutationInputObjectSchema } from './JobReportUpdateManyMutationInput.schema';
import { JobReportUncheckedUpdateManyWithoutFormInputObjectSchema as JobReportUncheckedUpdateManyWithoutFormInputObjectSchema } from './JobReportUncheckedUpdateManyWithoutFormInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => JobReportScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => JobReportUpdateManyMutationInputObjectSchema), z.lazy(() => JobReportUncheckedUpdateManyWithoutFormInputObjectSchema)])
}).strict();
export const JobReportUpdateManyWithWhereWithoutFormInputObjectSchema: z.ZodType<Prisma.JobReportUpdateManyWithWhereWithoutFormInput> = makeSchema() as unknown as z.ZodType<Prisma.JobReportUpdateManyWithWhereWithoutFormInput>;
export const JobReportUpdateManyWithWhereWithoutFormInputObjectZodSchema = makeSchema();
