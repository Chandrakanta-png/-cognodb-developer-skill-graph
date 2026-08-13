import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      await login(form.email, form.password);
      navigate("/profile");
    } catch (err) {
      setError(err.response?.data?.detail || "Unable to sign in. Check your email and password.");
    } finally {
      setSaving(false);
    }
  };

  return <AuthLayout title="Welcome back" subtitle="Sign in to manage your developer profile.">
    <form className="auth-form" onSubmit={submit}>
      <label>Email<input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
      <label>Password<input type="password" required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></label>
      {error && <p className="form-error">{error}</p>}
      <button disabled={saving}>{saving ? "Signing in…" : "Sign in"}</button>
    </form>
    <p className="auth-switch">New to SkillGraph? <Link to="/register">Create an account</Link></p>
  </AuthLayout>;
}

export function AuthLayout({ title, subtitle, children }) {
  return <main className="auth-page"><section className="auth-card"><Link to="/" className="auth-brand">SkillGraph</Link><h1>{title}</h1><p>{subtitle}</p>{children}</section></main>;
}
