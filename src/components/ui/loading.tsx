import { cn } from '@/lib/utils';
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
    <i className={cn('grid justify-center', className)}>
      <Loader2 className={cn('animate-spin text-accent-main', iconClassName)} />
    </i>
  );
}
