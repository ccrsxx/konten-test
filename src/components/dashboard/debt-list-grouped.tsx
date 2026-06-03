import { formatRupiah } from '@/lib/format';
import type { Debt } from '@/lib/types/debt';
import { DebtItem } from './debt-item';

export type GroupedDebt = {
  name: string;
  debts: Debt[];
  net: number;
};

type DebtListGroupedProps = {
  groupedDebts: GroupedDebt[];
};

export function DebtListGrouped({
  groupedDebts
}: DebtListGroupedProps): React.JSX.Element {
  return (
    <div className='grid gap-6'>
      {groupedDebts.map((group) => (
        <div key={group.name} className='grid gap-3'>
          <div className='flex items-center justify-between px-1'>
            <h3 className='font-bold text-sm text-foreground flex items-center gap-2'>
              {group.name}
              <span className='text-xs font-normal text-muted bg-muted-background px-2 py-0.5 rounded-full'>
                {group.debts.length} catatan
              </span>
            </h3>
            <span
              className={`text-xs font-bold ${
                group.net > 0
                  ? 'text-accent-main'
                  : group.net < 0
                    ? 'text-alert-warning'
                    : 'text-muted'
              }`}
            >
              {group.net > 0
                ? `Net dihutang: ${formatRupiah(group.net)}`
                : group.net < 0
                  ? `Net hutang: ${formatRupiah(Math.abs(group.net))}`
                  : 'Net: Lunas / Imbang'}
            </span>
          </div>
          <div className='grid gap-3 border-l-2 border-border pl-3'>
            {group.debts.map((debt) => (
              <DebtItem key={debt.id} debt={debt} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
