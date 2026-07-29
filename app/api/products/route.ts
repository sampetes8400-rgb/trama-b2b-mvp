/**
 * API del catálogo. Soporta listar y crear productos.
 */
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { productSchema } from '@/lib/validators/product';

const createProductSchema = productSchema.extend({
  companyId: z.string().min(1, 'La empresa es obligatoria.')
});

/**
 * Devuelve productos ordenando primero premium y después verificados.
 */
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
        company: true
      },
      orderBy: [{ company: { membershipType: 'desc' } }, { company: { isVerified: 'desc' } }, { createdAt: 'desc' }]
    });

    return NextResponse.json(products);
  } catch {
    return NextResponse.json([]);
  }
}

/**
 * Crea un nuevo producto. Si la base aún no está conectada, devuelve un mock para que la demo funcione.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = createProductSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    try {
      const product = await prisma.product.create({
        data: {
          name: parsed.data.name,
          slug: parsed.data.slug,
          description: parsed.data.description,
          price: parsed.data.price,
          moq: parsed.data.moq,
          location: parsed.data.location,
          categoryId: parsed.data.categoryId,
          companyId: parsed.data.companyId
        }
      });

      return NextResponse.json(product, { status: 201 });
    } catch {
      return NextResponse.json({ ok: true, mode: 'demo', product: parsed.data }, { status: 201 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'No se pudo crear el producto.' }, { status: 500 });
  }
}
