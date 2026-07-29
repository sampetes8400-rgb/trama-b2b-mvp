import { AdminDashboard } from '@/components/admin/admin-dashboard';

/**
 * Panel del administrador.
 */
export default function AdminPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <p className="text-sm uppercase tracking-[0.2em] text-trama-muted">Administración</p>
      <h1 className="mt-2 text-4xl font-semibold text-trama-text">Control operativo del MVP</h1>
      <div className="mt-8">
        <AdminDashboard />
      </div>
    </main>
  );
}
