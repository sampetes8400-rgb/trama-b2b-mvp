import { z } from 'zod';

/**
 * Valida alta de usuario. El rol se restringe a buyer o supplier desde frontend.
 */
export const registerSchema = z.object({
  name: z.string().min(2, 'Tu nombre es obligatorio.'),
  email: z.string().email('Ingresa un correo válido.'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres.'),
  role: z.enum(['BUYER', 'SUPPLIER'])
});

/**
 * Valida acceso por credenciales.
 */
export const loginSchema = z.object({
  email: z.string().email('Ingresa un correo válido.'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres.')
});
