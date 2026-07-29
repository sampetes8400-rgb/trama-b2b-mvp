/**
 * Landing principal del MVP.
 */
import Link from 'next/link';
import { categorias, productosDemo, proveedorDemo } from '@/lib/demo-data';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ProductCard } from '@/components/marketplace/product-card';
import { ProviderCard } from '@/components/marketplace/provider-card';

/**
 * Explica el valor del producto y muestra una muestra de catálogo.
 */
export default function HomePage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <section className="grid items-center gap-8 lg:grid-cols-[1.1fr,0.9fr]">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-trama-accent">Infraestructura digital textil</p>
          <h1 className="mt-4 max-w-3xl text-5xl font-semibold leading-tight text-trama-text md:text-6xl">
            Conecta compradores y proveedores textiles en un solo flujo B2B.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-trama-muted">
            Trama B2B organiza catálogo, perfiles, cotizaciones y verificación empresarial para que la industria deje de operar en chats dispersos.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/marketplace">
              <Button>Explorar marketplace</Button>
            </Link>
            <Link href="/auth/register">
              <Button variant="secondary">Crear cuenta</Button>
            </Link>
          </div>
        </div>
        <Card className="grid gap-4 md:grid-cols-2">
          {categorias.map((category) => (
            <div key={category.id} className="rounded-2xl border border-trama-line p-4">
              <p className="text-sm font-medium text-trama-text">{category.name}</p>
              <p className="mt-2 text-sm leading-6 text-trama-muted">{category.description}</p>
            </div>
          ))}
        </Card>
      </section>

      <section className="mt-16 space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-trama-muted">Destacados</p>
            <h2 className="mt-2 text-3xl font-semibold text-trama-text">Productos publicados</h2>
          </div>
          <Link href="/marketplace">
            <Button variant="ghost">Ver todo</Button>
          </Link>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {productosDemo.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="mt-16 grid gap-6 lg:grid-cols-[0.7fr,1.3fr]">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-trama-muted">Proveedor ejemplo</p>
          <h2 className="mt-2 text-3xl font-semibold text-trama-text">Perfil verificado</h2>
        </div>
        <ProviderCard company={proveedorDemo} />
      </section>
    </main>
  );
}
