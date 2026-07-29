'use client';

/**
 * Formulario de solicitud de cotización para compradores.
 */
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { rfqSchema } from '@/lib/validators/rfq';
import type { z } from 'zod';

type FormValues = z.infer<typeof rfqSchema>;

type Props = {
  recipientCompanyIds: string[];
};

/**
 * Envía una RFQ sencilla. En el MVP se prioriza facilidad de uso frente a complejidad operativa.
 */
export function RfqForm({ recipientCompanyIds }: Props) {
  const [message, setMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    resolver: zodResolver(rfqSchema),
    defaultValues: {
      recipientCompanyIds
    }
  });

  const onSubmit = async (values: FormValues) => {
    const response = await fetch('/api/rfqs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    });

    setMessage(response.ok ? 'Solicitud enviada correctamente.' : 'No se pudo enviar la solicitud.');
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <label className="text-sm font-medium">Asunto</label>
        <Input placeholder="Ej. 300 metros de mezclilla azul marino" {...register('title')} />
        {errors.title ? <p className="text-sm text-red-600">{errors.title.message}</p> : null}
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Qué necesitas</label>
        <Textarea placeholder="Especifica tela, materiales, calibre, proceso o servicio" {...register('requirement')} />
        {errors.requirement ? <p className="text-sm text-red-600">{errors.requirement.message}</p> : null}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm font-medium">Cantidad</label>
          <Input type="number" placeholder="300" {...register('quantity')} />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Fecha límite</label>
          <Input type="date" {...register('deadline')} />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Notas</label>
        <Textarea placeholder="Tiempos, empaquetado, color, calidad requerida..." {...register('notes')} />
      </div>
      {message ? <p className="text-sm text-trama-accent">{message}</p> : null}
      <Button type="submit" fullWidth disabled={isSubmitting}>
        {isSubmitting ? 'Enviando...' : 'Enviar RFQ'}
      </Button>
    </form>
  );
}
