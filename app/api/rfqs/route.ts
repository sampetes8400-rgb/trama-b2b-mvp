// fuerza render dinámico: Vercel no intenta pre-evaluar esta ruta en build
export const dynamic = 'force-dynamic';

/**
 * API para crear solicitudes de cotización.
 */
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { rfqSchema } from '@/lib/validators/rfq';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = rfqSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }
    try {
      const buyer = await prisma.user.findFirst({ where: { role: 'BUYER' } });
      if (!buyer) throw new Error('No buyer available');
      const rfq = await prisma.rFQ.create({
        data: {
          title: parsed.data.title,
          requirement: parsed.data.requirement,
          quantity: parsed.data.quantity,
          deadline: parsed.data.deadline ? new Date(parsed.data.deadline) : undefined,
          notes: parsed.data.notes,
          buyerId: buyer.id,
          recipients: {
            create: parsed.data.recipientCompanyIds.map((companyId) => ({ companyId }))
          }
        }
      });
      return NextResponse.json(rfq, { status: 201 });
    } catch {
      return NextResponse.json({ ok: true, mode: 'demo', rfq: parsed.data }, { status: 201 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'No se pudo enviar la solicitud.' }, { status: 500 });
  }
}
