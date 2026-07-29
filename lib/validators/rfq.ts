import { z } from 'zod';

/**
 * Valida solicitudes de cotización. Se mantiene simple para favorecer la conversión en el MVP.
 */
export const rfqSchema = z.object({
  title: z.string().min(4, 'El asunto de la solicitud es obligatorio.'),
  requirement: z.string().min(10, 'Describe lo que necesitas con mayor detalle.'),
  quantity: z.coerce.number().int().min(1, 'La cantidad debe ser mayor a cero.'),
  deadline: z.string().optional(),
  notes: z.string().optional(),
  recipientCompanyIds: z.array(z.string()).min(1, 'Selecciona al menos un proveedor.')
});
