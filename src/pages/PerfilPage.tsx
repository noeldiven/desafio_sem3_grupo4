import { useState } from "react";
import { useForm } from "react-hook-form";
import { InputFotoPerfil } from "../components/InputFotoPerfil";
import { useAuthStore } from "../store/useAuthStore";
import { perfilService } from "../services/perfil";

interface PerfilForm {
  nombre: string;
}

export function PerfilPage() {
  const usuarioNombre = useAuthStore((s) => s.usuarioNombre);
  const usuarioAvatar = useAuthStore((s) => s.usuarioAvatar);
  const actualizarPerfil = useAuthStore((s) => s.actualizarPerfil);

  const [fotoArchivo, setFotoArchivo] = useState<File>();
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState<"exito" | "error">("exito");

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<PerfilForm>({
    defaultValues: {
      nombre: usuarioNombre ?? "",
    },
  });

  const onSubmit = async (data: PerfilForm) => {
    setMensaje("");

    try {
      const perfil = await perfilService.actualizar(
        data.nombre,
        fotoArchivo,
      );

      // Actualizar Zustand: el encabezado cambia inmediatamente.
      actualizarPerfil(perfil.name, perfil.avatar_url);

      setFotoArchivo(undefined);
      setTipoMensaje("exito");
      setMensaje("¡Perfil actualizado correctamente!");
    } catch (error: unknown) {
      console.error("Error al actualizar perfil:", error);

      let mensajeError = "No se pudo actualizar el perfil.";

      if (typeof error === "object" && error !== null && "response" in error) {
        const response = (
          error as {
            response?: {
              data?: { detail?: string; message?: string };
            };
          }
        ).response;

        mensajeError =
          response?.data?.detail ??
          response?.data?.message ??
          mensajeError;
      } else if (error instanceof Error) {
        mensajeError = error.message;
      }

      setTipoMensaje("error");
      setMensaje(mensajeError);
    }
  };

  return (
    <section className="mx-auto max-w-md rounded-3xl border border-stone-200 bg-white p-8">
      <h1 className="mb-6 text-2xl font-bold tracking-tight">
        Mi perfil
      </h1>

      <div className="mb-6 flex justify-center">
        <InputFotoPerfil
          fotoActual={usuarioAvatar}
          iniciales={(usuarioNombre ?? "").substring(0, 2).toUpperCase()}
          onChange={setFotoArchivo}
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <label className="block text-sm font-semibold text-slate-700">
          Nombre completo

          <input
            {...register("nombre", { required: "El nombre es obligatorio" })}
            className="mt-1 h-11 w-full rounded-xl border border-stone-300 px-4 font-normal outline-none focus:border-marca-600 focus:ring-4 focus:ring-marca-600/10"
          />
        </label>

        {mensaje && (
          <div
            role={tipoMensaje === "error" ? "alert" : "status"}
            className={`rounded-xl p-3 text-sm ${
              tipoMensaje === "error"
                ? "bg-red-50 text-red-700"
                : "bg-green-50 text-green-700"
            }`}
          >
            {mensaje}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="h-11 w-full rounded-xl bg-marca-600 text-sm font-bold text-white hover:bg-marca-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Guardando..." : "Guardar cambios"}
        </button>
      </form>
    </section>
  );
}