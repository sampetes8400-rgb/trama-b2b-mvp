/**
 * Tipos de dominio reutilizables para mantener consistencia entre UI y backend.
 */
export type RolUsuario = 'BUYER' | 'SUPPLIER' | 'ADMIN';
export type TipoEmpresa = 'NACIONAL' | 'EXTRANJERO';
export type TipoMembresia = 'GRATIS' | 'PREMIUM';
export type EstadoVerificacion = 'PENDIENTE' | 'APROBADA' | 'RECHAZADA';
export type EstadoCotizacion = 'NUEVA' | 'RESPONDIDA' | 'CERRADA';

/** Representa al usuario autenticado. */
export interface Usuario {
  id: string;
  name: string;
  email: string;
  role: RolUsuario;
  phone?: string;
  companyId?: string | null;
}

/** Representa a la empresa compradora o proveedora. */
export interface Empresa {
  id: string;
  slug: string;
  name: string;
  description?: string | null;
  city?: string | null;
  state?: string | null;
  country: string;
  companyType: TipoEmpresa;
  membershipType: TipoMembresia;
  verificationStatus: EstadoVerificacion;
  isVerified: boolean;
  website?: string | null;
  logoUrl?: string | null;
  coverUrl?: string | null;
  csfFileUrl?: string | null;
}

/** Categoría principal del marketplace. */
export interface Categoria {
  id: string;
  slug: string;
  name: string;
  description?: string | null;
}

/** Producto publicado por un proveedor. */
export interface Producto {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  price?: number | null;
  moq?: number | null;
  available: boolean;
  stockLabel?: string | null;
  location?: string | null;
  coverImageUrl?: string | null;
  category: Categoria;
  company: Empresa;
}

/** Solicitud de cotización enviada por un comprador. */
export interface Cotizacion {
  id: string;
  title: string;
  requirement: string;
  quantity?: number | null;
  deadline?: string | null;
  notes?: string | null;
  status: EstadoCotizacion;
}

/** Contacto simple tipo mini-CRM para el proveedor. */
export interface Contacto {
  id: string;
  buyerCompany: string;
  buyerContact: string;
  buyerEmail: string;
  notes?: string | null;
  createdAt: string;
}
