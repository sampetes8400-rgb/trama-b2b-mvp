'use client';

/**
 * Buscador controlado para páginas de catálogo.
 */
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

/**
 * Actualiza el término de búsqueda del usuario.
 */
export function SearchBar({ value, onChange }: Props) {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-trama-muted" />
      <Input value={value} onChange={(event) => onChange(event.target.value)} className="pl-10" placeholder="Buscar por producto o proveedor" />
    </div>
  );
}
