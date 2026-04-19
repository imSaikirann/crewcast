import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { JobReportWhereUniqueInputObjectSchema as JobReportWhereUniqueInputObjectSchema } from './JobReportWhereUniqueInput.schema';
import { JobReportCreateWithoutFormInputObjectSchema as JobReportCreateWithoutFormInputObjectSchema } from './JobReportCreateWithoutFormInput.schema';
import { JobReportUncheckedCreateWithoutFormInputObjectSchema as JobReportUncheckedCreateWithoutFormInputObjectSchema } from './JobReportUncheckedCreateWithoutFormInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => JobReportWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => JobReportCreateWithoutFormInputObjectSchema), z.lazy(() => JobReportUncheckedCreateWithoutFormInputObjectSchema)])
}).strict();
export const JobReportCreateOrConnectWithoutFormInputObjectSchema: z.ZodType<Prisma.JobReportCreateOrConnectWithoutFormInput> = makeSchema() as unknown as z.ZodType<Prisma.JobReportCreateOrConnectWithoutFormInput>;
export const JobReportCreateOrConnectWithoutFormInputObjectZodSchema = makeSchema();
