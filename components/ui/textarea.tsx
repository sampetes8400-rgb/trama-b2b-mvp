/**
 * Textarea base reutilizable para formularios.
 * Usa forwardRef para trabajar bien con react-hook-form.
 */
import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  function Textarea({ className, ...props }, ref) {
    return (
      <textarea
        ref={ref}
        className={cn(
          'w-full rounded-2xl border border-trama-line bg-white px-4 py-3 text-sm text-trama-text outline-none transition focus:border-trama-accent min-h-[120px]',
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';
