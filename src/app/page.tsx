import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { fetchFeatured } from "@/lib/db";

export default async function HomePage() {
  const featured = await fetchFeatured();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-warm via-cream to-white py-24">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h1 className="text-5xl font-extrabold tracking-tight text-primary md:text-6xl">
            Radiance Starts Here
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Clean, effective skincare formulated with botanical ingredients.
            Free from harsh chemicals, packed with results.
          </p>
          <Link
            href="/products"
            className="mt-8 inline-block rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white shadow transition hover:bg-primary-light"
          >
            Shop All Products
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-20">
          <h2 className="mb-10 text-center text-3xl font-bold text-gray-900">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Value Props */}
      <section className="border-t border-sage/10 bg-white py-20">
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 px-6 text-center md:grid-cols-3">
          {[
            { title: "Clean Ingredients", desc: "No parabens, sulfates, or synthetic fragrances." },
            { title: "Cruelty Free", desc: "Never tested on animals. Leaping Bunny certified." },
            { title: "Sustainable", desc: "Recyclable packaging and carbon-neutral shipping." },
          ].map((item) => (
            <div key={item.title}>
              <h3 className="text-lg font-bold text-primary">{item.title}</h3>
              <p className="mt-2 text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
