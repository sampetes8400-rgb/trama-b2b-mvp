'use client';

/**
 * Hook simple para centralizar el estado de filtros de catálogo.
 */
import { useMemo, useState } from 'react';
import type { Producto } from '@/types';

/**
 * Filtra productos por búsqueda, ubicación y MOQ máximo visible.
 */
export function useCategoryFilters(products: Producto[]) {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [maxMoq, setMaxMoq] = useState('');

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesQuery =
        !query ||
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.company.name.toLowerCase().includes(query.toLowerCase());

      const matchesLocation = !location || product.location?.toLowerCase().includes(location.toLowerCase());
      const matchesMoq = !maxMoq || (product.moq ?? 0) <= Number(maxMoq);

      return matchesQuery && matchesLocation && matchesMoq;
    });
  }, [location, maxMoq, products, query]);

  return {
    query,
    setQuery,
    location,
    setLocation,
    maxMoq,
    setMaxMoq,
    filteredProducts
  };
}
