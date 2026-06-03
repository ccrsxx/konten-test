export type DebtType = 'owed_to_me' | 'i_owe';

export type Debt = {
  id: string;
  user_id: string;
  type: DebtType;
  counterpart_name: string;
  amount: number;
  note: string | null;
  due_date: string | null;
  settled_at: string | null;
  created_at: string;
  updated_at: string;
};

export type DebtStatusFilter = 'settled' | 'unsettled';
export type DebtTypeFilter = 'owed_to_me' | 'i_owe';
export type DebtSortField = 'amount' | 'created_at';
export type DebtSortOrder = 'asc' | 'desc';
