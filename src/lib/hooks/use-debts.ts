import { fetcher } from '@/lib/fetcher';
import {
  ApplicationError,
  type AppMutationResult,
  type AppQueryResult
} from '@/lib/types/api';
import type { Debt } from '@/lib/types/debt';
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query';
import type { CreateDebtSchema, UpdateDebtSchema } from '../validation/debt';

export const debtKeys = {
  all: ['debts'] as const,
  detail: (id: string) => ['debts', id] as const
};

export type DebtFilters = {
  status?: string | null;
  type?: string | null;
  search?: string | null;
  sortField?: string | null;
  sortOrder?: string | null;
};

export function useDebts(
  filters?: DebtFilters,
  initialData?: Debt[]
): AppQueryResult<Debt[]> {
  const queryParams = new URLSearchParams();

  if (filters?.status && filters.status !== 'all') {
    queryParams.set('status', filters.status);
  }

  if (filters?.type && filters.type !== 'all') {
    queryParams.set('type', filters.type);
  }

  if (filters?.search) queryParams.set('search', filters.search);
  if (filters?.sortField) queryParams.set('sortField', filters.sortField);
  if (filters?.sortOrder) queryParams.set('sortOrder', filters.sortOrder);

  const queryString = queryParams.toString()
    ? `?${queryParams.toString()}`
    : '';

  return useQuery({
    queryKey: debtKeys.detail(queryString),
    initialData: initialData,
    placeholderData: keepPreviousData,
    queryFn: ({ signal }) =>
      fetcher<Debt[]>(`/api/debts${queryString}`, { signal })
  });
}

export function useDebt(id: string, initialData?: Debt): AppQueryResult<Debt> {
  return useQuery({
    queryKey: debtKeys.detail(id),
    initialData: initialData,
    retry: (failureCount, error) => {
      if (error instanceof ApplicationError) {
        // If doesn't exist, don't retry
        if (error.statusCode === 404) {
          return false;
        }
      }

      return failureCount < 3;
    },
    queryFn: ({ signal }) => fetcher<Debt>(`/api/debts/${id}`, { signal })
  });
}

export function useCreateDebt(): AppMutationResult<Debt, CreateDebtSchema> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) =>
      fetcher<Debt>('/api/debts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: debtKeys.all });
    }
  });
}

export function useUpdateDebt(
  id: string
): AppMutationResult<Debt, UpdateDebtSchema> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) =>
      fetcher<Debt>(`/api/debts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }),
    onSuccess: (data) => {
      queryClient.setQueryData(debtKeys.detail(id), data);

      queryClient.setQueriesData<Debt[]>({ queryKey: debtKeys.all }, (old) => {
        if (!Array.isArray(old)) return old;
        return old.map((debt) => (debt.id === id ? data : debt));
      });

      queryClient.invalidateQueries({ queryKey: debtKeys.all });
    }
  });
}

export function useDeleteDebt(): AppMutationResult<
  { message: string },
  string
> {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      fetcher<{ message: string }>(`/api/debts/${id}`, {
        method: 'DELETE'
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: debtKeys.all });
    }
  });
}
