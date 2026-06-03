import type { ReactNode } from 'react';

export default function DebtEditorLayout({
  children
}: {
  children: ReactNode;
}): React.JSX.Element {
  return (
    <main className='layout py-8'>
      <section className='mx-auto max-w-2xl'>{children}</section>
    </main>
  );
}
