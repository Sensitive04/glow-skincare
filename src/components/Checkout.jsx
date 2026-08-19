import { useState } from "react";
import { X, Loader2, CheckCircle2 } from "lucide-react";
import { createOrder } from "../store";

export default function Checkout({ open, onClose, items, total, currency, onOrderComplete }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [orderId, setOrderId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim()) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const result = await createOrder({
        items: items.map(({ id, name, price, quantity }) => ({ id, name, price, quantity })),
        total,
        currency,
        customer: { name: name.trim(), phone: phone.trim(), address: address.trim() },
      });
      setOrderId(result.orderId);
      onOrderComplete();
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setName("");
    setPhone("");
    setAddress("");
    setError("");
    setOrderId(null);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="checkout-overlay" onClick={handleClose}>
      <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
        {orderId ? (
          <div className="checkout-success">
            <CheckCircle2 />
            <h2>Order Placed!</h2>
            <p>Your order <strong>#{orderId}</strong> has been received.</p>
            <span>We'll contact you on Telegram to confirm your order.</span>
            <button className="checkout-btn" onClick={handleClose}>Done</button>
          </div>
        ) : (
          <>
            <div className="checkout-header">
              <h2>Checkout</h2>
              <button onClick={handleClose} aria-label="Close"><X /></button>
            </div>
            <form onSubmit={handleSubmit} className="checkout-body">
              <div className="checkout-items-summary">
                {items.map((item) => (
                  <div key={item.id} className="checkout-line">
                    <span>{item.name} x{item.quantity}</span>
                    <span>{currency}{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="checkout-line checkout-total">
                  <span>Total</span>
                  <span>{currency}{total.toFixed(2)}</span>
                </div>
              </div>
              <label>
                Full Name
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" required />
              </label>
              <label>
                Phone Number
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Your phone number" required />
              </label>
              <label>
                Delivery Address
                <textarea value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Full delivery address" rows={3} required />
              </label>
              {error && <div className="checkout-error">{error}</div>}
              <button type="submit" className="checkout-btn" disabled={loading}>
                {loading ? <><Loader2 className="spin" /> Placing Order...</> : "Place Order"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
