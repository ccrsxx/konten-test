import { AuthButton } from './auth-button';
import { Logo } from './logo';

export function Header(): React.JSX.Element {
  return (
    <header className='sticky top-0 z-10 border-b border-border backdrop-blur-md'>
      <div className='layout flex w-full items-center gap-4 p-4 md:gap-8'>
        <Logo logoClassName='w-12 h-12' clickable />
        <div className='ml-auto flex items-center gap-4'>
          <AuthButton />
        </div>
      </div>
    </header>
  );
}
