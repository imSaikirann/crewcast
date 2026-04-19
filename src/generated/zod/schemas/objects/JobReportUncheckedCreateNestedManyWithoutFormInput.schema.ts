import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { JobReportCreateWithoutFormInputObjectSchema as JobReportCreateWithoutFormInputObjectSchema } from './JobReportCreateWithoutFormInput.schema';
import { JobReportUncheckedCreateWithoutFormInputObjectSchema as JobReportUncheckedCreateWithoutFormInputObjectSchema } from './JobReportUncheckedCreateWithoutFormInput.schema';
import { JobReportCreateOrConnectWithoutFormInputObjectSchema as JobReportCreateOrConnectWithoutFormInputObjectSchema } from './JobReportCreateOrConnectWithoutFormInput.schema';
import { JobReportCreateManyFormInputEnvelopeObjectSchema as JobReportCreateManyFormInputEnvelopeObjectSchema } from './JobReportCreateManyFormInputEnvelope.schema';
import { JobReportWhereUniqueInputObjectSchema as JobReportWhereUniqueInputObjectSchema } from './JobReportWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => JobReportCreateWithoutFormInputObjectSchema), z.lazy(() => JobReportCreateWithoutFormInputObjectSchema).array(), z.lazy(() => JobReportUncheckedCreateWithoutFormInputObjectSchema), z.lazy(() => JobReportUncheckedCreateWithoutFormInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => JobReportCreateOrConnectWithoutFormInputObjectSchema), z.lazy(() => JobReportCreateOrConnectWithoutFormInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => JobReportCreateManyFormInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => JobReportWhereUniqueInputObjectSchema), z.lazy(() => JobReportWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const JobReportUncheckedCreateNestedManyWithoutFormInputObjectSchema: z.ZodType<Prisma.JobReportUncheckedCreateNestedManyWithoutFormInput> = makeSchema() as unknown as z.ZodType<Prisma.JobReportUncheckedCreateNestedManyWithoutFormInput>;
export const JobReportUncheckedCreateNestedManyWithoutFormInputObjectZodSchema = makeSchema();
