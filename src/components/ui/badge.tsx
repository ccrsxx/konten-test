import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

type BadgeProps = {
  children: ReactNode;
  variant?: 'default' | 'accent' | 'success' | 'warning';
  className?: string;
};

const variantClasses: Record<NonNullable<BadgeProps['variant']>, string> = {
  default: 'bg-muted-background text-muted',
  accent: 'bg-accent-main/20 text-accent-main',
  success: 'bg-alert-success/20 text-alert-success',
  warning: 'bg-alert-warning/20 text-alert-warning'
};

export function Badge({
  children,
  variant = 'default',
  className
}: BadgeProps): React.JSX.Element {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
