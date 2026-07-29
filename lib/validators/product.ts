import { z } from 'zod';

/**
 * Valida productos del catálogo. El MOQ es importante porque en B2B filtra si un proveedor sirve o no al comprador.
 */
export const productSchema = z.object({
  name: z.string().min(2, 'El nombre del producto es obligatorio.'),
  slug: z.string().min(2, 'El slug es obligatorio.'),
  description: z.string().min(10, 'Describe el producto.'),
  price: z.coerce.number().min(0, 'El precio no puede ser negativo.'),
  moq: z.coerce.number().int().min(1, 'El MOQ mínimo es 1.'),
  location: z.string().min(2, 'La ubicación es obligatoria.'),
  categoryId: z.string().min(1, 'Selecciona una categoría.')
});
