import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle2, Info } from 'lucide-react';

type AlertProps = {
  variant: 'info' | 'error' | 'success';
  message: string | React.JSX.Element;
  className?: string;
};

export function Alert({
  variant,
  message,
  className
}: AlertProps): React.JSX.Element {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className='shrink-0'>
        {variant === 'error' ? (
          <AlertCircle className='text-lg text-alert-error' />
        ) : variant === 'success' ? (
          <CheckCircle2 className='text-lg text-alert-success' />
        ) : (
          <Info className='text-lg text-alert-info' />
        )}
      </div>
      <p className='text-sm text-primary/80'>{message}</p>
    </div>
  );
}
