import type { User } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';
import { NextResponse } from 'next/server';
import { createClient } from './supabase/server';
import { ApplicationError, type ErrorApiResponse } from './types/api';

type BaseHandler<T = unknown> = (
  req: Request,
  context: unknown
) => Promise<NextResponse<T>>;

export function withErrorHandler<T = unknown>(
  handler: BaseHandler<T>
): (
  req: Request,
  context: unknown
) => Promise<NextResponse<T | ErrorApiResponse>> {
  return async (req, context) => {
    try {
      return await handler(req, context);
    } catch (error) {
      console.error('api error: ', error);

      const randomId = randomUUID();

      if (error instanceof ApplicationError) {
        return NextResponse.json(
          {
            error: {
              id: randomId,
              message: error.message,
              details: error.details ?? []
            }
          },
          { status: error.statusCode }
        );
      }

      return NextResponse.json(
        {
          error: {
            id: randomId,
            message: 'Terjadi kesalahan pada server',
            details: []
          }
        },
        { status: 500 }
      );
    }
  };
}

export function withAuth<T = unknown>(
  handler: (
    req: Request,
    user: User,
    context: unknown
  ) => Promise<NextResponse<T>>
): BaseHandler<T> {
  return async (req, context) => {
    const supabase = await createClient();

    const {
      data: { user },
      error
    } = await supabase.auth.getUser();

    if (!user || error) {
      console.error('auth error:', error);
      throw new ApplicationError('Kamu belum login', 401);
    }

    return await handler(req, user, context);
  };
}
