'use client';

import { useEffect, useRef } from 'react';
import { Button } from './button';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (e?: React.BaseSyntheticEvent) => void | Promise<void>;
  onAfterClose?: () => void;
  title: string;
  message: string;
  confirmText?: string;
  loading?: boolean;
  children?: React.ReactNode;
};

export function Modal({
  isOpen,
  onClose,
  onConfirm,
  onAfterClose,
  title,
  message,
  confirmText = 'Konfirmasi',
  loading,
  children
}: ModalProps): React.JSX.Element {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    if (isOpen) {
      dialog.classList.remove('closing');

      if (!dialog.open) {
        dialog.showModal();
      }

      return;
    }

    if (!dialog.open) return;

    dialog.classList.add('closing');

    const handleTransitionEnd = (): void => {
      dialog.classList.remove('closing');
      dialog.close();
      onAfterClose?.();
    };

    dialog.addEventListener('transitionend', handleTransitionEnd, {
      once: true
    });

    return (): void => {
      dialog.removeEventListener('transitionend', handleTransitionEnd);
    };
  }, [isOpen, onAfterClose]);

  const handleBackdropClick = (
    e: React.MouseEvent<HTMLDialogElement>
  ): void => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      onClick={handleBackdropClick}
      className='native-modal m-auto w-[calc(100%-2rem)] max-w-md rounded-md shadow-xl border border-border bg-background p-6 text-foreground'
    >
      <h2 className='text-lg font-bold'>{title}</h2>
      <p className='mt-2 text-sm text-muted'>{message}</p>
      {children}
      <div className='mt-6 flex justify-end gap-3'>
        <Button
          className='custom-button bg-border text-primary'
          onClick={onClose}
          disabled={loading}
        >
          Batal
        </Button>
        <Button
          className='custom-button bg-alert-error text-white'
          onClick={onConfirm}
          loading={loading}
        >
          {confirmText}
        </Button>
      </div>
    </dialog>
  );
}
