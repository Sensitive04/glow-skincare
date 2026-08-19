import { useState, useEffect } from "react";
import { Lock, Loader2, Wifi, WifiOff } from "lucide-react";
import { signIn } from "../store";

export default function Login({ onLogin }) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [connStatus, setConnStatus] = useState("checking");

  useEffect(() => {
    fetch("/api/products")
      .then((r) => setConnStatus(r.ok ? "ok" : "failed"))
      .catch(() => setConnStatus("failed"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signIn("", password);
      onLogin();
    } catch (err) {
      setError(err.message || "Authentication failed");
    }
    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-icon">
          <Lock size={32} />
        </div>
        <h1>GLOW Admin</h1>

        <div className={`conn-badge ${connStatus}`}>
          {connStatus === "checking" && <><Loader2 size={14} className="spin" /> Connecting...</>}
          {connStatus === "ok" && <><Wifi size={14} /> Connected to MongoDB</>}
          {connStatus === "failed" && <><WifiOff size={14} /> Connection failed</>}
        </div>

        <p>Enter the admin password</p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Admin password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(""); }}
            required
            autoFocus
          />
          {error && <span className="login-error">{error}</span>}
          <button type="submit" disabled={loading || connStatus !== "ok"}>
            {loading ? (
              <Loader2 size={18} className="spin" />
            ) : (
              "Sign In"
            )}
          </button>
        </form>
        <a href="#home" className="back-link" style={{ marginTop: "0.5rem", display: "block" }}>
          Back to shop
        </a>
      </div>
    </div>
  );
}
