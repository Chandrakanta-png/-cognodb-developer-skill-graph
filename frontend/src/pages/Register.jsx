import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../api/api";
import { AuthLayout } from "./Login";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "", first_name: "", last_name: "" });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  const submit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    try {
      await register(form);
      navigate("/login", { state: { registered: true } });
    } catch (err) {
      const data = err.response?.data;
      setError(typeof data === "object" ? Object.values(data).flat().join(" ") : "Unable to create your account.");
    } finally { setSaving(false); }
  };

  return <AuthLayout title="Create your account" subtitle="Start your developer profile in under a minute.">
    <form className="auth-form" onSubmit={submit}>
      <div className="two-fields"><label>First name<input name="first_name" value={form.first_name} onChange={update} /></label><label>Last name<input name="last_name" value={form.last_name} onChange={update} /></label></div>
      <label>Username<input name="username" required value={form.username} onChange={update} /></label>
      <label>Email<input name="email" type="email" required value={form.email} onChange={update} /></label>
      <label>Password<input name="password" type="password" minLength="8" required value={form.password} onChange={update} /></label>
      {error && <p className="form-error">{error}</p>}
      <button disabled={saving}>{saving ? "Creating account…" : "Create account"}</button>
    </form>
    <p className="auth-switch">Already have an account? <Link to="/login">Sign in</Link></p>
  </AuthLayout>;
}
