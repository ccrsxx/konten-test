import { cn } from '@/lib/utils';
import Link from 'next/link';
import { DefaultLogo } from './default-logo';

type LogoProps = {
  href?: string;
  className?: string;
  clickable?: boolean;
  placeholder?: boolean;
  logoClassName?: string;
  hideIconOnMobile?: boolean;
};

export function Logo({
  href,
  clickable,
  className,
  placeholder,
  logoClassName,
  hideIconOnMobile
}: LogoProps): React.JSX.Element {
  logoClassName ??= placeholder ? 'h-12 w-12' : 'h-8 w-8';

  return (
    <Link
      href={href ?? '/'}
      className={cn(
        'flex shrink-0 items-center gap-4 text-4xl text-accent-main',
        clickable ? 'pointer-events-auto' : 'pointer-events-none',
        className
      )}
      tabIndex={-1}
    >
      <DefaultLogo
        className={cn(logoClassName, hideIconOnMobile && 'hidden md:inline')}
      />
    </Link>
  );
}
