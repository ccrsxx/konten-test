'use client';

import { Alert } from '@/components/ui/alert';
import { Loading } from '@/components/ui/loading';
import { useDebts } from '@/lib/hooks/use-debts';
import type { Debt, DebtSortField, DebtSortOrder } from '@/lib/types/debt';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { DebtChart } from './debt-chart';
import { DebtFilters } from './debt-filters';
import { DebtListGrouped } from './debt-list-grouped';
import { DebtListNormal } from './debt-list-normal';
import { DebtSummary } from './debt-summary';
import { DebtViewToggle } from './debt-view-toggle';

type DebtListProps = {
  initialDebts?: Debt[];
};

export function DebtList({
  initialDebts
}: DebtListProps = {}): React.JSX.Element {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [sortField, setSortField] = useState<DebtSortField>('created_at');
  const [sortOrder, setSortOrder] = useState<DebtSortOrder>('desc');
  const [viewMode, setViewMode] = useState<'normal' | 'grouped'>('normal');

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearchQuery(searchQuery), 300);
    return (): void => clearTimeout(timer);
  }, [searchQuery]);

  const {
    data: debts = [],
    isPending,
    error
  } = useDebts(
    {
      type: typeFilter,
      status: statusFilter,
      search: debouncedSearchQuery,
      sortField: sortField,
      sortOrder: sortOrder
    },
    initialDebts
  );

  const groups = new Map<string, { debts: Debt[]; net: number }>();

  for (const debt of debts) {
    if (!groups.has(debt.counterpart_name)) {
      groups.set(debt.counterpart_name, { debts: [], net: 0 });
    }

    const group = groups.get(debt.counterpart_name)!;

    group.debts.push(debt);

    if (!debt.settled_at) {
      group.net += debt.type === 'owed_to_me' ? debt.amount : -debt.amount;
    }
  }

  const groupedDebts = Array.from(groups.entries()).map(([name, data]) => ({
    name,
    ...data
  }));

  return (
    <section className='grid gap-6'>
      <DebtSummary debts={debts} isPending={isPending} />
      <DebtChart debts={debts} />
      <section className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4'>
        <div className='flex items-center justify-between sm:justify-start gap-4 w-full sm:w-auto'>
          <h2 className='text-xl font-bold'>Daftar Kasbon</h2>
          <DebtViewToggle viewMode={viewMode} setViewMode={setViewMode} />
        </div>
        <Link
          href='/new'
          className='custom-button with-accent flex items-center justify-center gap-2 w-full sm:w-auto'
        >
          <Plus className='h-4 w-4' />
          Catat Baru
        </Link>
      </section>
      <DebtFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        sortField={sortField}
        setSortField={setSortField}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
      <section>
        {isPending ? (
          <div className='py-12 flex flex-col items-center justify-center text-muted gap-2'>
            <Loading />
            <p>Memuat data...</p>
          </div>
        ) : error ? (
          <Alert variant='error' message={error.message} />
        ) : !debts.length ? (
          <div className='py-12 flex flex-col items-center justify-center text-muted gap-2 text-center'>
            <div className='bg-muted-background p-4 rounded-full mb-2'>
              <Plus className='h-8 w-8 opacity-50' />
            </div>
            <p className='font-medium'>Belum ada catatan</p>
            <p className='text-sm max-w-sm'>
              {searchQuery
                ? 'Gak ada nama yang cocok dengan pencarian kamu.'
                : 'Mulai catat utang atau piutang pertama kamu dengan klik tombol "Catat Baru".'}
            </p>
          </div>
        ) : viewMode === 'grouped' ? (
          <DebtListGrouped groupedDebts={groupedDebts} />
        ) : (
          <DebtListNormal debts={debts} />
        )}
      </section>
    </section>
  );
}
