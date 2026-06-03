import { Card } from '@/components/ui/card';
import { formatRupiah } from '@/lib/format';
import type { Debt } from '@/lib/types/debt';
import { ArrowDownRight, ArrowUpRight, Wallet } from 'lucide-react';

type DebtSummaryProps = {
  debts: Debt[];
  isPending?: boolean;
};

export function DebtSummary({
  debts,
  isPending
}: DebtSummaryProps): React.JSX.Element {
  if (isPending) {
    return <DebtSummarySkeleton />;
  }

  let owedToMe = 0;
  let iOwe = 0;

  for (const debt of debts) {
    // Only calculate unsettled debts for the active summary
    if (!debt.settled_at) {
      if (debt.type === 'owed_to_me') {
        owedToMe += debt.amount;
      } else {
        iOwe += debt.amount;
      }
    }
  }

  const net = owedToMe - iOwe;

  return (
    <section className='grid gap-4 md:grid-cols-3'>
      <Card className='flex items-center gap-4'>
        <div className='rounded-full bg-accent-main/20 p-3'>
          <ArrowDownRight className='h-6 w-6 text-accent-main' />
        </div>
        <div>
          <p className='text-sm font-medium text-muted'>
            Total dihutang ke saya
          </p>
          <p className='text-2xl font-bold'>{formatRupiah(owedToMe)}</p>
        </div>
      </Card>
      <Card className='flex items-center gap-4'>
        <div className='rounded-full bg-alert-warning/20 p-3'>
          <ArrowUpRight className='h-6 w-6 text-alert-warning' />
        </div>
        <div>
          <p className='text-sm font-medium text-muted'>Total saya hutang</p>
          <p className='text-2xl font-bold'>{formatRupiah(iOwe)}</p>
        </div>
      </Card>
      <Card className='flex items-center gap-4'>
        <div
          className={`rounded-full p-3 ${
            net >= 0 ? 'bg-alert-success/20' : 'bg-alert-error/20'
          }`}
        >
          <Wallet
            className={`h-6 w-6 ${
              net >= 0 ? 'text-alert-success' : 'text-alert-error'
            }`}
          />
        </div>
        <div>
          <p className='text-sm font-medium text-muted'>Net</p>
          <p
            className={`text-2xl font-bold ${
              net >= 0 ? 'text-alert-success' : 'text-alert-error'
            }`}
          >
            {formatRupiah(net)}
          </p>
        </div>
      </Card>
    </section>
  );
}

function DebtSummarySkeleton(): React.JSX.Element {
  return (
    <section className='grid gap-4 md:grid-cols-3'>
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i} className='flex items-center gap-4 animate-pulse'>
          <div className='rounded-full bg-muted-background p-3 h-12 w-12'></div>
          <div className='grid gap-2 w-full'>
            <div className='h-3 bg-muted-background rounded w-32'></div>
            <div className='h-6 bg-muted-background rounded w-24'></div>
          </div>
        </Card>
      ))}
    </section>
  );
}
