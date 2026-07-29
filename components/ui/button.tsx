/**
 * Botón base reutilizable. Mantiene consistencia visual en toda la app.
 */
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: Variant;
  fullWidth?: boolean;
};

/**
 * Renderiza un botón con variantes predefinidas para evitar estilos duplicados.
 */
export function Button({ children, className, variant = 'primary', fullWidth, ...props }: Props) {
  const variants: Record<Variant, string> = {
    primary: 'bg-trama-accent text-white hover:opacity-90',
    secondary: 'bg-trama-accentSoft text-trama-accent hover:bg-trama-accentSoft/80',
    ghost: 'bg-transparent text-trama-text hover:bg-white',
    danger: 'bg-trama-danger text-white hover:opacity-90'
  };

  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-medium transition duration-200 disabled:cursor-not-allowed disabled:opacity-50',
        variants[variant],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
