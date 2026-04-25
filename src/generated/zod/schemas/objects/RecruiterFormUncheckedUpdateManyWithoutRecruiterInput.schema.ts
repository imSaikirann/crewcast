import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { RoleTypeSchema } from '../enums/RoleType.schema';
import { EnumRoleTypeFieldUpdateOperationsInputObjectSchema as EnumRoleTypeFieldUpdateOperationsInputObjectSchema } from './EnumRoleTypeFieldUpdateOperationsInput.schema';
import { ExperienceSchema } from '../enums/Experience.schema';
import { EnumExperienceFieldUpdateOperationsInputObjectSchema as EnumExperienceFieldUpdateOperationsInputObjectSchema } from './EnumExperienceFieldUpdateOperationsInput.schema';
import { WorkModeSchema } from '../enums/WorkMode.schema';
import { EnumWorkModeFieldUpdateOperationsInputObjectSchema as EnumWorkModeFieldUpdateOperationsInputObjectSchema } from './EnumWorkModeFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { NullableIntFieldUpdateOperationsInputObjectSchema as NullableIntFieldUpdateOperationsInputObjectSchema } from './NullableIntFieldUpdateOperationsInput.schema';
import { RecruiterFormUpdatetechStackInputObjectSchema as RecruiterFormUpdatetechStackInputObjectSchema } from './RecruiterFormUpdatetechStackInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { BoolFieldUpdateOperationsInputObjectSchema as BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { JobStatusSchema } from '../enums/JobStatus.schema';
import { EnumJobStatusFieldUpdateOperationsInputObjectSchema as EnumJobStatusFieldUpdateOperationsInputObjectSchema } from './EnumJobStatusFieldUpdateOperationsInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema as NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  domainId: z.union([z.string().max(24), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  publicId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  title: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  description: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  specialization: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  roleType: z.union([RoleTypeSchema, z.lazy(() => EnumRoleTypeFieldUpdateOperationsInputObjectSchema)]).optional(),
  experience: z.union([ExperienceSchema, z.lazy(() => EnumExperienceFieldUpdateOperationsInputObjectSchema)]).optional(),
  workMode: z.union([WorkModeSchema, z.lazy(() => EnumWorkModeFieldUpdateOperationsInputObjectSchema)]).optional(),
  location: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  salaryMin: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  salaryMax: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  currency: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  techStack: z.union([z.lazy(() => RecruiterFormUpdatetechStackInputObjectSchema), z.string().array()]).optional(),
  openings: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  contractDurationMonths: z.union([z.number().int(), z.lazy(() => NullableIntFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  showCompanyName: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  status: z.union([JobStatusSchema, z.lazy(() => EnumJobStatusFieldUpdateOperationsInputObjectSchema)]).optional(),
  version: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  publishedAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  fields: z.union([jsonSchema, jsonSchema]).optional(),
  expiresAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  reportCount: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  isFlagged: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  viewCount: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional()
}).strict();
export const RecruiterFormUncheckedUpdateManyWithoutRecruiterInputObjectSchema: z.ZodType<Prisma.RecruiterFormUncheckedUpdateManyWithoutRecruiterInput> = makeSchema() as unknown as z.ZodType<Prisma.RecruiterFormUncheckedUpdateManyWithoutRecruiterInput>;
export const RecruiterFormUncheckedUpdateManyWithoutRecruiterInputObjectZodSchema = makeSchema();
