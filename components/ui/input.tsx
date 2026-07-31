/**
 * Input base reutilizable para formularios.
 *
 * Usa forwardRef para que react-hook-form pueda pasarle su ref al
 * input real y así leer el valor que el usuario escribe. Sin esto,
 * los formularios reportan "Required" aunque estén llenos.
 */
import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, ...props }, ref) {
    return (
      <input
        ref={ref}
        className={cn(
          'w-full rounded-2xl border border-trama-line bg-white px-4 py-3 text-sm text-trama-text outline-none transition focus:border-trama-accent',
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
