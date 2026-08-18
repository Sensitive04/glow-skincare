import { useState } from "react";
import { Lock, Loader2 } from "lucide-react";
import { signIn, signUp } from "../store";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (isSignUp) {
        await signUp(email, password);
        setError("Check your email for a confirmation link, then sign in.");
        setIsSignUp(false);
        setLoading(false);
        return;
      }
      await signIn(email, password);
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
        <p>
          {isSignUp
            ? "Create an admin account"
            : "Sign in with your Supabase credentials"}
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(""); }}
            required
            autoFocus
          />
          <input
            type="password"
            placeholder="Password (min 6 characters)"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(""); }}
            minLength={6}
            required
          />
          {error && <span className="login-error">{error}</span>}
          <button type="submit" disabled={loading}>
            {loading ? (
              <Loader2 size={18} className="spin" />
            ) : isSignUp ? (
              "Create Account"
            ) : (
              "Sign In"
            )}
          </button>
        </form>
        <button
          className="back-link"
          onClick={() => { setIsSignUp(!isSignUp); setError(""); }}
        >
          {isSignUp
            ? "Already have an account? Sign in"
            : "No account? Create one"}
        </button>
        <a href="#home" className="back-link" style={{ marginTop: "0.5rem", display: "block" }}>
          Back to shop
        </a>
      </div>
    </div>
  );
}
