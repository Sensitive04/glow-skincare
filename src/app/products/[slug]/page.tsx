import Image from "next/image";
import { notFound } from "next/navigation";
import { fetchProductBySlug } from "@/lib/db";
import AddToCartButton from "./AddToCartButton";
import type { Product } from "@/types";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return { title: `${slug} | Glō Skincare` };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);

  if (!product) notFound();

  const p = product as Product;

  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-warm">
          <Image
            src={p.image_url}
            alt={p.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>

        <div className="flex flex-col justify-center">
          <p className="text-sm font-medium uppercase tracking-wider text-sage">
            {p.category}
          </p>
          <h1 className="mt-2 text-4xl font-bold text-gray-900">{p.name}</h1>
          <p className="mt-4 text-3xl font-bold text-primary">
            ${p.price.toFixed(2)}
          </p>
          <p className="mt-6 leading-relaxed text-gray-600">{p.description}</p>

          <div className="mt-8">
            {p.in_stock ? (
              <AddToCartButton product={p} />
            ) : (
              <span className="text-sm font-medium text-red-500">
                Out of Stock
              </span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
