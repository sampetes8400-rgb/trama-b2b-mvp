// fuerza render dinámico: Vercel no intenta pre-evaluar esta ruta en build
export const dynamic = 'force-dynamic';

/**
 * Registra un usuario nuevo y deja preparada la empresa asociada.
 */
import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { registerSchema } from '@/lib/validators/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }
    const existingUser = await prisma.user.findUnique({ where: { email: parsed.data.email } });
    if (existingUser) {
      return NextResponse.json({ error: 'Ya existe una cuenta con este correo.' }, { status: 409 });
    }
    const password = await hash(parsed.data.password, 10);
    const user = await prisma.user.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        password,
        role: parsed.data.role
      }
    });
    return NextResponse.json({ ok: true, userId: user.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'No se pudo registrar el usuario.' }, { status: 500 });
  }
}
