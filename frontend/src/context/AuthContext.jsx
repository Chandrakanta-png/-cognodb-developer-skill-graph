import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getCurrentUser, login as loginRequest } from "../api/api";

const AuthContext = createContext(null);

const ACCESS_TOKEN = "skillgraph_access_token";
const REFRESH_TOKEN = "skillgraph_refresh_token";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreSession = async () => {
      if (!localStorage.getItem(ACCESS_TOKEN)) {
        setLoading(false);
        return;
      }

      try {
        setUser(await getCurrentUser());
      } catch {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  const saveSession = (data) => {
    localStorage.setItem(ACCESS_TOKEN, data.access);
    localStorage.setItem(REFRESH_TOKEN, data.refresh);
    setUser(data.user);
  };

  const login = async (email, password) => {
    const data = await loginRequest(email, password);
    saveSession(data);
    return data.user;
  };

  const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    setUser(null);
  };

  const value = useMemo(() => ({
    user,
    setUser,
    loading,
    isAuthenticated: Boolean(user),
    login,
    logout,
  }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
