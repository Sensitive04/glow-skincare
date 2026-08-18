import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group overflow-hidden rounded-2xl border border-sage/10 bg-white shadow-sm transition hover:shadow-md"
    >
      <div className="relative aspect-square overflow-hidden bg-warm">
        <Image
          src={product.image_url}
          alt={product.name}
          fill
          className="object-cover transition group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <div className="p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-sage">
          {product.category}
        </p>
        <h3 className="mt-1 text-lg font-semibold text-gray-900">
          {product.name}
        </h3>
        <p className="mt-1 line-clamp-2 text-sm text-gray-500">
          {product.description}
        </p>
        <p className="mt-3 text-lg font-bold text-primary">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </Link>
  );
}
