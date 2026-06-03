import { withAuth as withAuthHandler, withErrorHandler } from '@/lib/api';
import { createClient } from '@/lib/supabase/server';
import { ApplicationError } from '@/lib/types/api';
import { updateDebtSchema } from '@/lib/validation/debt';
import { formatZodError } from '@/lib/validation/parser';
import { NextResponse } from 'next/server';

export const GET = withErrorHandler(
  withAuthHandler(async (_req, user, context) => {
    const { params } = context as { params: Promise<{ id: string }> };
    const { id } = await params;

    if (!id) {
      throw new ApplicationError('ID tidak ditemukan', 400);
    }

    const supabase = await createClient();

    const { data, error } = await supabase
      .from('debts')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .limit(1)
      .single();

    if (error) {
      console.error('get debt error', error);

      if (error.code === 'PGRST116') {
        throw new ApplicationError('Data tidak ditemukan', 404);
      }

      throw new ApplicationError('Gagal mengambil data hutang', 500);
    }

    return NextResponse.json({ data });
  })
);

export const PATCH = withErrorHandler(
  withAuthHandler(async (req, user, context) => {
    const { params } = context as { params: Promise<{ id: string }> };
    const { id } = await params;

    if (!id) {
      throw new ApplicationError('ID tidak ditemukan', 400);
    }

    const body = await req.json();
    const parsedSchema = updateDebtSchema.safeParse(body);

    if (!parsedSchema.success) {
      const { message, details } = formatZodError(parsedSchema.error);
      throw new ApplicationError(message, 400, details);
    }

    const validData = parsedSchema.data;

    const supabase = await createClient();

    const { data, error } = await supabase
      .from('debts')
      .update({
        ...validData,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) {
      console.error('update debt error:', error);
      throw new ApplicationError('Gagal mengubah data hutang', 500);
    }

    return NextResponse.json({ data });
  })
);

export const DELETE = withErrorHandler(
  withAuthHandler(async (_req, user, context) => {
    const { params } = context as { params: Promise<{ id: string }> };
    const { id } = await params;

    if (!id) {
      throw new ApplicationError('ID tidak ditemukan', 400);
    }

    const supabase = await createClient();
    const { error } = await supabase
      .from('debts')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      console.error('delete debt error:', error);
      throw new ApplicationError('Gagal menghapus data hutang', 500);
    }

    return NextResponse.json({ data: { message: 'Berhasil dihapus' } });
  })
);
