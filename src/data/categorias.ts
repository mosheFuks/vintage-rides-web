import type { Categoria } from "../types";

// Imágenes de portada son placeholders: TODO reemplazar por fotos reales.
export const CATEGORIAS: Categoria[] = [
  {
    id: "antiguos",
    nombre: "Autos antiguos",
    descripcion:
      "Modelos de las primeras décadas del automóvil, para eventos que buscan un aire de época genuino.",
    imagen: "/img/categorias/antiguos.jpg",
    cantidad: 27,
  },
  {
    id: "clasicos",
    nombre: "Autos clásicos",
    descripcion:
      "Íconos de mitad de siglo, entre convertibles y cupés, para looks clásicos con mucha personalidad.",
    imagen: "/img/categorias/clasicos.jpg",
    cantidad: 44,
  },
  {
    id: "limousinas",
    nombre: "Limousinas y colectivos antiguos",
    descripcion:
      "Vehículos pensados para trasladar grupos con estilo: limousinas y colectivos de época.",
    imagen: "/img/categorias/limousinas.jpg",
    cantidad: 11,
  },
  {
    id: "modernos",
    nombre: "Autos modernos",
    descripcion: "Autos actuales, cómodos y confiables, para traslados sin vueltas el día del evento.",
    imagen: "/img/categorias/modernos.jpg",
    cantidad: 15,
  },
  {
    id: "lujo",
    nombre: "Autos de lujo",
    descripcion: "Sedanes premium para llegadas de alto nivel, con toda la comodidad.",
    imagen: "/img/categorias/lujo.jpg",
    cantidad: 6,
  },
  {
    id: "clasicos-argentinos",
    nombre: "Clásicos argentinos",
    descripcion:
      "La flota más grande: Siam, Fitito, Falcon, Torino y otros fierros que marcaron la industria nacional.",
    imagen: "/img/categorias/clasicos-argentinos.jpg",
    cantidad: 61,
  },
  {
    id: "motos",
    nombre: "Motos y bicicletas",
    descripcion: "Motos y bicicletas de época, ideales para producciones y detalles de ambientación.",
    imagen: "/img/categorias/motos.jpg",
    cantidad: 18,
  },
  {
    id: "camionetas",
    nombre: "Camionetas, kombis y jeeps",
    descripcion: "Kombis, jeeps y camionetas clásicas, con onda para paseos y producciones.",
    imagen: "/img/categorias/camionetas.jpg",
    cantidad: 24,
  },
];
