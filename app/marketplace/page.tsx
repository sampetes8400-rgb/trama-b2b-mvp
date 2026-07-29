'use client';

/**
 * Vista general del marketplace con filtros y grid de productos.
 */
import Link from 'next/link';
import { categorias, productosDemo } from '@/lib/demo-data';
import { useCategoryFilters } from '@/hooks/use-category-filters';
import { FiltersBar } from '@/components/marketplace/filters-bar';
import { ProductCard } from '@/components/marketplace/product-card';
import { SearchBar } from '@/components/marketplace/search-bar';

/**
 * Permite navegar todas las categorías desde una sola entrada.
 */
export default function MarketplacePage() {
  const { query, setQuery, location, setLocation, maxMoq, setMaxMoq, filteredProducts } = useCategoryFilters(productosDemo);

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-trama-muted">Marketplace</p>
          <h1 className="mt-2 text-4xl font-semibold text-trama-text">Explora oferta textil verificada</h1>
        </div>
        <div className="w-full max-w-xl space-y-3">
          <SearchBar value={query} onChange={setQuery} />
          <FiltersBar location={location} onLocationChange={setLocation} maxMoq={maxMoq} onMaxMoqChange={setMaxMoq} />
        </div>
      </div>

      <section className="mt-8 flex flex-wrap gap-3">
        {categorias.map((category) => (
          <Link key={category.id} href={`/marketplace/${category.slug}`} className="rounded-full border border-trama-line bg-white px-4 py-2 text-sm text-trama-text transition hover:border-trama-accent">
            {category.name}
          </Link>
        ))}
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-3">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </main>
  );
}
