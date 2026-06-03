'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createClient } from '@/lib/supabase/client';
import { emailSchema, passwordSchema } from '@/lib/validation/common';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthError } from '@supabase/supabase-js';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';

const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema
});

type LoginSchema = z.infer<typeof loginSchema>;

export default function Login(): React.JSX.Element {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    formState: { errors },
    register,
    handleSubmit
  } = useForm<LoginSchema>({ resolver: zodResolver(loginSchema) });

  const onSubmit: SubmitHandler<LoginSchema> = async (data): Promise<void> => {
    const supabase = createClient();

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password
      });

      if (error) throw error;

      router.push('/');
    } catch (error) {
      console.error('login error:', error);

      let errorMessage = 'Terjadi kesalahan saat masuk. Silakan coba lagi.';

      if (error instanceof AuthError) {
        switch (error.code) {
          case 'invalid_credentials':
            errorMessage = 'Email atau password salah. Silakan coba lagi.';
            break;
          case 'email_not_confirmed':
            errorMessage = 'Email belum dikonfirmasi. Cek email kamu ya.';
            break;
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      setErrorMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className='mx-auto grid w-full max-w-md gap-6 border border-border p-8 rounded-md'>
      <h1 className='text-2xl font-bold text-accent-main'>Masuk</h1>
      {errorMessage && <p className='text-sm text-red-500'>{errorMessage}</p>}
      <form className='grid gap-6' onSubmit={handleSubmit(onSubmit)}>
        <div className='grid gap-4'>
          <Input
            id='email'
            type='text'
            label='Email'
            error={errors.email}
            tabIndex={1}
            register={register('email')}
            disabled={isLoading}
            placeholder='Email kamu'
          />
          <Input
            id='password'
            type='password'
            label='Password'
            error={errors.password}
            register={register('password')}
            tabIndex={2}
            disabled={isLoading}
            placeholder='Password kamu'
          />
        </div>
        <Button
          className='custom-button with-accent'
          type='submit'
          loading={isLoading}
          tabIndex={4}
        >
          Login
        </Button>
      </form>
      <p className='text-center text-sm text-muted'>
        Belum punya akun?{' '}
        <Link
          href='/auth/sign-up'
          className='custom-underline font-medium text-accent-main'
        >
          Daftar
        </Link>
      </p>
    </section>
  );
}
