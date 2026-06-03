import type { Debt } from '@/lib/types/debt';
import { DebtItem } from './debt-item';

type DebtListNormalProps = {
  debts: Debt[];
};

export function DebtListNormal({
  debts
}: DebtListNormalProps): React.JSX.Element {
  return (
    <div className='grid gap-3'>
      {debts.map((debt) => (
        <DebtItem key={debt.id} debt={debt} />
      ))}
    </div>
  );
}
