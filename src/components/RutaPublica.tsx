import { Outlet, Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useAuthHidratado } from "../hooks/useAuthHidratado";


// TODO [A]: si ya hay sesion y entra a /login, mandarlo a /dashboard
export function RutaPublica() {
  const autenticado = useAuthStore((s) => s.autenticado)
  const hidratado = useAuthHidratado()


  if(!hidratado){
    return <div>Cargando...</div>
  }
  if(autenticado){
    return <Navigate to="/dashboard" replace />
  }


  return <Outlet />;
}
