import type { UseMutationResult, UseQueryResult } from '@tanstack/react-query';
import { z } from 'zod';

export type SuccessApiResponse<T> = {
  data: T | null;
};

export type ErrorApiResponse = {
  error: {
    id: string;
    message: string;
    details: string[];
  };
};

export type ApiResponse<T = unknown> = SuccessApiResponse<T> | ErrorApiResponse;

export const BackendSuccessSchema = z.object({
  data: z.unknown()
});

export const BackendErrorSchema = z.object({
  error: z.object({
    id: z.string(),
    message: z.string(),
    details: z.array(z.string())
  })
});

export class ApplicationError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
    public details?: string[]
  ) {
    super(message);
    this.name = 'ApplicationError';
  }
}

export type AppQueryResult<TData> = UseQueryResult<TData, ApplicationError>;

export type AppMutationResult<TData, TVariables = void> = UseMutationResult<
  TData,
  ApplicationError,
  TVariables
>;
