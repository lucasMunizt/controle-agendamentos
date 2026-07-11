// src/components/common/auth/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute() {
  const autenticado = localStorage.getItem("autenticado") === "true";

  return autenticado ? <Outlet /> : <Navigate to="/login" replace />;
}
