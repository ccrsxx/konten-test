import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';
import { appEnv } from '../env';
import type { Database } from './database.types';

export function createClient(): SupabaseClient<Database> {
  return createBrowserClient(
    appEnv.NEXT_PUBLIC_SUPABASE_URL,
    appEnv.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
  );
}
