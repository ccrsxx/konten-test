import { formatRupiah } from '@/lib/format';
import type { Debt } from '@/lib/types/debt';

type DebtChartProps = {
  debts: Debt[];
};

export function DebtChart({ debts }: DebtChartProps): React.JSX.Element | null {
  let owedToMe = 0;
  let iOwe = 0;
  let activeDebts = 0;

  for (const debt of debts) {
    if (!debt.settled_at) {
      if (debt.type === 'owed_to_me') {
        owedToMe += debt.amount;
      } else {
        iOwe += debt.amount;
      }

      activeDebts++;
    }
  }

  const total = owedToMe + iOwe;

  if (total === 0) return null;

  const owedToMePercent = ((owedToMe / total) * 100).toFixed(2);
  const iOwePercent = ((iOwe / total) * 100).toFixed(2);

  return (
    <section className='w-full grid gap-4 p-4 border border-border rounded-md bg-muted-background/30'>
      <div className='flex items-center justify-between'>
        <h3 className='text-sm text-muted mb-2'>
          Rasio Piutang vs Hutang{' '}
          <span className='font-bold text-muted ml-1'>
            ({activeDebts} aktif)
          </span>
        </h3>
        <span className='text-xs text-muted'>
          Total: <span className='font-bold'>{formatRupiah(total)}</span>
        </span>
      </div>
      <div className='grid gap-1'>
        <div className='flex justify-between text-xs mb-1'>
          <span className='text-accent-main font-medium'>Dihutang ke saya</span>
          <div className='text-right'>
            <span className='font-bold'>{formatRupiah(owedToMe)}</span>
            <span className='text-muted ml-1'>({owedToMePercent}%)</span>
          </div>
        </div>
        <div className='w-full h-3 bg-background rounded-full overflow-hidden'>
          <div
            className='h-full bg-accent-main rounded-full transition-all duration-1000 ease-out'
            style={{ width: `${owedToMePercent}%` }}
          />
        </div>
      </div>
      <div className='grid gap-1'>
        <div className='flex justify-between text-xs mb-1'>
          <span className='text-alert-warning font-medium'>Saya hutang</span>
          <div className='text-right'>
            <span className='font-bold'>{formatRupiah(iOwe)}</span>
            <span className='text-muted ml-1'>({iOwePercent}%)</span>
          </div>
        </div>
        <div className='w-full h-3 bg-background rounded-full overflow-hidden'>
          <div
            className='h-full bg-alert-warning rounded-full transition-all duration-1000 ease-out'
            style={{ width: `${iOwePercent}%` }}
          />
        </div>
      </div>
    </section>
  );
}
