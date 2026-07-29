'use client';

/**
 * Barra de filtros para simplificar el refinamiento de resultados.
 */
import { Input } from '@/components/ui/input';

type Props = {
  location: string;
  onLocationChange: (value: string) => void;
  maxMoq: string;
  onMaxMoqChange: (value: string) => void;
};

/**
 * Permite filtrar por ubicación y MOQ sin sobrecargar la interfaz.
 */
export function FiltersBar({ location, onLocationChange, maxMoq, onMaxMoqChange }: Props) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <Input value={location} onChange={(event) => onLocationChange(event.target.value)} placeholder="Filtrar por ubicación" />
      <Input value={maxMoq} onChange={(event) => onMaxMoqChange(event.target.value)} placeholder="MOQ máximo" type="number" />
    </div>
  );
}
