/**
 * Tarjeta reutilizable de producto para resultados del marketplace.
 */
import Image from 'next/image';
import Link from 'next/link';
import type { Producto } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';

type Props = {
  product: Producto;
};

/**
 * Resume la información clave para que el comprador decida rápido si entra al perfil.
 */
export function ProductCard({ product }: Props) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="relative h-56 w-full">
        <Image src={product.coverImageUrl || proveedorFallback} alt={product.name} fill className="object-cover" />
      </div>
      <div className="space-y-4 p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-trama-muted">{product.category.name}</p>
            <h3 className="mt-1 text-lg font-semibold text-trama-text">{product.name}</h3>
            <p className="mt-1 text-sm text-trama-muted">{product.company.name}</p>
          </div>
          {product.company.membershipType === 'PREMIUM' ? <Badge>Premium</Badge> : null}
        </div>
        <p className="text-sm leading-6 text-trama-muted">{product.description}</p>
        <div className="grid grid-cols-2 gap-3 text-sm text-trama-text">
          <div>
            <span className="block text-trama-muted">Precio</span>
            <strong>{formatCurrency(product.price)}</strong>
          </div>
          <div>
            <span className="block text-trama-muted">MOQ</span>
            <strong>{product.moq ?? '—'}</strong>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-trama-muted">{product.location}</span>
          <Link href={`/proveedores/${product.company.slug}`}>
            <Button>Ver proveedor</Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}

const proveedorFallback = 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80';
