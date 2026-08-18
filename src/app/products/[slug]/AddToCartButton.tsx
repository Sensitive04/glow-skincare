"use client";

import { useCartStore } from "@/lib/store";
import type { Product } from "@/types";

export default function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);

  function handleAdd() {
    addItem(product);
  }

  return (
    <button
      onClick={handleAdd}
      className="w-full rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white shadow transition hover:bg-primary-light"
    >
      Add to Cart
    </button>
  );
}
