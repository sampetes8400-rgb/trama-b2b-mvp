import { z } from 'zod';

/**
 * Valida el perfil de empresa. Incluye campos para dejar preparada la monetización futura.
 */
export const companySchema = z.object({
  name: z.string().min(2, 'El nombre de la empresa es obligatorio.'),
  slug: z.string().min(2, 'El slug es obligatorio.'),
  description: z.string().min(10, 'Describe brevemente tu empresa.'),
  city: z.string().min(2, 'La ciudad es obligatoria.'),
  state: z.string().min(2, 'El estado es obligatorio.'),
  companyType: z.enum(['NACIONAL', 'EXTRANJERO']),
  membershipType: z.enum(['GRATIS', 'PREMIUM'])
});
