import type { ReactNode } from 'react';

export default async function Layout({
  children
}: {
  children: ReactNode;
}): Promise<React.JSX.Element> {
  return (
    <main className='layout w-full grid min-h-screen place-items-center'>
      {children}
    </main>
  );
}
