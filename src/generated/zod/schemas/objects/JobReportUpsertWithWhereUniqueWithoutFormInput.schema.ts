import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { JobReportWhereUniqueInputObjectSchema as JobReportWhereUniqueInputObjectSchema } from './JobReportWhereUniqueInput.schema';
import { JobReportUpdateWithoutFormInputObjectSchema as JobReportUpdateWithoutFormInputObjectSchema } from './JobReportUpdateWithoutFormInput.schema';
import { JobReportUncheckedUpdateWithoutFormInputObjectSchema as JobReportUncheckedUpdateWithoutFormInputObjectSchema } from './JobReportUncheckedUpdateWithoutFormInput.schema';
import { JobReportCreateWithoutFormInputObjectSchema as JobReportCreateWithoutFormInputObjectSchema } from './JobReportCreateWithoutFormInput.schema';
import { JobReportUncheckedCreateWithoutFormInputObjectSchema as JobReportUncheckedCreateWithoutFormInputObjectSchema } from './JobReportUncheckedCreateWithoutFormInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => JobReportWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => JobReportUpdateWithoutFormInputObjectSchema), z.lazy(() => JobReportUncheckedUpdateWithoutFormInputObjectSchema)]),
  create: z.union([z.lazy(() => JobReportCreateWithoutFormInputObjectSchema), z.lazy(() => JobReportUncheckedCreateWithoutFormInputObjectSchema)])
}).strict();
export const JobReportUpsertWithWhereUniqueWithoutFormInputObjectSchema: z.ZodType<Prisma.JobReportUpsertWithWhereUniqueWithoutFormInput> = makeSchema() as unknown as z.ZodType<Prisma.JobReportUpsertWithWhereUniqueWithoutFormInput>;
export const JobReportUpsertWithWhereUniqueWithoutFormInputObjectZodSchema = makeSchema();
