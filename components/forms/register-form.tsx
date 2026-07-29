'use client';

/**
 * Formulario de registro inicial para compradores y proveedores.
 */
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { registerSchema } from '@/lib/validators/auth';
import type { z } from 'zod';

type FormValues = z.infer<typeof registerSchema>;

/**
 * Crea una cuenta y redirige al login. El detalle de empresa se completa después.
 */
export function RegisterForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: 'BUYER'
    }
  });

  const onSubmit = async (values: FormValues) => {
    setServerError('');

    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    });

    const data = await response.json();

    if (!response.ok) {
      setServerError(data.error || 'No se pudo crear la cuenta.');
      return;
    }

    router.push('/auth/login');
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <label className="text-sm font-medium text-trama-text">Nombre</label>
        <Input placeholder="Tu nombre" {...register('name')} />
        {errors.name ? <p className="text-sm text-red-600">{errors.name.message}</p> : null}
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-trama-text">Correo</label>
        <Input type="email" placeholder="tu@empresa.com" {...register('email')} />
        {errors.email ? <p className="text-sm text-red-600">{errors.email.message}</p> : null}
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-trama-text">Contraseña</label>
        <Input type="password" placeholder="Crea una contraseña" {...register('password')} />
        {errors.password ? <p className="text-sm text-red-600">{errors.password.message}</p> : null}
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-trama-text">Tipo de cuenta</label>
        <select className="w-full rounded-2xl border border-trama-line bg-white px-4 py-3 text-sm" {...register('role')}>
          <option value="BUYER">Comprador</option>
          <option value="SUPPLIER">Proveedor</option>
        </select>
      </div>
      {serverError ? <p className="text-sm text-red-600">{serverError}</p> : null}
      <Button type="submit" fullWidth disabled={isSubmitting}>
        {isSubmitting ? 'Creando cuenta...' : 'Crear cuenta'}
      </Button>
    </form>
  );
}
