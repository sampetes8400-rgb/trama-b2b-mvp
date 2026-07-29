import { CompanyProfileForm } from '@/components/forms/company-profile-form';
import { ProviderDashboard } from '@/components/provider/provider-dashboard';
import { Card } from '@/components/ui/card';

/**
 * Área del proveedor para gestionar su negocio.
 */
export default function ProviderPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <div className="grid gap-6 lg:grid-cols-[0.9fr,1.1fr]">
        <Card>
          <p className="text-sm uppercase tracking-[0.2em] text-trama-muted">Perfil de empresa</p>
          <h1 className="mt-2 text-3xl font-semibold text-trama-text">Configura tu perfil y verificación</h1>
          <div className="mt-6">
            <CompanyProfileForm />
          </div>
        </Card>
        <div>
          <ProviderDashboard />
        </div>
      </div>
    </main>
  );
}
