import type { Categoria } from "../types";

// Imágenes de portada son placeholders: TODO reemplazar por fotos reales.
export const CATEGORIAS: Categoria[] = [
  {
    id: "antiguos",
    nombre: "Autos antiguos",
    descripcion:
      "Modelos de las primeras décadas del automóvil, para eventos que buscan un aire de época genuino.",
    imagen: "/img/categorias/antiguos.jpg",
    cantidad: 3,
  },
  {
    id: "modernos",
    nombre: "Autos modernos",
    descripcion: "Autos actuales, cómodos y confiables, para traslados sin vueltas el día del evento.",
    imagen: "/img/categorias/modernos.jpg",
    cantidad: 3,
  },
  {
    id: "limousinas",
    nombre: "Limousinas y colectivos antiguos",
    descripcion:
      "Vehículos pensados para trasladar grupos con estilo: limousinas y colectivos de época.",
    imagen: "/img/categorias/limousinas.jpg",
    cantidad: 1,
  },
];
