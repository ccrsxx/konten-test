import { DebtList } from '@/components/dashboard/debt-list';
import { createClient } from '@/lib/supabase/server';
import type { Debt } from '@/lib/types/debt';

export default async function DashboardPage(): Promise<React.JSX.Element> {
  let initialDebts: Debt[] | undefined = undefined;

  try {
    const supabase = await createClient();
    const { data: userResponse } = await supabase.auth.getUser();

    if (userResponse.user) {
      const { data, error } = await supabase
        .from('debts')
        .select('*')
        .eq('user_id', userResponse.user.id)
        .order('created_at', { ascending: false });

      if (!error && data) {
        initialDebts = data;
      }
    }
  } catch (err) {
    console.error('debts page ssr error:', err);
  }

  return (
    <main className='layout py-8'>
      <header className='mb-6 flex items-center justify-between'>
        <h1 className='text-3xl font-bold'>Dashboard Kasbon</h1>
      </header>
      <DebtList initialDebts={initialDebts} />
    </main>
  );
}
