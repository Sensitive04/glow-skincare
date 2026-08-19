import { useState, useEffect } from "react";
import { Search, Package, Clock, CheckCircle2, XCircle, Truck } from "lucide-react";
import { getOrder, getOrdersByPhone } from "../store";

const STATUS_CONFIG = {
  pending: { icon: Clock, label: "Pending", color: "var(--color-accent)" },
  confirmed: { icon: CheckCircle2, label: "Confirmed", color: "var(--color-primary)" },
  rejected: { icon: XCircle, label: "Rejected", color: "var(--color-badge-sale)" },
  shipped: { icon: Truck, label: "Shipped", color: "var(--color-primary)" },
};

function OrderCard({ order }) {
  const status = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending;
  const StatusIcon = status.icon;

  return (
    <div className="track-result">
      <div className="track-status-header">
        <StatusIcon size={32} style={{ color: status.color }} />
        <div>
          <h3>Order #{order.orderId}</h3>
          <span className="track-status-badge" style={{ background: status.color }}>
            {status.label}
          </span>
        </div>
      </div>

      <div className="track-details">
        <div className="track-detail-row">
          <span className="track-detail-label">Items</span>
          <span>{order.items.map((item) => `${item.name} x${item.quantity}`).join(", ")}</span>
        </div>
        <div className="track-detail-row">
          <span className="track-detail-label">Total</span>
          <span>{order.currency}{Number(order.total).toFixed(2)}</span>
        </div>
        <div className="track-detail-row">
          <span className="track-detail-label">Ordered on</span>
          <span>{new Date(order.createdAt).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="track-steps">
        {["pending", "confirmed", "shipped"].map((step, i) => {
          const currentIdx = ["pending", "confirmed", "shipped"].indexOf(order.status);
          const isRejected = order.status === "rejected";
          const done = !isRejected && i <= currentIdx;
          const current = !isRejected && i === currentIdx;
          return (
            <div key={step} className={`track-step ${done ? "done" : ""} ${current ? "current" : ""}`}>
              <div className="track-step-dot" style={done ? { background: "var(--color-primary)" } : {}} />
              <span>{step.charAt(0).toUpperCase() + step.slice(1)}</span>
              {i < 2 && <div className={`track-step-line ${done && i < currentIdx ? "done" : ""}`} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function OrderTracking() {
  const [orderId, setOrderId] = useState("");
  const [phone, setPhone] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const savedOrder = localStorage.getItem("glow_last_order");
    const savedPhone = localStorage.getItem("glow_last_phone");
    if (savedOrder) setOrderId(savedOrder);
    if (savedPhone) setPhone(savedPhone);
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    const id = orderId.trim().toUpperCase();
    const ph = phone.trim();
    if (!id && !ph) {
      setError("Please enter your phone number or order ID.");
      return;
    }
    setLoading(true);
    setError("");
    setOrders([]);
    try {
      if (id && ph) {
        const data = await getOrder(id, ph);
        setOrders([data]);
      } else if (id) {
        setError("Please enter your phone number to verify this order.");
        setLoading(false);
        return;
      } else {
        const data = await getOrdersByPhone(ph);
        if (data.length === 0) {
          setError("No orders found for this phone number.");
        } else {
          setOrders(data);
        }
      }
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="track-section">
      <div className="track-inner">
        <span className="track-label">Order Tracking</span>
        <h2>
          Track Your <em>Order</em>
        </h2>
        <p className="track-description">Enter your phone number to find your orders, or both order ID and phone to verify a specific order.</p>

        <form className="track-form" onSubmit={handleSearch}>
          <div className="track-inputs">
            <div className="track-input-wrap">
              <Search size={18} />
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Order ID (optional)"
              />
            </div>
            <div className="track-input-wrap">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone number"
                required
              />
            </div>
          </div>
          <button type="submit" className="track-btn" disabled={loading}>
            {loading ? "Searching..." : "Track"}
          </button>
        </form>

        {error && <div className="track-error">{error}</div>}

        {orders.length > 1 && (
          <p className="track-results-count">{orders.length} orders found</p>
        )}

        {orders.map((order) => (
          <OrderCard key={order.orderId} order={order} />
        ))}
      </div>
    </section>
  );
}
