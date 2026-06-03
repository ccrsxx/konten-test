import { clsx } from 'clsx';
import { Loader2 } from 'lucide-react';

type LoadingProps = {
  className?: string;
  iconClassName?: string;
};

export function Loading({
  className = 'p-4',
  iconClassName = 'h-7 w-7'
}: LoadingProps): React.JSX.Element {
  return (
    <i className={clsx('grid justify-center', className)}>
      <Loader2
        className={clsx('animate-spin text-accent-main', iconClassName)}
      />
    </i>
  );
}
