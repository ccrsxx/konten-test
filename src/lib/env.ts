import { z } from 'zod';

export const validStringSchema = z.string().trim().min(1);

const envSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: validStringSchema,
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: validStringSchema
});

type EnvSchema = z.infer<typeof envSchema>;

function validateEnv(): EnvSchema {
  let { data, error } = envSchema.safeParse({
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  });

  const runningOnCi = process.env.CI === 'true';

  if (runningOnCi) {
    data = process.env as unknown as EnvSchema;
  }

  const shouldThrowError = error && !runningOnCi;

  if (shouldThrowError) {
    throw new Error(`Environment validation error: ${error.message}`);
  }

  return data as EnvSchema;
}

export const appEnv = validateEnv();

export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

export const IS_PRODUCTION = process.env.NODE_ENV === 'production';
