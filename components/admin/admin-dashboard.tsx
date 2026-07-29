/**
 * Panel administrativo para métricas y verificación básica.
 */
import { proveedorDemo, productosDemo, cotizacionesDemo } from '@/lib/demo-data';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

/**
 * Entrega la mínima operación administrativa pedida por el MVP.
 */
export function AdminDashboard() {
  const metrics = [
    { label: 'Usuarios activos', value: '48' },
    { label: 'Productos publicados', value: String(productosDemo.length) },
    { label: 'Cotizaciones generadas', value: String(cotizacionesDemo.length) }
  ];

  return (
    <div className="space-y-8">
      <section className="grid gap-4 md:grid-cols-3">
        {metrics.map((metric) => (
          <Card key={metric.label}>
            <p className="text-sm text-trama-muted">{metric.label}</p>
            <h2 className="mt-3 text-4xl font-semibold text-trama-text">{metric.value}</h2>
          </Card>
        ))}
      </section>

      <section>
        <Card className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-trama-muted">Verificación</p>
              <h2 className="mt-2 text-2xl font-semibold text-trama-text">Revisión de empresas y CSF</h2>
            </div>
            <Badge tone={proveedorDemo.isVerified ? 'success' : 'warning'}>
              {proveedorDemo.isVerified ? 'Aprobada' : 'Pendiente'}
            </Badge>
          </div>
          <div className="rounded-2xl border border-trama-line p-4">
            <h3 className="font-semibold text-trama-text">{proveedorDemo.name}</h3>
            <p className="mt-1 text-sm text-trama-muted">{proveedorDemo.city}, {proveedorDemo.state} · {proveedorDemo.companyType}</p>
            <p className="mt-2 text-sm text-trama-muted">La CSF queda enlazada por URL de Cloudinary/S3 y el admin decide aprobar o rechazar.</p>
            <div className="mt-4 flex gap-3">
              <Button>Aprobar</Button>
              <Button variant="secondary">Rechazar</Button>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
