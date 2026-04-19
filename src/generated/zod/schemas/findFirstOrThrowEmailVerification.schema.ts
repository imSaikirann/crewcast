import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { EmailVerificationIncludeObjectSchema as EmailVerificationIncludeObjectSchema } from './objects/EmailVerificationInclude.schema';
import { EmailVerificationOrderByWithRelationInputObjectSchema as EmailVerificationOrderByWithRelationInputObjectSchema } from './objects/EmailVerificationOrderByWithRelationInput.schema';
import { EmailVerificationWhereInputObjectSchema as EmailVerificationWhereInputObjectSchema } from './objects/EmailVerificationWhereInput.schema';
import { EmailVerificationWhereUniqueInputObjectSchema as EmailVerificationWhereUniqueInputObjectSchema } from './objects/EmailVerificationWhereUniqueInput.schema';
import { EmailVerificationScalarFieldEnumSchema } from './enums/EmailVerificationScalarFieldEnum.schema';

// Select schema needs to be in file to prevent circular imports
//------------------------------------------------------

export const EmailVerificationFindFirstOrThrowSelectSchema: z.ZodType<Prisma.EmailVerificationSelect> = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    email: z.boolean().optional(),
    tokenHash: z.boolean().optional(),
    expiresAt: z.boolean().optional(),
    used: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    user: z.boolean().optional()
  }).strict() as unknown as z.ZodType<Prisma.EmailVerificationSelect>;

export const EmailVerificationFindFirstOrThrowSelectZodSchema = z.object({
    id: z.boolean().optional(),
    userId: z.boolean().optional(),
    email: z.boolean().optional(),
    tokenHash: z.boolean().optional(),
    expiresAt: z.boolean().optional(),
    used: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    user: z.boolean().optional()
  }).strict();

export const EmailVerificationFindFirstOrThrowSchema: z.ZodType<Prisma.EmailVerificationFindFirstOrThrowArgs> = z.object({ select: EmailVerificationFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => EmailVerificationIncludeObjectSchema.optional()), orderBy: z.union([EmailVerificationOrderByWithRelationInputObjectSchema, EmailVerificationOrderByWithRelationInputObjectSchema.array()]).optional(), where: EmailVerificationWhereInputObjectSchema.optional(), cursor: EmailVerificationWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([EmailVerificationScalarFieldEnumSchema, EmailVerificationScalarFieldEnumSchema.array()]).optional() }).strict() as unknown as z.ZodType<Prisma.EmailVerificationFindFirstOrThrowArgs>;

export const EmailVerificationFindFirstOrThrowZodSchema = z.object({ select: EmailVerificationFindFirstOrThrowSelectSchema.optional(), include: z.lazy(() => EmailVerificationIncludeObjectSchema.optional()), orderBy: z.union([EmailVerificationOrderByWithRelationInputObjectSchema, EmailVerificationOrderByWithRelationInputObjectSchema.array()]).optional(), where: EmailVerificationWhereInputObjectSchema.optional(), cursor: EmailVerificationWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), distinct: z.union([EmailVerificationScalarFieldEnumSchema, EmailVerificationScalarFieldEnumSchema.array()]).optional() }).strict();