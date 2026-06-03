'use client';

import { DebtForm } from '@/components/dashboard/debt-form';
import { Alert } from '@/components/ui/alert';
import { Loading } from '@/components/ui/loading';
import { useDebt } from '@/lib/hooks/use-debts';
import type { Debt } from '@/lib/types/debt';

type EditDebtClientProps = {
  id: string;
  initialDebt?: Debt;
};

export function EditDebtClient({
  id,
  initialDebt
}: EditDebtClientProps): React.JSX.Element {
  const { data: debt, isPending, error } = useDebt(id, initialDebt);

  return (
    <section>
      {isPending && !debt ? (
        <div className='py-12 flex flex-col items-center justify-center text-muted gap-2'>
          <Loading />
          <p>Memuat data...</p>
        </div>
      ) : error ? (
        <Alert variant='error' message={error.message} />
      ) : debt ? (
        <DebtForm debt={debt} />
      ) : (
        <Alert variant='error' message='Data tidak ditemukan' />
      )}
    </section>
  );
}
