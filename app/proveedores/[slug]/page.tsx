/**
 * Perfil público del proveedor con catálogo y formulario RFQ.
 */
import { notFound } from 'next/navigation';
import { proveedorDemo, productosDemo } from '@/lib/demo-data';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ProductCard } from '@/components/marketplace/product-card';
import { RfqForm } from '@/components/forms/rfq-form';

/**
 * Centraliza el catálogo y la conversión hacia cotización.
 */
export default function ProviderProfilePage({ params }: { params: { slug: string } }) {
  if (params.slug !== proveedorDemo.slug) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <section className="grid gap-6 lg:grid-cols-[1fr,0.9fr]">
        <Card className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-trama-muted">Proveedor</p>
              <h1 className="mt-2 text-4xl font-semibold text-trama-text">{proveedorDemo.name}</h1>
              <p className="mt-3 max-w-2xl text-lg text-trama-muted">{proveedorDemo.description}</p>
            </div>
            {proveedorDemo.isVerified ? <Badge tone="success">Verificado</Badge> : <Badge tone="warning">Pendiente</Badge>}
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <p className="text-sm text-trama-muted">Ubicación</p>
              <p className="font-medium text-trama-text">{proveedorDemo.city}, {proveedorDemo.state}</p>
            </div>
            <div>
              <p className="text-sm text-trama-muted">Tipo</p>
              <p className="font-medium text-trama-text">{proveedorDemo.companyType}</p>
            </div>
            <div>
              <p className="text-sm text-trama-muted">Membresía</p>
              <p className="font-medium text-trama-text">{proveedorDemo.membershipType}</p>
            </div>
          </div>
        </Card>
        <Card>
          <p className="text-sm uppercase tracking-[0.2em] text-trama-muted">Solicitar cotización</p>
          <h2 className="mt-2 text-2xl font-semibold text-trama-text">Cuéntale qué necesitas</h2>
          <div className="mt-6">
            <RfqForm recipientCompanyIds={[proveedorDemo.id]} />
          </div>
        </Card>
      </section>

      <section className="mt-12">
        <p className="text-sm uppercase tracking-[0.2em] text-trama-muted">Catálogo</p>
        <h2 className="mt-2 text-3xl font-semibold text-trama-text">Productos publicados</h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {productosDemo.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
