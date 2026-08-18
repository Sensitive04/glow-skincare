import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import type { Product } from "@/types";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

function createPrismaClient() {
  const adapter = new PrismaPg({
    connectionString:
      process.env.DATABASE_URL ??
      process.env.DIRECT_URL ??
      process.env.DATABASE_URL_POOLED!,
    ssl: { rejectUnauthorized: false },
  });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  const p = await prisma.product.findUnique({ where: { slug } });
  return p ? mapProduct(p) : null;
}

export async function fetchFeatured(): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    where: { inStock: true },
    orderBy: { name: "asc" },
    take: 6,
  });
  return rows.map(mapProduct);
}

export async function fetchAllProducts(): Promise<Product[]> {
  const rows = await prisma.product.findMany({
    orderBy: { name: "asc" },
  });
  return rows.map(mapProduct);
}

type ProductRow = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: unknown;
  imageUrl: string;
  category: string;
  inStock: boolean;
};

function mapProduct(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    price: Number(row.price),
    image_url: row.imageUrl,
    category: row.category,
    in_stock: row.inStock,
  };
}
