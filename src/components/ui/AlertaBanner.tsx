export type TipoAlerta = "info" | "exito" | "advertencia" | "error";

interface Props {
  tipo: TipoAlerta;
  titulo: string;
  mensaje: string;
  onCerrar?: () => void;
  onReintentar?: () => void;
}
const CONFIG: Record<TipoAlerta, { bg: string; text: string; icon: string }> = {
  info: {
    bg: "bg-blue-50 border-blue-200",
    text: "text-blue-700",
    icon: "\u2139",
  },
  exito: {
    bg: "bg-emerald-50 border-emerald-200",
    text: "text-emerald-700",
    icon: "\u2713",
  },
  advertencia: {
    bg: "bg-amber-50 border-amber-200",
    text: "text-amber-700",
    icon: "\u26A0",
  },
  error: {
    bg: "bg-rose-50 border-rose-200",
    text: "text-rose-700",
    icon: "\u2715",
  },
};
// TODO [D]: alerta reutilizable
// - un color distinto por tipo (info, exito, advertencia, error)
// - role="alert"
// - boton cerrar si llega onCerrar, boton reintentar si llega onReintentar
export function AlertaBanner({
  tipo,
  titulo,
  mensaje,
  onCerrar,
  onReintentar,
}: Props) {
  const { bg, text, icon } = CONFIG[tipo];

  return (
    <div
      className={`mt-4 flex items-start gap-3 rounded-lg border p-4 ${bg}`}
      role="alert"
    >
      <span className={`text-lg leading-none ${text}`} aria-hidden="true">
        {icon}
      </span>
      <div className="flex-1">
        {titulo && <p className={`font-semibold ${text}`}>{titulo}</p>}
        <p className={`text-sm ${text}`}>{mensaje}</p>
        {onReintentar && (
          <button
            type="button"
            onClick={onReintentar}
            className={`mt-3 rounded-lg border px-3 py-1.5 text-xs font-bold transition hover:opacity-80 ${bg} ${text}`}
          >
            Reintentar
          </button>
        )}
      </div>
      {onCerrar && (
        <button
          type="button"
          aria-label="Cerrar alerta"
          onClick={onCerrar}
          className={`shrink-0 border-0 bg-transparent text-lg leading-none ${text} hover:opacity-70`}
        >
          ×
        </button>
      )}
    </div>
  );
}