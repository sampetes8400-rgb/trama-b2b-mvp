/**
 * Vista por categoría específica.
 */
import { notFound } from 'next/navigation';
import { categorias, productosDemo } from '@/lib/demo-data';
import { ProductCard } from '@/components/marketplace/product-card';

/**
 * Muestra solo productos de una categoría para reducir ruido visual.
 */
export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = categorias.find((item) => item.slug === params.category);

  if (!category) {
    notFound();
  }

  const products = productosDemo.filter((product) => product.category.slug === category.slug);

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <p className="text-sm uppercase tracking-[0.2em] text-trama-muted">Sección</p>
      <h1 className="mt-2 text-4xl font-semibold text-trama-text">{category.name}</h1>
      <p className="mt-3 max-w-2xl text-lg text-trama-muted">{category.description}</p>
      <section className="mt-10 grid gap-6 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </main>
  );
}
