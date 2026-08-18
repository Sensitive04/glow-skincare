import { useState } from "react";
import { Lock } from "lucide-react";

export default function Login({ onLogin }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === "glow2024") {
      onLogin();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-icon">
          <Lock size={32} />
        </div>
        <h1>GLOW Admin</h1>
        <p>Enter the admin password to continue</p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(false); }}
            className={error ? "error" : ""}
            autoFocus
          />
          {error && <span className="login-error">Wrong password</span>}
          <button type="submit">Sign In</button>
        </form>
        <a href="#home" className="back-link">Back to shop</a>
      </div>
    </div>
  );
}
