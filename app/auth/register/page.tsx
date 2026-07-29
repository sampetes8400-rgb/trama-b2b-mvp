import { Card } from '@/components/ui/card';
import { RegisterForm } from '@/components/forms/register-form';

/**
 * Pantalla de registro inicial.
 */
export default function RegisterPage() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-88px)] max-w-7xl items-center justify-center px-6 py-12">
      <Card className="w-full max-w-md">
        <p className="text-sm uppercase tracking-[0.2em] text-trama-muted">Registro</p>
        <h1 className="mt-2 text-3xl font-semibold text-trama-text">Crea tu cuenta</h1>
        <p className="mt-3 text-sm text-trama-muted">Empieza como comprador o proveedor y completa tu empresa en el siguiente paso.</p>
        <div className="mt-6">
          <RegisterForm />
        </div>
      </Card>
    </main>
  );
}
