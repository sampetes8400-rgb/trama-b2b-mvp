/**
 * Tarjeta breve de proveedor para listados o destacados.
 */
import Link from 'next/link';
import type { Empresa } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

type Props = {
  company: Empresa;
};

/**
 * Presenta reputación, ubicación y CTA principal del proveedor.
 */
export function ProviderCard({ company }: Props) {
  return (
    <Card className="space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-trama-text">{company.name}</h3>
          <p className="text-sm text-trama-muted">
            {company.city}, {company.state}
          </p>
        </div>
        {company.isVerified ? <Badge tone="success">Verificado</Badge> : <Badge tone="warning">Pendiente</Badge>}
      </div>
      <p className="text-sm leading-6 text-trama-muted">{company.description}</p>
      <div className="flex items-center justify-between">
        {company.membershipType === 'PREMIUM' ? <Badge>Premium</Badge> : <Badge>Gratis</Badge>}
        <Link href={`/proveedores/${company.slug}`}>
          <Button>Ver perfil</Button>
        </Link>
      </div>
    </Card>
  );
}
