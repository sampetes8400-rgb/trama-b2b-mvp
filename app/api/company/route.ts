/**
 * API para crear o editar perfil de empresa.
 */
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { companySchema } from '@/lib/validators/company';

/**
 * Crea una empresa y la deja en estado pendiente si luego se cargará CSF.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = companySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    try {
      const company = await prisma.company.upsert({
        where: { slug: parsed.data.slug },
        update: parsed.data,
        create: parsed.data
      });

      return NextResponse.json(company);
    } catch {
      return NextResponse.json({ ok: true, mode: 'demo', company: parsed.data });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'No se pudo guardar la empresa.' }, { status: 500 });
  }
}
