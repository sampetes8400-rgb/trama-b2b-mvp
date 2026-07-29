/**
 * Datos demo para que el repositorio muestre una app navegable incluso antes de conectar la base real.
 */
import type { Categoria, Contacto, Cotizacion, Empresa, Producto } from '@/types';

export const categorias: Categoria[] = [
  { id: '1', slug: 'telas', name: 'Telas', description: 'Textiles para moda, uniformes y hogar.' },
  { id: '2', slug: 'maquinaria', name: 'Maquinaria', description: 'Equipamiento textil e industrial.' },
  { id: '3', slug: 'confeccion-maquila', name: 'Confección / Maquila', description: 'Servicios de manufactura.' },
  { id: '4', slug: 'insumos-accesorios', name: 'Insumos y Accesorios', description: 'Cierres, botones, elásticos.' },
  { id: '5', slug: 'servicios', name: 'Servicios', description: 'Patronaje, corte y logística.' }
];

export const proveedorDemo: Empresa = {
  id: 'empresa-1',
  slug: 'tejidos-del-centro',
  name: 'Tejidos del Centro',
  description: 'Proveedor premium con catálogo nacional de telas y servicios de maquila ligera.',
  city: 'Ciudad de México',
  state: 'CDMX',
  country: 'México',
  companyType: 'NACIONAL',
  membershipType: 'PREMIUM',
  verificationStatus: 'APROBADA',
  isVerified: true,
  website: 'https://trama-b2b.demo',
  logoUrl: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=200&q=80',
  coverUrl: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80'
};

export const productosDemo: Producto[] = [
  {
    id: 'prod-1',
    name: 'Mezclilla Premium 12oz',
    slug: 'mezclilla-premium-12oz',
    description: 'Tela resistente para denim, uniformes y producción en volumen.',
    price: 148,
    moq: 50,
    available: true,
    stockLabel: 'Disponible esta semana',
    location: 'CDMX',
    coverImageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80',
    category: categorias[0],
    company: proveedorDemo
  },
  {
    id: 'prod-2',
    name: 'Máquina Overlock Industrial',
    slug: 'maquina-overlock-industrial',
    description: 'Equipo robusto para líneas de producción continua.',
    price: 19500,
    moq: 1,
    available: true,
    stockLabel: 'Entrega en 7 días',
    location: 'León',
    coverImageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',
    category: categorias[1],
    company: proveedorDemo
  },
  {
    id: 'prod-3',
    name: 'Servicio de Maquila de Playera Básica',
    slug: 'maquila-playera-basica',
    description: 'Producción por lote con control de calidad y tiempos de entrega claros.',
    price: 42,
    moq: 300,
    available: true,
    stockLabel: 'Agenda abierta',
    location: 'Puebla',
    coverImageUrl: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1200&q=80',
    category: categorias[2],
    company: proveedorDemo
  }
];

export const contactosDemo: Contacto[] = [
  {
    id: 'contact-1',
    buyerCompany: 'Marca Estudio Sur',
    buyerContact: 'Andrea López',
    buyerEmail: 'andrea@estudiosur.mx',
    notes: 'Buscan proveedor para colección cápsula otoño.',
    createdAt: '2026-07-29'
  },
  {
    id: 'contact-2',
    buyerCompany: 'Boutique Norte',
    buyerContact: 'Daniel Ruiz',
    buyerEmail: 'compras@boutiquenorte.mx',
    notes: 'Solicitó MOQ y tiempos de entrega.',
    createdAt: '2026-07-28'
  }
];

export const cotizacionesDemo: Cotizacion[] = [
  {
    id: 'rfq-1',
    title: '300 metros de mezclilla azul marino',
    requirement: 'Tela para colección otoño con envío a Guadalajara.',
    quantity: 300,
    deadline: '2026-08-15',
    notes: 'Necesitamos ficha técnica y tiempos de entrega.',
    status: 'NUEVA'
  },
  {
    id: 'rfq-2',
    title: 'Cotización para servicio de maquila',
    requirement: '500 playeras básicas en algodón peinado.',
    quantity: 500,
    deadline: '2026-08-05',
    notes: 'Incluye etiquetado y empaquetado individual.',
    status: 'RESPONDIDA'
  }
];
