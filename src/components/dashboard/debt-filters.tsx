import type { DebtSortField, DebtSortOrder } from '@/lib/types/debt';

type DebtFiltersProps = {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  statusFilter: string;
  setStatusFilter: (val: string) => void;
  typeFilter: string;
  setTypeFilter: (val: string) => void;
  sortField: DebtSortField;
  setSortField: (val: DebtSortField) => void;
  sortOrder: DebtSortOrder;
  setSortOrder: (val: DebtSortOrder) => void;
};

export function DebtFilters({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  typeFilter,
  setTypeFilter,
  sortField,
  setSortField,
  sortOrder,
  setSortOrder
}: DebtFiltersProps): React.JSX.Element {
  return (
    <section className='grid sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-muted-background/30 p-4 rounded-md border border-border'>
      <div className='grid gap-1.5'>
        <label className='text-xs font-medium text-muted'>Cari Nama</label>
        <input
          id='search'
          type='text'
          placeholder='Ketik nama...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='custom-input small bg-background'
        />
      </div>
      <div className='grid gap-1.5'>
        <label className='text-xs font-medium text-muted'>Status</label>
        <select
          className='custom-input small bg-background cursor-pointer'
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value='all'>Semua Status</option>
          <option value='unsettled'>Belum Lunas</option>
          <option value='settled'>Lunas</option>
        </select>
      </div>
      <div className='grid gap-1.5'>
        <label className='text-xs font-medium text-muted'>Tipe</label>
        <select
          className='custom-input small bg-background cursor-pointer'
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value='all'>Semua Tipe</option>
          <option value='owed_to_me'>Dihutang ke saya</option>
          <option value='i_owe'>Saya hutang</option>
        </select>
      </div>
      <div className='grid gap-1.5'>
        <label className='text-xs font-medium text-muted'>Urutkan</label>
        <select
          className='custom-input small bg-background cursor-pointer'
          value={`${sortField}-${sortOrder}`}
          onChange={(e) => {
            const [field, order] = e.target.value.split('-');
            setSortField(field as DebtSortField);
            setSortOrder(order as DebtSortOrder);
          }}
        >
          <option value='created_at-desc'>Terbaru</option>
          <option value='created_at-asc'>Terlama</option>
          <option value='amount-desc'>Jumlah Terbesar</option>
          <option value='amount-asc'>Jumlah Terkecil</option>
        </select>
      </div>
    </section>
  );
}
