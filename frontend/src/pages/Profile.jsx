import { useEffect, useState } from "react";
import { getCurrentUser, updateCurrentUser, updateProfile } from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => { if (user) setForm({ ...user, profile: user.profile || {} }); }, [user]);
  if (!form) return <main className="profile-page">Loading profile…</main>;
  const update = (section, field, value) => setForm((current) => section === "profile" ? { ...current, profile: { ...current.profile, [field]: value } } : { ...current, [field]: value });
  const submit = async (event) => {
    event.preventDefault(); setSaving(true); setError(""); setMessage("");
    try {
      await updateCurrentUser({ username: form.username, email: form.email, first_name: form.first_name, last_name: form.last_name });
      await updateProfile({ ...form.profile, skills: (form.profile.skillsText || "").split(",").map((skill) => skill.trim()).filter(Boolean) });
      const refreshed = await getCurrentUser(); setUser(refreshed); setForm({ ...refreshed, profile: { ...refreshed.profile, skillsText: refreshed.profile.skills.join(", ") } }); setMessage("Profile saved.");
    } catch (err) { setError("Unable to save your profile. Please review the URLs and try again."); } finally { setSaving(false); }
  };
  const profile = form.profile;
  return <main className="profile-page"><form className="profile-card" onSubmit={submit}><div className="profile-heading"><div><p className="eyebrow">YOUR ACCOUNT</p><h1>Developer profile</h1><p>Keep your skills and public links up to date.</p></div><button disabled={saving}>{saving ? "Saving…" : "Save profile"}</button></div><section className="profile-grid"><label>First name<input value={form.first_name} onChange={(e) => update("user", "first_name", e.target.value)} /></label><label>Last name<input value={form.last_name} onChange={(e) => update("user", "last_name", e.target.value)} /></label><label>Username<input value={form.username} onChange={(e) => update("user", "username", e.target.value)} /></label><label>Email<input type="email" value={form.email} onChange={(e) => update("user", "email", e.target.value)} /></label><label className="full-field">Display name<input value={profile.display_name || ""} onChange={(e) => update("profile", "display_name", e.target.value)} /></label><label className="full-field">Bio<textarea value={profile.bio || ""} onChange={(e) => update("profile", "bio", e.target.value)} /></label><label>Location<input value={profile.location || ""} onChange={(e) => update("profile", "location", e.target.value)} /></label><label>Skills <span>comma separated</span><input value={profile.skillsText ?? (profile.skills || []).join(", ")} onChange={(e) => update("profile", "skillsText", e.target.value)} /></label><label>GitHub URL<input type="url" value={profile.github_url || ""} onChange={(e) => update("profile", "github_url", e.target.value)} /></label><label>LinkedIn URL<input type="url" value={profile.linkedin_url || ""} onChange={(e) => update("profile", "linkedin_url", e.target.value)} /></label><label>Website<input type="url" value={profile.website || ""} onChange={(e) => update("profile", "website", e.target.value)} /></label><label>Avatar URL<input type="url" value={profile.avatar_url || ""} onChange={(e) => update("profile", "avatar_url", e.target.value)} /></label></section>{message && <p className="form-success">{message}</p>}{error && <p className="form-error">{error}</p>}</form></main>;
}
