import { DebtForm } from '@/components/dashboard/debt-form';

export default function NewDebtPage(): React.JSX.Element {
  return (
    <section className='grid gap-4'>
      <header>
        <h1 className='text-3xl font-bold'>Catat Kasbon Baru</h1>
        <p className='text-muted mt-2'>
          Isi detail utang piutang di bawah ini.
        </p>
      </header>
      <section className='max-w-2xl'>
        <DebtForm />
      </section>
    </section>
  );
}
