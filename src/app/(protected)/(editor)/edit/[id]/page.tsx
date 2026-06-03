import { createClient } from '@/lib/supabase/server';
import type { Debt } from '@/lib/types/debt';
import { EditDebtClient } from './edit-debt-client';

export default async function EditDebtPage(props: {
  params: Promise<{ id: string }>;
}): Promise<React.JSX.Element> {
  const params = await props.params;
  const id = params.id;

  let initialDebt: Debt | undefined = undefined;

  try {
    const supabase = await createClient();

    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (user) {
      const { data, error } = await supabase
        .from('debts')
        .select('*')
        .eq('id', id)
        .eq('user_id', user.id)
        .limit(1)
        .single();

      if (!error && data) {
        initialDebt = data;
      }
    }
  } catch (err) {
    console.error('edit debts page ssr error:', err);
  }

  return (
    <section className='grid gap-6'>
      <header>
        <h1 className='text-3xl font-bold'>Edit Data Kasbon</h1>
        <p className='text-muted mt-2'>
          Ubah detail utang piutang di bawah ini.
        </p>
      </header>
      <EditDebtClient id={id} initialDebt={initialDebt} />
    </section>
  );
}
