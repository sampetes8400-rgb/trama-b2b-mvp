/**
 * Navegación principal. Mantiene visible el buscador y accesos clave.
 */
import Link from 'next/link';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

/**
 * Cabecera simple inspirada en layouts limpios de producto.
 */
export function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-trama-line bg-trama-bg/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-4">
        <Link href="/" className="text-xl font-semibold text-trama-text">
          Trama B2B
        </Link>
        <div className="relative hidden flex-1 md:block">
          <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-trama-muted" />
          <Input placeholder="Buscar telas, maquila, maquinaria, proveedores..." className="pl-10" />
        </div>
        <nav className="hidden items-center gap-6 text-sm text-trama-muted md:flex">
          <Link href="/marketplace">Marketplace</Link>
          <Link href="/mi-negocio">Mi Negocio</Link>
          <Link href="/admin">Admin</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/auth/login">
            <Button variant="ghost">Entrar</Button>
          </Link>
          <Link href="/auth/register">
            <Button>Crear cuenta</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
