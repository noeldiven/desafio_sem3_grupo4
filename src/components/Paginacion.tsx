interface Props {
  pagina: number;
  hayMas: boolean;
  deshabilitado: boolean;
  onCambiarPagina: (nueva: number) => void;
}

// TODO [C]: botones Anterior y Siguiente
// - Anterior deshabilitado en la pagina 1 o mientras carga
// - Siguiente deshabilitado si no hayMas o mientras carga
export function Paginacion({
  pagina,
  hayMas,
  deshabilitado,
  onCambiarPagina, }
  : Props) {
  const clase =
    "h-10 rounded-xl border border-stone-300 bg-white px-4 text-sm font-semibold " +
    "disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <nav
      aria-label="Paginación"
      className="mt-8 flex items-center justify-center gap-4"
    >
      <button
        type="button"
        className={clase}
        disabled={pagina <= 1 || deshabilitado}
        onClick={() => onCambiarPagina(pagina - 1)}
      >
        Anterior
      </button>

      <span className="text-sm">Página {pagina}</span>

      <button
        type="button"
        className={clase}
        disabled={!hayMas || deshabilitado}
        onClick={() => onCambiarPagina(pagina + 1)}
      >
        Siguiente
      </button>
    </nav>
  );
}
