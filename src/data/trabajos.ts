import type { Trabajo } from "../types";

// Imágenes son placeholders: TODO reemplazar por fotos reales.
// anio: null en todos porque la fuente original no lo especifica — no inventar.
export const TRABAJOS: Trabajo[] = [
  {
    id: "diarios-de-motocicleta",
    titulo: "Diarios de Motocicleta",
    tipo: "cine",
    anio: null,
    imagen: "/img/trabajos/diarios-de-motocicleta.jpg",
    descripcion: "Se alquiló la Norton 1948 para la película.",
    fuente: "Página de motos del sitio original",
    vehiculosIds: ["norton-1948"],
  },
  {
    id: "atav",
    titulo: "Argentina, tierra de amor y venganza",
    tipo: "cine",
    anio: null,
    imagen: "/img/trabajos/atav.jpg",
    descripcion: "Vehículos de época alquilados para la ficción televisiva.",
    fuente: "https://hupmobile.com.ar/ATAV.html",
    vehiculosIds: [],
  },
  {
    id: "tita",
    titulo: "Yo soy así, Tita de Buenos Aires",
    tipo: "cine",
    anio: null,
    imagen: "/img/trabajos/tita.jpg",
    descripcion: "Vehículos de época alquilados para la película.",
    fuente: "https://hupmobile.com.ar/Tita.html",
    vehiculosIds: [],
  },
  {
    id: "videoclip-el-amor-de-mi-vida",
    titulo: 'Videoclip "El amor de mi vida" — Ulises Bueno y Jimena Barón',
    tipo: "publicidad",
    anio: null,
    imagen: "/img/trabajos/videoclip-el-amor-de-mi-vida.jpg",
    descripcion: "Auto alquilado: Siam.",
    fuente: "Facebook oficial",
    vehiculosIds: [],
  },
  {
    id: "paseos-turisticos-autos",
    titulo: "Paseos con turistas en autos antiguos",
    tipo: "turismo",
    anio: null,
    imagen: "/img/trabajos/paseos-turisticos-autos.jpg",
    fuente: "https://hupmobile.com.ar/Paseos de turistas en autos antiguos.html",
    vehiculosIds: [],
  },
  {
    id: "paseos-turisticos-colectivos",
    titulo: "Paseos con turistas en colectivos antiguos",
    tipo: "turismo",
    anio: null,
    imagen: "/img/trabajos/paseos-turisticos-colectivos.jpg",
    fuente: "https://hupmobile.com.ar/Alquiler de colectivos antiguos.html",
    vehiculosIds: [],
  },
];
