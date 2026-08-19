import { useState } from "react";
import { Search, Package, Clock, CheckCircle2, XCircle, Truck } from "lucide-react";
import { getOrder } from "../store";

const STATUS_CONFIG = {
  pending: { icon: Clock, label: "Pending", color: "var(--color-accent)" },
  confirmed: { icon: CheckCircle2, label: "Confirmed", color: "var(--color-primary)" },
  rejected: { icon: XCircle, label: "Rejected", color: "var(--color-badge-sale)" },
  shipping: { icon: Truck, label: "Shipping", color: "var(--color-primary)" },
};

export default function OrderTracking() {
  const [input, setInput] = useState("");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    const id = input.trim().toUpperCase();
    if (!id) return;
    setLoading(true);
    setError("");
    setOrder(null);
    try {
      const data = await getOrder(id);
      setOrder(data);
    } catch {
      setError("Order not found. Please check your order ID and try again.");
    } finally {
      setLoading(false);
    }
  };

  const status = order ? STATUS_CONFIG[order.status] || STATUS_CONFIG.pending : null;
  const StatusIcon = status?.icon || Package;

  return (
    <section className="track-section">
      <div className="track-inner">
        <span className="track-label">Order Tracking</span>
        <h2>
          Track Your <em>Order</em>
        </h2>
        <p className="track-description">Enter your order ID to check the current status of your order.</p>

        <form className="track-form" onSubmit={handleSearch}>
          <div className="track-input-wrap">
            <Search size={18} />
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. GS0001"
            />
          </div>
          <button type="submit" className="track-btn" disabled={loading}>
            {loading ? "Searching..." : "Track"}
          </button>
        </form>

        {error && <div className="track-error">{error}</div>}

        {order && (
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
                <span className="track-detail-label">Name</span>
                <span>{order.customer?.name}</span>
              </div>
              <div className="track-detail-row">
                <span className="track-detail-label">Phone</span>
                <span>{order.customer?.phone}</span>
              </div>
              <div className="track-detail-row">
                <span className="track-detail-label">Address</span>
                <span>{order.customer?.address}</span>
              </div>
              <div className="track-detail-row">
                <span className="track-detail-label">Ordered on</span>
                <span>{new Date(order.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="track-steps">
              {["pending", "confirmed", "shipping"].map((step, i) => {
                const steps = ["pending", "confirmed", "shipping"];
                const currentIdx = steps.indexOf(order.status);
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
        )}
      </div>
    </section>
  );
}
