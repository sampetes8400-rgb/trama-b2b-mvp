import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

/**
 * Placeholder para monetización futura.
 */
export default function PremiumPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <Card className="text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-trama-muted">Monetización preparada</p>
        <h1 className="mt-2 text-4xl font-semibold text-trama-text">Actualiza a Premium</h1>
        <p className="mt-4 text-lg leading-8 text-trama-muted">
          Esta página deja listo el punto de entrada para Stripe o MercadoPago, pero sin activar cobro real en esta fase.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link href="/mi-negocio">
            <Button>Volver a Mi Negocio</Button>
          </Link>
          <Button variant="secondary">Próximamente</Button>
        </div>
      </Card>
    </main>
  );
}
