'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createClient } from '@/lib/supabase/client';
import { emailSchema, passwordSchema } from '@/lib/validation/common';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';

const registerSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: passwordSchema
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'Password tidak sama',
    path: ['confirmPassword']
  });

type RegisterSchema = z.infer<typeof registerSchema>;

export default function Register(): React.JSX.Element {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    formState: { errors },
    register,
    handleSubmit
  } = useForm<RegisterSchema>({ resolver: zodResolver(registerSchema) });

  const onSubmit: SubmitHandler<RegisterSchema> = async (
    data
  ): Promise<void> => {
    setErrorMessage(null);
    setIsLoading(true);

    const supabase = createClient();

    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`
        }
      });

      if (error) throw error;

      router.push('/auth/sign-up-success');
    } catch (error) {
      console.error('sign up error:', error);

      let errorMessage = 'Terjadi kesalahan saat mendaftar. Silakan coba lagi.';

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      setErrorMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className='mx-auto grid w-full max-w-md gap-6 border border-border p-8 rounded-md'>
      <h1 className='text-2xl font-bold text-accent-main'>Daftar</h1>
      {errorMessage && <p className='text-sm text-red-500'>{errorMessage}</p>}
      <form className='grid gap-6' onSubmit={handleSubmit(onSubmit)}>
        <div className='grid gap-4'>
          <Input
            id='email'
            type='email'
            label='Email'
            error={errors.email}
            tabIndex={2}
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
            tabIndex={3}
            disabled={isLoading}
            placeholder='Password kamu'
          />
          <Input
            id='confirmPassword'
            type='password'
            label='Konfirmasi Password'
            error={errors.confirmPassword}
            register={register('confirmPassword')}
            tabIndex={3}
            disabled={isLoading}
            placeholder='Ulangi password kamu'
          />
        </div>
        <Button
          className='custom-button with-accent'
          type='submit'
          loading={isLoading}
          tabIndex={4}
        >
          Daftar
        </Button>
      </form>
      <p className='text-center text-sm text-muted'>
        Udah punya akun?{' '}
        <Link
          href='/auth/login'
          className='custom-underline font-medium text-accent-main'
        >
          Masuk
        </Link>
      </p>
    </section>
  );
}
