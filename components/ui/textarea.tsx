/**
 * Textarea base para descripciones largas y RFQ.
 */
import type { TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

/**
 * Mantiene el estilo uniforme de los campos multilínea.
 */
export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        'min-h-[120px] w-full rounded-2xl border border-trama-line bg-white px-4 py-3 text-sm text-trama-text outline-none transition focus:border-trama-accent',
        props.className
      )}
      {...props}
    />
  );
}
