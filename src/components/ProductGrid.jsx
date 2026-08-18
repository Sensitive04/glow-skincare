import { useState } from "react";
import { CATEGORIES, SHOP_CONFIG } from "../products";
import { getProducts } from "../store";
import ProductCard from "./ProductCard";

export default function ProductGrid({ onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [refreshKey, setRefreshKey] = useState(0);

  const products = getProducts();

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
      </div>
    </section>
  );
}
