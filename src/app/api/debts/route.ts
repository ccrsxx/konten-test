import { withAuth as withAuthHandler, withErrorHandler } from '@/lib/api';
import { createClient } from '@/lib/supabase/server';
import { ApplicationError } from '@/lib/types/api';
import { createDebtSchema, debtQuerySchema } from '@/lib/validation/debt';
import { formatZodError } from '@/lib/validation/parser';
import { NextResponse } from 'next/server';

export const GET = withErrorHandler(
  withAuthHandler(async (req, user) => {
    const { searchParams } = new URL(req.url);

    const parsedSchema = debtQuerySchema.safeParse(
      Object.fromEntries(searchParams)
    );

    if (!parsedSchema.success) {
      throw new ApplicationError('Parameter query tidak valid', 400);
    }

    const { status, type, search, sortField, sortOrder } = parsedSchema.data;

    const supabase = await createClient();

    let query = supabase.from('debts').select('*').eq('user_id', user.id);

    if (type) {
      query = query.eq('type', type);
    }

    if (status === 'settled') {
      query = query.not('settled_at', 'is', null);
    } else if (status === 'unsettled') {
      query = query.is('settled_at', null);
    }

    if (search) {
      query = query.ilike('counterpart_name', `%${search}%`);
    }

    query = query.order(sortField, { ascending: sortOrder === 'asc' });

    const { data, error } = await query;

    if (error) {
      console.error('get debts error', error);
      throw new ApplicationError('Gagal mengambil data hutang', 500);
    }

    return NextResponse.json({ data });
  })
);

export const POST = withErrorHandler(
  withAuthHandler(async (req, user) => {
    const body = await req.json();

    const parsedSchema = createDebtSchema.safeParse(body);

    if (!parsedSchema.success) {
      const { message, details } = formatZodError(parsedSchema.error);

      throw new ApplicationError(message, 400, details);
    }

    const supabase = await createClient();

    const { data, error } = await supabase
      .from('debts')
      .insert({
        ...parsedSchema.data,
        user_id: user.id,
        amount: parsedSchema.data.amount
      })
      .select()
      .limit(1)
      .single();

    if (error) {
      console.error('create debt error', error);
      throw new ApplicationError('Gagal menyimpan data hutang', 500);
    }

    return NextResponse.json({ data }, { status: 201 });
  })
);
