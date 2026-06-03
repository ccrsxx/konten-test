import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { LogoutButton } from './logout-button';

export async function AuthButton(): Promise<React.JSX.Element> {
  const supabase = await createClient();

  const { data } = await supabase.auth.getClaims();

  const user = data?.claims;

  return user ? (
    <div className='flex items-center gap-4'>
      Halo, {user.email}
      <LogoutButton />
    </div>
  ) : (
    <div className='flex gap-4'>
      <Link className='smooth-tab custom-button main-border' href='/auth/login'>
        Masuk
      </Link>
      <Link
        className='smooth-tab custom-button main-border with-accent'
        href='/auth/sign-up'
      >
        Daftar
      </Link>
    </div>
  );
}
