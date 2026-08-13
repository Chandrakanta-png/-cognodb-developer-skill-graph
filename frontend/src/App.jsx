import React from "react";
import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Developers from "./pages/Developers";
import DeveloperDetails from "./pages/DeveloperDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import { AuthProvider, useAuth } from "./context/AuthContext";

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null;
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/developers" element={<Developers />} />
          <Route path="/developer/:id" element={<DeveloperDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
