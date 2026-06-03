'use client';

import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCreateDebt, useUpdateDebt } from '@/lib/hooks/use-debts';
import type { Debt } from '@/lib/types/debt';
import { createDebtSchema } from '@/lib/validation/debt';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { type DefaultValues, useForm } from 'react-hook-form';
import type { z } from 'zod';

type DebtFormValues = z.infer<typeof createDebtSchema>;

type DebtFormProps = {
  debt?: Debt;
};

function setInitialValues(debt?: Debt): DefaultValues<DebtFormValues> {
  return {
    ...debt,
    type: debt?.type ?? 'owed_to_me',
    due_date: debt?.due_date ?? new Date().toISOString().split('T')[0]
  };
}

export function DebtForm({ debt }: DebtFormProps): React.JSX.Element {
  const isEditing = !!debt;
  const router = useRouter();

  const createMutation = useCreateDebt();
  const updateMutation = useUpdateDebt(debt?.id ?? '');

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<DebtFormValues>({
    resolver: zodResolver(createDebtSchema),
    defaultValues: setInitialValues(debt)
  });

  const onSubmit = (data: DebtFormValues): void => {
    if (isEditing) {
      updateMutation.mutate(data, {
        onSuccess: () => {
          router.push('/');
        }
      });
    } else {
      createMutation.mutate(data, {
        onSuccess: () => {
          router.push('/');
        }
      });
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;
  const error = createMutation.error ?? updateMutation.error;

  return (
    <form
      id='debt-form'
      onSubmit={handleSubmit(onSubmit)}
      className='grid gap-4 bg-muted-background/30 p-6 rounded-md border border-border mt-4'
    >
      {error && <Alert variant='error' message={error.message} />}
      <div className='grid gap-2'>
        <label className='text-sm font-medium'>Tipe</label>
        <div className='flex items-center gap-4'>
          <label className='flex items-center gap-2 cursor-pointer'>
            <input
              type='radio'
              value='owed_to_me'
              {...register('type')}
              className='accent-accent-main'
            />
            <span>Saya dihutang</span>
          </label>
          <label className='flex items-center gap-2 cursor-pointer'>
            <input
              type='radio'
              value='i_owe'
              {...register('type')}
              className='accent-accent-main'
            />
            <span>Saya hutang</span>
          </label>
        </div>
        {errors.type && (
          <span className='text-sm text-alert-error'>
            {errors.type.message}
          </span>
        )}
      </div>
      <Input
        id='counterpart_name'
        type='text'
        label='Nama Orang'
        placeholder='Misal: Budi'
        register={register('counterpart_name')}
        error={errors.counterpart_name}
      />
      <Input
        id='amount'
        type='number'
        label='Jumlah (Rp)'
        placeholder='Misal: 50000'
        register={register('amount', { valueAsNumber: true })}
        error={errors.amount}
      />
      <Input
        id='due_date'
        type='date'
        label='Tanggal'
        register={register('due_date')}
        error={errors.due_date}
      />
      <Input
        id='note'
        type='text'
        label='Catatan (Opsional)'
        placeholder='Misal: Uang makan siang'
        register={register('note')}
        error={errors.note}
      />
      <div className='flex justify-end gap-3 mt-4'>
        <Button
          type='button'
          className='custom-button bg-border text-primary'
          onClick={() => router.back()}
          disabled={isPending}
        >
          Batal
        </Button>
        <Button
          type='submit'
          className='custom-button with-accent'
          loading={isPending}
        >
          {isEditing ? 'Simpan Perubahan' : 'Catat Baru'}
        </Button>
      </div>
    </form>
  );
}
