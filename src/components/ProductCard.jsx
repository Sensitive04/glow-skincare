import { useState } from "react";
import { Droplets, Star, Check } from "lucide-react";

export default function ProductCard({ product, currency, onAddToCart }) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const badgeClass =
    product.badge === "Bestseller"
      ? "badge-bestseller"
      : product.badge === "Sale"
        ? "badge-sale"
        : product.badge === "New"
          ? "badge-new"
          : "badge-premium";

  return (
    <div className="product-card">
      <div className="product-image">
        <Droplets className="product-image-icon" size={64} />
        {product.badge && (
          <span className={`product-badge ${badgeClass}`}>{product.badge}</span>
        )}
      </div>
      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-desc">{product.description}</p>
        <div className="product-meta">
          <span className="product-rating">
            <Star size={12} />
            {product.rating}
          </span>
          <span>({product.reviews} reviews)</span>
          <span>{product.size}</span>
        </div>
        <div className="product-bottom">
          <div className="product-price">
            <span className="price-current">
              {currency}{product.price}
            </span>
            {product.originalPrice && (
              <span className="price-original">
                {currency}{product.originalPrice}
              </span>
            )}
          </div>
          <button
            className={`add-to-cart-btn ${added ? "added" : ""}`}
            onClick={handleAdd}
          >
            {added ? (
              <>
                <Check size={14} style={{ marginRight: 4 }} />
                Added
              </>
            ) : (
              "Add to Cart"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
