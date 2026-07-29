/**
 * Badge base para estados como Premium o Verificado.
 */
import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type Props = HTMLAttributes<HTMLSpanElement> & {
  tone?: 'default' | 'success' | 'warning';
};

/**
 * Muestra etiquetas compactas con significado visual claro.
 */
export function Badge({ className, tone = 'default', ...props }: Props) {
  const tones = {
    default: 'bg-trama-accentSoft text-trama-accent',
    success: 'bg-emerald-50 text-emerald-700',
    warning: 'bg-amber-50 text-amber-700'
  };

  return <span className={cn('rounded-full px-3 py-1 text-xs font-medium', tones[tone], className)} {...props} />;
}
