'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import type { ReactNode } from 'react';

type CardProps = {
  href?: string;
  children: ReactNode;
  className?: string;
};

export function Card({
  href,
  children,
  className
}: CardProps): React.JSX.Element {
  const baseClasses = cn(
    'rounded-md border border-border bg-background p-6 transition-all duration-300',
    href && 'clickable hover:border-accent-main/50',
    className
  );

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {children}
      </Link>
    );
  }

  return <div className={baseClasses}>{children}</div>;
}
