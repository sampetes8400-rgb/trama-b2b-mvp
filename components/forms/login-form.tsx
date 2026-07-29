'use client';

/**
 * Formulario de acceso con react-hook-form + zod.
 */
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { loginSchema } from '@/lib/validators/auth';
import type { z } from 'zod';

type FormValues = z.infer<typeof loginSchema>;

/**
 * Envía credenciales a NextAuth y redirige al marketplace si el acceso fue correcto.
 */
export function LoginForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (values: FormValues) => {
    setServerError('');
    const result = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false
    });

    if (result?.error) {
      setServerError(result.error);
      return;
    }

    router.push('/marketplace');
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <label className="text-sm font-medium text-trama-text">Correo</label>
        <Input type="email" placeholder="tu@empresa.com" {...register('email')} />
        {errors.email ? <p className="text-sm text-red-600">{errors.email.message}</p> : null}
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-trama-text">Contraseña</label>
        <Input type="password" placeholder="••••••••" {...register('password')} />
        {errors.password ? <p className="text-sm text-red-600">{errors.password.message}</p> : null}
      </div>
      {serverError ? <p className="text-sm text-red-600">{serverError}</p> : null}
      <Button type="submit" fullWidth disabled={isSubmitting}>
        {isSubmitting ? 'Entrando...' : 'Entrar a Trama B2B'}
      </Button>
    </form>
  );
}
