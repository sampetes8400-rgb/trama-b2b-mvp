/**
 * Input base reutilizable para formularios.
 */
import type { InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

/**
 * Mantiene la apariencia uniforme de los campos en toda la app.
 */
export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'w-full rounded-2xl border border-trama-line bg-white px-4 py-3 text-sm text-trama-text outline-none transition focus:border-trama-accent',
        props.className
      )}
      {...props}
    />
  );
}
