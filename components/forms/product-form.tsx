'use client';

/**
 * Formulario de alta/edición de producto para el proveedor.
 */
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { categorias } from '@/lib/demo-data';
import { productSchema } from '@/lib/validators/product';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { z } from 'zod';

type FormValues = z.infer<typeof productSchema>;

/**
 * Crea un producto en la API. Sirve como base para inventario del proveedor.
 */
export function ProductForm() {
  const [message, setMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    resolver: zodResolver(productSchema)
  });

  const onSubmit = async (values: FormValues) => {
    const payload = {
      ...values,
      companyId: 'empresa-1'
    };

    const response = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    setMessage(response.ok ? 'Producto guardado.' : 'No se pudo guardar el producto.');
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <label className="text-sm font-medium">Nombre del producto</label>
        <Input placeholder="Ej. Mezclilla stretch 10oz" {...register('name')} />
        {errors.name ? <p className="text-sm text-red-600">{errors.name.message}</p> : null}
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Slug</label>
        <Input placeholder="mezclilla-stretch-10oz" {...register('slug')} />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Descripción</label>
        <Textarea placeholder="Describe composición, uso ideal y presentación" {...register('description')} />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Input type="number" placeholder="Precio" {...register('price')} />
        <Input type="number" placeholder="MOQ" {...register('moq')} />
        <Input placeholder="Ubicación" {...register('location')} />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Categoría</label>
        <select className="w-full rounded-2xl border border-trama-line bg-white px-4 py-3 text-sm" {...register('categoryId')}>
          <option value="">Selecciona una categoría</option>
          {categorias.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      {message ? <p className="text-sm text-trama-accent">{message}</p> : null}
      <Button type="submit" fullWidth disabled={isSubmitting}>
        {isSubmitting ? 'Guardando...' : 'Guardar producto'}
      </Button>
    </form>
  );
}
