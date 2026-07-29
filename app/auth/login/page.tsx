import { Card } from '@/components/ui/card';
import { LoginForm } from '@/components/forms/login-form';

/**
 * Pantalla de acceso.
 */
export default function LoginPage() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-88px)] max-w-7xl items-center justify-center px-6 py-12">
      <Card className="w-full max-w-md">
        <p className="text-sm uppercase tracking-[0.2em] text-trama-muted">Acceso</p>
        <h1 className="mt-2 text-3xl font-semibold text-trama-text">Entrar a Trama B2B</h1>
        <p className="mt-3 text-sm text-trama-muted">Usa las cuentas demo después de sembrar la base de datos.</p>
        <div className="mt-6">
          <LoginForm />
        </div>
      </Card>
    </main>
  );
}
