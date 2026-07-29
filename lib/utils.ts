import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Une clases de Tailwind evitando duplicados conflictivos.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formatea un número como moneda mexicana.
 */
export function formatCurrency(value?: number | null) {
  if (typeof value !== 'number') return 'Precio a cotizar';

  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0
  }).format(value);
}

/**
 * Convierte enums técnicos a etiquetas legibles para la interfaz.
 */
export function formatLabel(value: string) {
  return value.replace(/_/g, ' ').toLowerCase().replace(/(^\w|\s\w)/g, (match) => match.toUpperCase());
}
