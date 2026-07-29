/**
 * Panel del proveedor con las 3 áreas pedidas: catálogo, contactos y cotizaciones.
 */
import { contactosDemo, cotizacionesDemo, productosDemo } from '@/lib/demo-data';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ProductForm } from '@/components/forms/product-form';
import { formatCurrency, formatLabel } from '@/lib/utils';

/**
 * Resume la operación mínima del proveedor dentro del MVP.
 */
export function ProviderDashboard() {
  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
        <Card className="space-y-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-trama-muted">Mi Negocio · Catálogo / Inventario</p>
            <h2 className="mt-2 text-2xl font-semibold text-trama-text">Gestiona tu oferta publicada</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {productosDemo.map((product) => (
              <Card key={product.id} className="space-y-2 border-dashed">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-trama-text">{product.name}</h3>
                    <p className="text-sm text-trama-muted">{product.location}</p>
                  </div>
                  <Badge>{product.available ? 'Activo' : 'Pausado'}</Badge>
                </div>
                <p className="text-sm text-trama-muted">{formatCurrency(product.price)} · MOQ {product.moq}</p>
              </Card>
            ))}
          </div>
        </Card>
        <Card>
          <ProductForm />
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card className="space-y-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-trama-muted">Contactos</p>
            <h2 className="mt-2 text-2xl font-semibold text-trama-text">Mini-CRM de compradores interesados</h2>
          </div>
          <div className="space-y-4">
            {contactosDemo.map((contact) => (
              <div key={contact.id} className="rounded-2xl border border-trama-line p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-trama-text">{contact.buyerCompany}</h3>
                    <p className="text-sm text-trama-muted">{contact.buyerContact} · {contact.buyerEmail}</p>
                  </div>
                  <span className="text-xs text-trama-muted">{contact.createdAt}</span>
                </div>
                <p className="mt-2 text-sm text-trama-muted">{contact.notes}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="space-y-4">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-trama-muted">Cotizaciones recibidas</p>
            <h2 className="mt-2 text-2xl font-semibold text-trama-text">Bandeja de RFQs entrantes</h2>
          </div>
          <div className="space-y-4">
            {cotizacionesDemo.map((rfq) => (
              <div key={rfq.id} className="rounded-2xl border border-trama-line p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-semibold text-trama-text">{rfq.title}</h3>
                    <p className="text-sm text-trama-muted">{rfq.requirement}</p>
                  </div>
                  <Badge tone={rfq.status === 'NUEVA' ? 'warning' : 'success'}>{formatLabel(rfq.status)}</Badge>
                </div>
                <p className="mt-2 text-sm text-trama-muted">Cantidad: {rfq.quantity} · Fecha límite: {rfq.deadline}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
