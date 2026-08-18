import { X, Trash2, Droplets, ShoppingBag } from "lucide-react";

export default function Cart({
  open,
  onClose,
  items,
  total,
  currency,
  onRemove,
  onUpdateQuantity,
}) {
  return (
    <>
      <div
        className={`cart-overlay ${open ? "open" : ""}`}
        onClick={onClose}
      />
      <div className={`cart-sidebar ${open ? "open" : ""}`}>
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="cart-close" onClick={onClose} aria-label="Close cart">
            <X />
          </button>
        </div>

        <div className="cart-items">
          {items.length === 0 ? (
            <div className="cart-empty">
              <ShoppingBag />
              <p>Your cart is empty</p>
              <span>Add some products to get started</span>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">
                  <Droplets />
                </div>
                <div className="cart-item-details">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-price">
                    {currency}{item.price * item.quantity}
                  </div>
                  <div className="cart-item-controls">
                    <button
                      className="qty-btn"
                      onClick={() => onUpdateQuantity(item.id, -1)}
                    >
                      -
                    </button>
                    <span className="qty-value">{item.quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => onUpdateQuantity(item.id, 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className="cart-item-remove"
                  onClick={() => onRemove(item.id)}
                  aria-label="Remove item"
                >
                  <Trash2 />
                </button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-subtotal">
              <span>Subtotal</span>
              <span>{currency}{total.toFixed(2)}</span>
            </div>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        )}
      </div>
    </>
  );
}
