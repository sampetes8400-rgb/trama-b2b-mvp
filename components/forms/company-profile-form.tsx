'use client';

/**
 * Formulario de perfil de empresa y preparación para verificación.
 */
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { companySchema } from '@/lib/validators/company';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { z } from 'zod';

type FormValues = z.infer<typeof companySchema>;

/**
 * Guarda el perfil de empresa. La carga de CSF queda preparada a nivel de datos y UI.
 */
export function CompanyProfileForm() {
  const [message, setMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      membershipType: 'GRATIS',
      companyType: 'NACIONAL'
    }
  });

  const onSubmit = async (values: FormValues) => {
    const response = await fetch('/api/company', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    });

    setMessage(response.ok ? 'Perfil guardado. La verificación quedará pendiente hasta subir y revisar la CSF.' : 'No se pudo guardar el perfil.');
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Empresa</label>
          <Input placeholder="Tejidos del Centro" {...register('name')} />
          {errors.name ? <p className="text-sm text-red-600">{errors.name.message}</p> : null}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Slug</label>
          <Input placeholder="tejidos-del-centro" {...register('slug')} />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Descripción</label>
        <Textarea placeholder="Qué haces y para quién trabajas" {...register('description')} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Input placeholder="Ciudad" {...register('city')} />
        <Input placeholder="Estado" {...register('state')} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <select className="w-full rounded-2xl border border-trama-line bg-white px-4 py-3 text-sm" {...register('companyType')}>
          <option value="NACIONAL">Nacional</option>
          <option value="EXTRANJERO">Extranjero</option>
        </select>
        <select className="w-full rounded-2xl border border-trama-line bg-white px-4 py-3 text-sm" {...register('membershipType')}>
          <option value="GRATIS">Gratis</option>
          <option value="PREMIUM">Premium</option>
        </select>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Constancia de Situación Fiscal</label>
        <Input type="file" accept="application/pdf" />
        <p className="text-xs text-trama-muted">UI preparada. La subida real se conecta a Cloudinary/S3 en la siguiente iteración.</p>
      </div>
      {message ? <p className="text-sm text-trama-accent">{message}</p> : null}
      <Button type="submit" fullWidth disabled={isSubmitting}>
        {isSubmitting ? 'Guardando...' : 'Guardar perfil de empresa'}
      </Button>
    </form>
  );
}
