import { useEffect, useRef, useState } from "react";

interface Props {
  fotoActual: string | null;
  iniciales: string;
  onChange: (file: File | undefined) => void;
}

const MAX_TAMANO = 2 * 1024 * 1024;

export function InputFotoPerfil({
  fotoActual,
  iniciales,
  onChange,
}: Props) {
  const [archivo, setArchivo] = useState<File>();
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Liberar la URL temporal al cambiar la imagen o desmontar el componente.
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const seleccionarFoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Selecciona un archivo de imagen válido.");
      e.target.value = "";
      return;
    }

    if (file.size >= MAX_TAMANO) {
      setError("La imagen debe pesar menos de 2 MB.");
      e.target.value = "";
      return;
    }

    setError("");
    setArchivo(file);
    setPreview(URL.createObjectURL(file));
    onChange(file);
  };

  const quitarFoto = () => {
    setArchivo(undefined);
    setPreview(null);
    setError("");
    onChange(undefined);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="grid size-28 place-items-center overflow-hidden rounded-full border-4 border-marca-600 bg-marca-100 text-2xl font-bold text-marca-800">
        {preview || fotoActual ? (
          <img
            src={preview ?? fotoActual ?? ""}
            alt="Foto de perfil"
            className="size-full object-cover"
          />
        ) : (
          iniciales
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={seleccionarFoto}
        className="max-w-full text-xs"
      />

      {archivo && (
        <button
          type="button"
          onClick={quitarFoto}
          className="text-sm font-semibold text-red-600 hover:text-red-800"
        >
          Quitar foto
        </button>
      )}

      {error && (
        <p role="alert" className="text-center text-xs text-red-600">
          {error}
        </p>
      )}

      <p className="text-xs text-slate-400">Imagen JPG, PNG o similar. Máximo 2 MB.</p>
    </div>
  );
}