/**
 * Seed mínimo para mostrar el MVP con datos de ejemplo navegables.
 */
import { PrismaClient, CompanyType, MembershipType, VerificationStatus, Role } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

/**
 * Inserta categorías, empresas, usuarios, productos y una RFQ de ejemplo.
 */
async function main() {
  const password = await hash('Demo1234*', 10);

  const categories = [
    { name: 'Telas', slug: 'telas', description: 'Textiles para confección y producción.' },
    { name: 'Maquinaria', slug: 'maquinaria', description: 'Equipamiento industrial y de taller.' },
    { name: 'Confección / Maquila', slug: 'confeccion-maquila', description: 'Servicios de manufactura textil.' },
    { name: 'Insumos y Accesorios', slug: 'insumos-accesorios', description: 'Botones, cierres, elásticos y avíos.' },
    { name: 'Servicios', slug: 'servicios', description: 'Patronaje, corte, logística y consultoría.' }
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: category,
      create: category
    });
  }

  const supplier = await prisma.company.upsert({
    where: { slug: 'tejidos-del-centro' },
    update: {},
    create: {
      slug: 'tejidos-del-centro',
      name: 'Tejidos del Centro',
      description: 'Proveedor nacional de telas para moda y uniformes.',
      city: 'Ciudad de México',
      state: 'CDMX',
      companyType: CompanyType.NACIONAL,
      membershipType: MembershipType.PREMIUM,
      verificationStatus: VerificationStatus.APROBADA,
      isVerified: true,
      users: {
        create: {
          name: 'Proveedor Demo',
          email: 'proveedor@trama.test',
          password,
          role: Role.SUPPLIER
        }
      },
      membership: {
        create: {
          type: MembershipType.PREMIUM,
          monthlyPriceMx: 999
        }
      }
    }
  });

  const buyerCompany = await prisma.company.upsert({
    where: { slug: 'marca-estudio-sur' },
    update: {},
    create: {
      slug: 'marca-estudio-sur',
      name: 'Marca Estudio Sur',
      description: 'Marca emergente enfocada en colecciones cápsula.',
      city: 'Guadalajara',
      state: 'Jalisco',
      companyType: CompanyType.NACIONAL,
      membershipType: MembershipType.GRATIS,
      verificationStatus: VerificationStatus.APROBADA,
      isVerified: true,
      users: {
        create: {
          name: 'Compradora Demo',
          email: 'comprador@trama.test',
          password,
          role: Role.BUYER
        }
      },
      membership: {
        create: {
          type: MembershipType.GRATIS,
          monthlyPriceMx: 0
        }
      }
    }
  });

  await prisma.user.upsert({
    where: { email: 'admin@trama.test' },
    update: {},
    create: {
      name: 'Admin Demo',
      email: 'admin@trama.test',
      password,
      role: Role.ADMIN
    }
  });

  const telas = await prisma.category.findUniqueOrThrow({ where: { slug: 'telas' } });
  const maquinaria = await prisma.category.findUniqueOrThrow({ where: { slug: 'maquinaria' } });
  const buyer = await prisma.user.findUniqueOrThrow({ where: { email: 'comprador@trama.test' } });

  await prisma.product.upsert({
    where: { slug: 'mezclilla-premium-12oz' },
    update: {},
    create: {
      name: 'Mezclilla Premium 12oz',
      slug: 'mezclilla-premium-12oz',
      description: 'Tela resistente para denim y uniformes premium.',
      price: 148.5,
      moq: 50,
      available: true,
      stockLabel: 'Disponible esta semana',
      location: 'CDMX',
      coverImageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80',
      companyId: supplier.id,
      categoryId: telas.id
    }
  });

  await prisma.product.upsert({
    where: { slug: 'maquina-overlock-industrial' },
    update: {},
    create: {
      name: 'Máquina Overlock Industrial',
      slug: 'maquina-overlock-industrial',
      description: 'Equipo industrial para producción continua.',
      price: 19500,
      moq: 1,
      available: true,
      stockLabel: 'Entrega en 7 días',
      location: 'León',
      coverImageUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80',
      companyId: supplier.id,
      categoryId: maquinaria.id
    }
  });

  await prisma.rFQ.create({
    data: {
      title: 'Cotización para 300 metros de mezclilla',
      requirement: 'Necesitamos mezclilla azul marino para colección otoño.',
      quantity: 300,
      notes: 'Buscamos entrega en 2 semanas y ficha técnica.',
      buyerId: buyer.id,
      recipients: {
        create: {
          companyId: supplier.id
        }
      }
    }
  });

  await prisma.contact.create({
    data: {
      buyerCompany: buyerCompany.name,
      buyerContact: 'Compradora Demo',
      buyerEmail: 'comprador@trama.test',
      notes: 'Interesada en maquila y desarrollo de muestras.',
      supplierCompanyId: supplier.id
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
