"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore, selectTotal } from "@/lib/store";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const clearCart = useCartStore((s) => s.clearCart);
  const total = useCartStore(selectTotal);

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-4xl px-6 py-20 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
        <p className="mt-4 text-gray-500">Your cart is empty.</p>
        <Link
          href="/products"
          className="mt-6 inline-block rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white transition hover:bg-primary-light"
        >
          Continue Shopping
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">Your Cart</h1>

      <div className="space-y-6">
        {items.map((item) => (
          <div
            key={item.product.id}
            className="flex items-center gap-6 rounded-2xl border border-sage/10 bg-white p-4 shadow-sm"
          >
            <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-warm">
              <Image
                src={item.product.image_url}
                alt={item.product.name}
                fill
                className="object-cover"
                sizes="96px"
              />
            </div>

            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">
                {item.product.name}
              </h3>
              <p className="text-sm text-gray-500">
                ${item.product.price.toFixed(2)}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  updateQuantity(item.product.id, item.quantity - 1)
                }
                className="flex h-8 w-8 items-center justify-center rounded-lg border text-gray-600 transition hover:bg-gray-100"
              >
                -
              </button>
              <span className="w-8 text-center text-sm font-medium">
                {item.quantity}
              </span>
              <button
                onClick={() =>
                  updateQuantity(item.product.id, item.quantity + 1)
                }
                className="flex h-8 w-8 items-center justify-center rounded-lg border text-gray-600 transition hover:bg-gray-100"
              >
                +
              </button>
            </div>

            <p className="w-20 text-right font-bold text-primary">
              ${(item.product.price * item.quantity).toFixed(2)}
            </p>

            <button
              onClick={() => removeItem(item.product.id)}
              className="text-sm text-gray-400 transition hover:text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="mt-10 rounded-2xl border border-sage/10 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-xl font-bold text-primary">
            ${total.toFixed(2)}
          </span>
        </div>
        <p className="mt-1 text-xs text-gray-400">
          Shipping &amp; taxes calculated at checkout.
        </p>

        <button className="mt-6 w-full rounded-full bg-primary py-3 text-sm font-semibold text-white transition hover:bg-primary-light">
          Proceed to Checkout
        </button>

        <button
          onClick={clearCart}
          className="mt-3 w-full text-center text-xs text-gray-400 transition hover:text-red-500"
        >
          Clear Cart
        </button>
      </div>
    </section>
  );
}
