import { Header } from '@/components/common/header';
import type { ReactNode } from 'react';

export default async function Layout({
  children
}: {
  children: ReactNode;
}): Promise<React.JSX.Element> {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
