import { ListIcon, UsersIcon } from 'lucide-react';

type DebtViewToggleProps = {
  viewMode: 'normal' | 'grouped';
  setViewMode: (mode: 'normal' | 'grouped') => void;
};

export function DebtViewToggle({
  viewMode,
  setViewMode
}: DebtViewToggleProps): React.JSX.Element {
  return (
    <div className='flex bg-muted-background p-1 rounded-md border border-border'>
      <button
        onClick={() => setViewMode('normal')}
        className={`p-2 text-xs font-medium rounded-sm transition-colors flex items-center gap-1 ${
          viewMode === 'normal'
            ? 'bg-background shadow-sm text-foreground'
            : 'text-muted-foreground hover:text-foreground'
        }`}
        title='List Normal'
      >
        <ListIcon className='h-3.5 w-3.5' />
        <span className='hidden sm:inline'>List</span>
      </button>
      <button
        onClick={() => setViewMode('grouped')}
        className={`p-2 text-xs font-medium rounded-sm transition-colors flex items-center gap-1 ${
          viewMode === 'grouped'
            ? 'bg-background shadow-sm text-foreground'
            : 'text-muted-foreground hover:text-foreground'
        }`}
        title='Grup'
      >
        <UsersIcon className='h-3.5 w-3.5' />
        <span className='hidden sm:inline'>Grup</span>
      </button>
    </div>
  );
}
