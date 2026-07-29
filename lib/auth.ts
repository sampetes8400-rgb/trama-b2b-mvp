/**
 * Configuración central de NextAuth con credenciales y soporte de roles.
 */
import { PrismaAdapter } from '@auth/prisma-adapter';
import { compare } from 'bcryptjs';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';

/**
 * Define el comportamiento de autenticación y cómo se propagan rol y empresa a la sesión.
 */
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/auth/login'
  },
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

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: { company: true }
        });

        if (!user?.password) {
          throw new Error('Usuario no encontrado.');
        }

        const isValid = await compare(credentials.password, user.password);

        if (!isValid) {
          throw new Error('Contraseña incorrecta.');
        }

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
