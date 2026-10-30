import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useAuthHidratado } from "../hooks/useAuthHidratado";

interface RutaProtegida {
  rolesPermitidos?: string[];
}

// TODO [A]: ahora deja pasar a cualquiera
// - esperar a que el store se rehidrate (useAuthHidratado)
// - sin sesion: <Navigate to="/login" replace />
// - con sesion: <Outlet />
export function RutaProtegida({ rolesPermitidos }: RutaProtegida) {
  const autenticado = useAuthStore((s) => s.autenticado);
  const usuarioRol = useAuthStore((s) => s.usuarioRol);
  const hidratado = useAuthHidratado();
  const location = useLocation();

  if (!hidratado) {
    return <div>Cargando...</div>;
  }

  if (!autenticado) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (rolesPermitidos) {
    const rol = (usuarioRol ?? "").toLowerCase();
    const permitidos = rolesPermitidos.map((r) => r.toLowerCase());
    if (!permitidos.includes(rol)) {
      return <Navigate to="/sinacceso" replace />;
    }
  }

  return <Outlet />;
}