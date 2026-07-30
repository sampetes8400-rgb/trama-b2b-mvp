/**
 * Cliente singleton de Prisma con inicialización PEREZOSA.
 *
 * Antes: el Proxy se disparaba durante el build de Vercel y creaba
 * PrismaClient, que fallaba al intentar conectar a Supabase.
 *
 * Ahora: si NEXT_PHASE === 'phase-production-build', devolvemos un
 * objeto vacío para que cualquier acceso sea un no-op seguro y nunca
 * lance contra la BD. Prisma solo se instancia en runtime.
 */
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const isBuild = process.env.NEXT_PHASE === 'phase-production-build';

const emptyClient = new Proxy(
  {},
  {
    get() {
      return () => undefined;
    }
  }
) as unknown as PrismaClient;

function createRealClient(): PrismaClient {
  if (globalForPrisma.prisma) return globalForPrisma.prisma;
  const client = new PrismaClient({ log: ['error', 'warn'] });
  if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = client;
  }
  return client;
}

export const prisma: PrismaClient = isBuild
  ? emptyClient
  : createRealClient();
