/**
 * Configuración central de NextAuth con credenciales y soporte de roles.
 *
 * En este archivo NO importamos Prisma ni bcryptjs a nivel de módulo.
 * Ambos se cargan de forma dinámica (lazy) dentro de las funciones.
 * Así Prisma NUNCA se ejecuta durante `next build` en Vercel.
 */
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

async function getPrisma() {
  const mod = await import('@/lib/prisma');
  return mod.prisma;
}

async function comparePassword(plain: string, hashed: string) {
  const bcrypt = await import('bcryptjs');
  return bcrypt.compare(plain, hashed);
}

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  pages: { signIn: '/auth/login' },
  providers: [
    CredentialsProvider({
      name: 'Credenciales',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error('Credenciales incompletas.');
        }
        const prisma = await getPrisma();
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: { company: true }
        });
        if (!user?.password) throw new Error('Usuario no encontrado.');
        const ok = await comparePassword(credentials.password, user.password);
        if (!ok) throw new Error('Contraseña incorrecta.');
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          companyId: user.companyId
        } as never;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as { role?: string }).role;
        token.companyId = (user as { companyId?: string }).companyId;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? '';
        session.user.role = (token.role as string) ?? 'BUYER';
        session.user.companyId = (token.companyId as string) ?? null;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET
};
