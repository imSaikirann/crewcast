import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { JobReportWhereUniqueInputObjectSchema as JobReportWhereUniqueInputObjectSchema } from './JobReportWhereUniqueInput.schema';
import { JobReportUpdateWithoutFormInputObjectSchema as JobReportUpdateWithoutFormInputObjectSchema } from './JobReportUpdateWithoutFormInput.schema';
import { JobReportUncheckedUpdateWithoutFormInputObjectSchema as JobReportUncheckedUpdateWithoutFormInputObjectSchema } from './JobReportUncheckedUpdateWithoutFormInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => JobReportWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => JobReportUpdateWithoutFormInputObjectSchema), z.lazy(() => JobReportUncheckedUpdateWithoutFormInputObjectSchema)])
}).strict();
export const JobReportUpdateWithWhereUniqueWithoutFormInputObjectSchema: z.ZodType<Prisma.JobReportUpdateWithWhereUniqueWithoutFormInput> = makeSchema() as unknown as z.ZodType<Prisma.JobReportUpdateWithWhereUniqueWithoutFormInput>;
export const JobReportUpdateWithWhereUniqueWithoutFormInputObjectZodSchema = makeSchema();
