import { useState, useEffect } from "react";
import { CATEGORIES, SHOP_CONFIG } from "../products";
import { getProducts } from "../store";
import ProductCard from "./ProductCard";

export default function ProductGrid({ onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getProducts();
      setProducts(data);
      setLoading(false);
    }
    load();
  }, []);

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <section id="products">
      <div className="categories">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className={`category-btn ${activeCategory === cat.id ? "active" : ""}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>
      <div className="products-section">
        {loading ? (
          <p style={{ textAlign: "center", color: "var(--color-text-muted)", padding: "3rem" }}>
            Loading products...
          </p>
        ) : filtered.length === 0 ? (
          <p style={{ textAlign: "center", color: "var(--color-text-muted)", padding: "3rem" }}>
            No products found.
          </p>
        ) : (
          <div className="products-grid">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                currency={SHOP_CONFIG.currency}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
