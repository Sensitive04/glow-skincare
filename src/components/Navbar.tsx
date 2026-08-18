"use client";

import Link from "next/link";
import { useCartStore } from "@/lib/store";

export default function Navbar() {
  const itemCount = useCartStore((s) =>
    s.items.reduce((count, item) => count + item.quantity, 0)
  );

  return (
    <header className="sticky top-0 z-50 border-b border-sage/20 bg-cream/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-2xl font-bold text-primary">
          Glō
        </Link>

        <div className="flex items-center gap-8">
          <Link
            href="/products"
            className="text-sm font-medium text-gray-700 transition hover:text-primary"
          >
            Shop
          </Link>

          <Link
            href="/cart"
            className="relative text-sm font-medium text-gray-700 transition hover:text-primary"
          >
            Cart
            {itemCount > 0 && (
              <span className="absolute -right-5 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
}
