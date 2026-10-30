// datos de la tienda: nombre, textos y categorias
// los colores y la fuente estan en index.css

export interface Categoria {
  valor: string; // como se guarda en la API
  etiqueta: string; // como se muestra
}

export const tema = {
  nombre: "verdulería",
  inicial: "V",
  emoji: "🥬",
  login: {
    kicker: "Tu tienda, más simple",
    titulo: "Compra lo que te hace bien.",
    texto:
      "Encuentra productos seleccionados para tu día a día y disfruta una experiencia de compra sencilla.",
  },
  // categorias de su tienda, con el prefijo del grupo. ejemplo:
  categorias: [
    { valor: "Verdu-Verduras", etiqueta: "Verduras" },
    { valor: "Verdu-Frutas", etiqueta: "Frutas" },
    { valor: "Verdu-Tuberculos", etiqueta: "Tubérculos" },
    { valor: "Verdu-Hierbas", etiqueta: "Hierbas" },
  ] as Categoria[],
};

export function etiquetaCategoria(valor: string) {
  return tema.categorias.find((c) => c.valor === valor)?.etiqueta ?? valor;
}
