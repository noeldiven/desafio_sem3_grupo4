import type { Producto } from "../types/producto";
import { AlertaBanner } from "./ui/AlertaBanner";
import { CardProducto } from "./CardProducto";
import { EstadoVacio } from "./ui/EstadoVacio";
import { SkeletonCardProducto } from "./ui/SkeletonCardProducto";

// C le pasa los datos y D se encarga de como se ve cada estado,
// si cambian las props avisen al equipo

interface Props {
  productos: Producto[];
  cargando: boolean;
  error: string | null;
  porPagina: number;
  onReintentar: () => void;
  onLimpiarFiltros: () => void;
}

// TODO [D]: los 4 estados de la lista
// - cargando: grilla con porPagina <SkeletonCardProducto />
// - error: <AlertaBanner tipo="error" /> con boton para reintentar
// - vacio: <EstadoVacio /> con accion para limpiar filtros
// - datos: la grilla de productos (ya funciona)
export function ListaProductos({
  productos,
  cargando,
  error,
  porPagina,
  onReintentar,
  onLimpiarFiltros,
}: Props) {
  if (cargando) {
    return (
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: porPagina }).map((_, i) => (
          <SkeletonCardProducto key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <AlertaBanner
        tipo="error"
        titulo="No pudimos cargar los productos"
        mensaje={error}
        onReintentar={onReintentar}
      />
    );
  }
  if (productos.length === 0) {
    return (
      <EstadoVacio
        titulo="No hay productos para mostrar"
        descripcion="Probá cambiando la categoría o limpiando los filtros."
        accion={{
          label: "Ver todos los productos",
          onClick: onLimpiarFiltros,
        }}
      />
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {productos.map((producto) => (
        <CardProducto key={producto.id} producto={producto} />
      ))}
    </div>
  );
}