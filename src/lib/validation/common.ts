import { z } from 'zod';

export const emailSchema = z
  .string()
  .trim()
  .min(1, { message: 'Email tidak boleh kosong' })
  .email({ message: 'Email tidak valid' });

export const passwordSchema = z
  .string()
  .trim()
  .min(1, { message: 'Password tidak boleh kosong' })
  .min(8, { message: 'Password minimal 8 karakter' });

export const currencyFieldSchema = z
  .number({ message: 'Angka tidak boleh kosong' })
  .positive({ message: 'Angka harus positif' })
  .max(1_000_000_000, {
    message: 'Angka tidak boleh lebih dari 1.000.000.000'
  });
