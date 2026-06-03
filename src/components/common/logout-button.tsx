'use client';

import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export function LogoutButton(): React.JSX.Element {
  const router = useRouter();
  const queryClient = useQueryClient();

  const logout = async (): Promise<void> => {
    const supabase = createClient();

    await supabase.auth.signOut();

    router.push('/auth/login');

    queryClient.clear();
  };

  return (
    <Button className='custom-button with-accent' onClick={logout}>
      Keluar
    </Button>
  );
}
