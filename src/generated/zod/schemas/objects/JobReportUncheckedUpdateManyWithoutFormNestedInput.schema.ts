import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { JobReportCreateWithoutFormInputObjectSchema as JobReportCreateWithoutFormInputObjectSchema } from './JobReportCreateWithoutFormInput.schema';
import { JobReportUncheckedCreateWithoutFormInputObjectSchema as JobReportUncheckedCreateWithoutFormInputObjectSchema } from './JobReportUncheckedCreateWithoutFormInput.schema';
import { JobReportCreateOrConnectWithoutFormInputObjectSchema as JobReportCreateOrConnectWithoutFormInputObjectSchema } from './JobReportCreateOrConnectWithoutFormInput.schema';
import { JobReportUpsertWithWhereUniqueWithoutFormInputObjectSchema as JobReportUpsertWithWhereUniqueWithoutFormInputObjectSchema } from './JobReportUpsertWithWhereUniqueWithoutFormInput.schema';
import { JobReportCreateManyFormInputEnvelopeObjectSchema as JobReportCreateManyFormInputEnvelopeObjectSchema } from './JobReportCreateManyFormInputEnvelope.schema';
import { JobReportWhereUniqueInputObjectSchema as JobReportWhereUniqueInputObjectSchema } from './JobReportWhereUniqueInput.schema';
import { JobReportUpdateWithWhereUniqueWithoutFormInputObjectSchema as JobReportUpdateWithWhereUniqueWithoutFormInputObjectSchema } from './JobReportUpdateWithWhereUniqueWithoutFormInput.schema';
import { JobReportUpdateManyWithWhereWithoutFormInputObjectSchema as JobReportUpdateManyWithWhereWithoutFormInputObjectSchema } from './JobReportUpdateManyWithWhereWithoutFormInput.schema';
import { JobReportScalarWhereInputObjectSchema as JobReportScalarWhereInputObjectSchema } from './JobReportScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => JobReportCreateWithoutFormInputObjectSchema), z.lazy(() => JobReportCreateWithoutFormInputObjectSchema).array(), z.lazy(() => JobReportUncheckedCreateWithoutFormInputObjectSchema), z.lazy(() => JobReportUncheckedCreateWithoutFormInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => JobReportCreateOrConnectWithoutFormInputObjectSchema), z.lazy(() => JobReportCreateOrConnectWithoutFormInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => JobReportUpsertWithWhereUniqueWithoutFormInputObjectSchema), z.lazy(() => JobReportUpsertWithWhereUniqueWithoutFormInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => JobReportCreateManyFormInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => JobReportWhereUniqueInputObjectSchema), z.lazy(() => JobReportWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => JobReportWhereUniqueInputObjectSchema), z.lazy(() => JobReportWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => JobReportWhereUniqueInputObjectSchema), z.lazy(() => JobReportWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => JobReportWhereUniqueInputObjectSchema), z.lazy(() => JobReportWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => JobReportUpdateWithWhereUniqueWithoutFormInputObjectSchema), z.lazy(() => JobReportUpdateWithWhereUniqueWithoutFormInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => JobReportUpdateManyWithWhereWithoutFormInputObjectSchema), z.lazy(() => JobReportUpdateManyWithWhereWithoutFormInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => JobReportScalarWhereInputObjectSchema), z.lazy(() => JobReportScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const JobReportUncheckedUpdateManyWithoutFormNestedInputObjectSchema: z.ZodType<Prisma.JobReportUncheckedUpdateManyWithoutFormNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.JobReportUncheckedUpdateManyWithoutFormNestedInput>;
export const JobReportUncheckedUpdateManyWithoutFormNestedInputObjectZodSchema = makeSchema();
