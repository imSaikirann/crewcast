import * as z from 'zod';
export const FormFieldAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    roleId: z.number(),
    role: z.number(),
    label: z.number(),
    name: z.number(),
    type: z.number(),
    required: z.number(),
    options: z.number(),
    createdAt: z.number(),
    updatedAt: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    roleId: z.string().nullable(),
    label: z.string().nullable(),
    name: z.string().nullable(),
    type: z.string().nullable(),
    options: z.array(z.string()).nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    roleId: z.string().nullable(),
    label: z.string().nullable(),
    name: z.string().nullable(),
    type: z.string().nullable(),
    options: z.array(z.string()).nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()});