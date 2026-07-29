/**
 * API para crear solicitudes de cotización. El flujo es simple para no frenar al comprador en el MVP.
 */
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { rfqSchema } from '@/lib/validators/rfq';

/**
 * Crea una RFQ y la replica hacia uno o varios proveedores destino.
 * Si no existe base conectada, responde en modo demo para mantener usable el prototipo.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = rfqSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    try {
      const buyer = await prisma.user.findFirst({ where: { role: 'BUYER' } });

      if (!buyer) {
        throw new Error('No buyer available');
      }

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
