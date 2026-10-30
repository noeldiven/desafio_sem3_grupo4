import { useSearchParams } from "react-router-dom";
import { ListaProductos } from "../components/ListaProductos";
import { Paginacion } from "../components/Paginacion";
import { useApi } from "../hooks/useApi";
import { productosService } from "../services/productos";
import { tema } from "../tema";

const POR_PAGINA = 6;
const CATEGORIA_DEFECTO = tema.categorias[0].valor; //Pensé que sería mejor empezar con la primera cat

export function ProductosPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const paginaUrl = Number(searchParams.get("pagina")); // valido lo que venga en la URL sino no trae nada
  const pagina =
    Number.isInteger(paginaUrl) && paginaUrl >= 1 ? paginaUrl : 1;

  const categoriaUrl = searchParams.get("categoria") ?? CATEGORIA_DEFECTO;
  const categoria = tema.categorias.some((c) => c.valor === categoriaUrl)
    ? categoriaUrl
    : CATEGORIA_DEFECTO;

  const { data, cargando, error, recargar } = useApi(
    () => productosService.getPagina(pagina, POR_PAGINA, categoria),
    [pagina, categoria],
  );

  const opciones = tema.categorias  ;

  const cambiarCategoria = (nueva: string) => {
    const params = new URLSearchParams();
    if (nueva !== CATEGORIA_DEFECTO) params.set("categoria", nueva);
    setSearchParams(params);
  };

  const irAPagina = (nueva: number) => {
   const params = new URLSearchParams(searchParams);
    params.set("pagina", String(nueva));
    setSearchParams(params);
  };

  return (
 <section>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-sm font-semibold text-marca-700">
            Catálogo
          </p>
          <h1 className="text-3xl font-bold tracking-tight">Productos</h1>
        </div>

        <label className="text-sm font-semibold text-slate-700">
          Categoría
          <select
            value={categoria}
            onChange={(e) => cambiarCategoria(e.target.value)}
            className="mt-1 block h-10 rounded-xl border border-stone-300 bg-white px-3 font-normal"
          >
            {opciones.map((cat) => (
              <option key={cat.valor} value={cat.valor}>
                {cat.etiqueta}
              </option>
            ))}
          </select>
        </label>
      </div>

      <ListaProductos
        productos={data?.productos ?? []}
        cargando={cargando}
        error={error}
        porPagina={POR_PAGINA}
        onReintentar={recargar}
        onLimpiarFiltros={() => cambiarCategoria(CATEGORIA_DEFECTO)}
      />

      <Paginacion
        pagina={pagina}
        hayMas={data?.hayMas ?? false}
        deshabilitado={cargando}
        onCambiarPagina={irAPagina}
      />
    </section>
  );
}
