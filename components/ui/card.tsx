/**
 * Card base para envolver bloques de contenido con sombra suave.
 */
import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

/**
 * Provee una superficie visual consistente para listas, paneles y formularios.
 */
export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('rounded-[24px] border border-trama-line bg-white p-6 shadow-soft', className)} {...props} />;
}
