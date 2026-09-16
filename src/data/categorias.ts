import type { Categoria } from "../types";

// Imágenes de portada son placeholders: TODO reemplazar por fotos reales.
export const CATEGORIAS: Categoria[] = [
  {
    id: "antiguos",
    nombre: "Autos antiguos",
    descripcion:
      "Modelos de las primeras décadas del automóvil, para eventos que buscan un aire de época genuino.",
    imagen: "/img/categorias/antiguos.jpg",
    cantidad: 2,
  },
  {
    id: "clasicos",
    nombre: "Autos clásicos",
    descripcion:
      "Íconos de mitad de siglo, entre convertibles y cupés, para looks clásicos con mucha personalidad.",
    imagen: "/img/categorias/clasicos.jpg",
    cantidad: 1,
  },
  {
    id: "limousinas",
    nombre: "Limousinas y colectivos antiguos",
    descripcion:
      "Vehículos pensados para trasladar grupos con estilo: limousinas y colectivos de época.",
    imagen: "/img/categorias/limousinas.jpg",
    cantidad: 1,
  },
  {
    id: "lujo",
    nombre: "Autos de lujo",
    descripcion: "Sedanes premium para llegadas de alto nivel, con toda la comodidad.",
    imagen: "/img/categorias/lujo.jpg",
    cantidad: 3,
  },
];
