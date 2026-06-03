import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Modal } from '@/components/ui/modal';
import { formatRelativeTime, formatRupiah } from '@/lib/format';
import { useDeleteDebt, useUpdateDebt } from '@/lib/hooks/use-debts';
import type { Debt } from '@/lib/types/debt';
import { cn } from '@/lib/utils';
import { Check, Edit2, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

type DebtItemProps = {
  debt: Debt;
};

export function DebtItem({ debt }: DebtItemProps): React.JSX.Element {
  const deleteMutation = useDeleteDebt();
  const updateMutation = useUpdateDebt(debt.id);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const isOwedToMe = debt.type === 'owed_to_me';
  const isSettled = !!debt.settled_at;

  const handleToggleSettled = (): void => {
    updateMutation.mutate({
      settled_at: isSettled ? null : new Date().toISOString()
    });
  };

  const handleDelete = (): void => {
    deleteMutation.mutate(debt.id, {
      onSuccess: () => {
        setIsDeleteModalOpen(false);
      }
    });
  };

  return (
    <Card
      className={cn(
        'flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between',
        isSettled ? 'bg-alert-success/10!' : 'bg-transparent'
      )}
    >
      <div className='grid gap-1'>
        <div className='flex items-center gap-2'>
          <h3 className='font-bold text-lg truncate max-w-48'>
            {debt.counterpart_name}
          </h3>
          <Badge variant={isOwedToMe ? 'accent' : 'warning'}>
            {isOwedToMe ? 'Dihutang' : 'Hutang'}
          </Badge>
          <Badge variant={isSettled ? 'success' : 'default'}>
            {isSettled ? 'Lunas' : 'Belum lunas'}
          </Badge>
        </div>
        <div className='flex items-center gap-2 text-sm text-muted'>
          {debt.settled_at && (
            <>
              <span className='text-alert-success'>
                Lunas {formatRelativeTime(debt.settled_at)}
              </span>
              <span>•</span>
            </>
          )}
          <span>{formatRelativeTime(debt.created_at)}</span>
          {debt.note && (
            <>
              <span>•</span>
              <span className='truncate max-w-48' title={debt.note}>
                {debt.note}
              </span>
            </>
          )}
        </div>
      </div>
      <div className='flex items-center justify-between sm:justify-end gap-6'>
        <p className='text-xl font-bold whitespace-nowrap'>
          {formatRupiah(debt.amount)}
        </p>
        <div className='flex items-center gap-2'>
          <Button
            className={cn(
              'p-2 rounded-full border transition-colors',
              isSettled
                ? 'bg-alert-success/20 text-alert-success border-alert-success/50'
                : 'bg-transparent text-muted hover:text-alert-success hover:border-alert-success/50'
            )}
            title={isSettled ? 'Batalkan lunas' : 'Tandai lunas'}
            loading={updateMutation.isPending}
            onClick={handleToggleSettled}
          >
            <Check className='h-4 w-4' />
          </Button>
          <Link
            href={`/edit/${debt.id}`}
            className='p-2 rounded-full border border-transparent bg-transparent text-muted hover:text-accent-main hover:bg-accent-main/10 transition-colors inline-flex items-center justify-center'
            title='Edit'
          >
            <Edit2 className='h-4 w-4' />
          </Link>
          <Button
            className='p-2 rounded-full border border-transparent bg-transparent text-muted hover:text-alert-error hover:bg-alert-error/10 transition-colors'
            title='Hapus'
            onClick={() => setIsDeleteModalOpen(true)}
            disabled={deleteMutation.isPending}
          >
            <Trash2 className='h-4 w-4' />
          </Button>
        </div>
      </div>
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title='Hapus Catatan'
        message={`Kamu yakin mau hapus catatan "${debt.counterpart_name}"? Tindakan ini gak bisa dibatalkan.`}
        confirmText='Hapus'
        loading={deleteMutation.isPending}
      />
    </Card>
  );
}
