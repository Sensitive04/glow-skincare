import ProductCard from "@/components/ProductCard";
import { fetchAllProducts } from "@/lib/db";

export const metadata = { title: "All Products | Glō Skincare" };
export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const items = await fetchAllProducts();

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="mb-4 text-4xl font-bold text-gray-900">All Products</h1>
      <p className="mb-10 text-gray-500">
        Browse our full collection of clean skincare essentials.
      </p>

      {items.length === 0 ? (
        <p className="text-gray-400">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}
