import { z } from 'zod';
import { currencyFieldSchema } from './common';

export const createDebtSchema = z.object({
  type: z.enum(['owed_to_me', 'i_owe'], {
    message: 'Pilih tipe hutang'
  }),
  counterpart_name: z
    .string()
    .trim()
    .min(1, { message: 'Nama orang wajib diisi' })
    .max(100, { message: 'Nama maksimal 100 karakter' }),
  amount: currencyFieldSchema,
  due_date: z.union([
    z.null(),
    z.literal('').transform(() => null),
    z.string().optional()
  ]),
  note: z.union([
    z.null(),
    z.literal('').transform(() => null),
    z.string().max(200, { message: 'Catatan maksimal 200 karakter' }).optional()
  ])
});

export type CreateDebtSchema = z.infer<typeof createDebtSchema>;

export const updateDebtSchema = createDebtSchema.partial().extend({
  settled_at: z.string().nullable().optional()
});

export type UpdateDebtSchema = z.infer<typeof updateDebtSchema>;

export const debtQuerySchema = z.object({
  status: z.enum(['settled', 'unsettled']).optional(),
  type: z.enum(['owed_to_me', 'i_owe']).optional(),
  search: z.string().optional(),
  sortField: z.enum(['created_at', 'amount']).optional().default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc')
});

export type DebtQuerySchema = z.infer<typeof debtQuerySchema>;
