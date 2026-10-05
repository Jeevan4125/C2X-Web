import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Lock, Mail } from "lucide-react";
import styles from "./Login.module.scss";
import Container from "@/components/common/Container";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    setError(null);

    setTimeout(() => {
      localStorage.setItem("c2x_user_email", email.trim().toLowerCase());
      localStorage.setItem("c2x_user_name", email.split("@")[0]);
      setLoading(false);
      navigate("/dashboard");
    }, 600);
  };

  return (
    <div className={styles.loginPage}>
      <Container className={styles.container}>
        <div className={styles.card}>
          <div className={styles.brand}>
            <span className={styles.logoBadge}>C2X</span>
            <h1>Sign in to C2X Cloud</h1>
            <p>Access your cross-device projects and workspace</p>
          </div>

          {error && <div className={styles.errorBanner}>{error}</div>}

          <form onSubmit={handleLogin} className={styles.form}>
            <div className={styles.field}>
              <label>Email Address</label>
              <div className={styles.inputWrap}>
                <Mail size={16} />
                <input
                  type="email"
                  placeholder="developer@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus
                />
              </div>
            </div>

            <div className={styles.field}>
              <label>Password</label>
              <div className={styles.inputWrap}>
                <Lock size={16} />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" disabled={loading} className={styles.submitBtn}>
              {loading ? "Signing in..." : "Sign In"} <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default Login;
