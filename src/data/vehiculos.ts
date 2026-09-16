// Generado en Fase 2 a partir de docs/inventario-vehiculos.json (conversión de una sola pasada).
// No volver a leer ese JSON: ver ESTADO.md y PENDIENTES-CLIENTE.md.
import type { Vehiculo } from "../types";

export const VEHICULOS: Vehiculo[] = [
  {
    id: "ford-a-1930-azul",
    nombre: "Ford A 1930 Azul",
    anio: 1930,
    categoria: "antiguos",
    decada: 1930,
    capacidad: 4, // TODO verificar con cliente
    convertible: false,
    colores: ["Azul"],
    eventos: ["casamiento", "aniversario"], // TODO verificar con cliente
    descripcionCorta: "Un auto antiguo en azul para darle carácter a tu evento.",
    descripcionLarga: "Ford A 1930 Azul es un auto antiguo del año 1930 en color azul. Capota fija.\n\nForma parte de nuestra flota para eventos y se puede reservar para casamientos y aniversarios, con traslado y chofer incluido.\n\nTrabajamos con vehículos de colección desde 1991, cuidando cada detalle para que este auto antiguo llegue impecable el día del evento.",
    imagenes: ["/img/vehiculos/ford-a-1930-azul/01.jpg"], // TODO: reemplazar por fotos reales
    destacado: false,
    nota: "Capota fija",
  },
  {
    id: "mercury-1947-negro",
    nombre: "Mercury 1947 Negro 4 Puertas",
    anio: 1947,
    categoria: "antiguos",
    decada: 1940,
    capacidad: 4, // TODO verificar con cliente
    convertible: false,
    colores: ["Negro"],
    eventos: ["casamiento", "aniversario"], // TODO verificar con cliente
    descripcionCorta: "Un auto antiguo en negro para darle carácter a tu evento.",
    descripcionLarga: "Mercury 1947 Negro 4 Puertas es un auto antiguo del año 1947 en color negro.\n\nForma parte de nuestra flota para eventos y se puede reservar para casamientos y aniversarios, con traslado y chofer incluido.\n\nTrabajamos con vehículos de colección desde 1991, cuidando cada detalle para que este auto antiguo llegue impecable el día del evento.",
    imagenes: ["/img/vehiculos/mercury-1947-negro/01.jpg"], // TODO: reemplazar por fotos reales
    destacado: false,
  },
  {
    id: "kaiser-carabela-1959",
    nombre: "Kaiser Carabela 1959",
    anio: 1959,
    categoria: "clasicos",
    decada: 1950,
    capacidad: 4, // TODO verificar con cliente
    convertible: false,
    colores: ["Rojo"],
    eventos: ["casamiento", "aniversario"], // TODO verificar con cliente
    descripcionCorta: "Un auto clásico en rojo para darle carácter a tu evento.",
    descripcionLarga: "Kaiser Carabela 1959 es un auto clásico del año 1959 en color rojo.\n\nForma parte de nuestra flota para eventos y se puede reservar para casamientos y aniversarios, con traslado y chofer incluido.\n\nTrabajamos con vehículos de colección desde 1991, cuidando cada detalle para que este auto clásico llegue impecable el día del evento.",
    imagenes: ["/img/vehiculos/kaiser-carabela-1959/01.jpg"], // TODO: reemplazar por fotos reales
    destacado: false,
  },
  {
    id: "limousine-chrysler-pt",
    nombre: "Limousine Chrysler PT",
    anio: null,
    categoria: "limousinas",
    decada: null,
    capacidad: 6, // TODO verificar con cliente
    convertible: false,
    colores: [],
    eventos: ["casamiento", "quince", "corporativo"], // TODO verificar con cliente
    descripcionCorta: "Una limousina para darle carácter a tu evento.",
    descripcionLarga: "Limousine Chrysler PT es una limousina.\n\nForma parte de nuestra flota para eventos y se puede reservar para casamientos, fiestas de 15 y eventos corporativos, con traslado y chofer incluido.\n\nTrabajamos con vehículos de colección desde 1991, cuidando cada detalle para que este limousina llegue impecable el día del evento.",
    imagenes: ["/img/vehiculos/limousine-chrysler-pt/01.jpg"], // TODO: reemplazar por fotos reales
    destacado: false,
  },
  {
    id: "mercedes-benz-clase-e-2013",
    nombre: "Mercedes Benz Clase E 2013",
    anio: 2013,
    categoria: "lujo",
    decada: 2010,
    capacidad: 4, // TODO verificar con cliente
    convertible: false,
    colores: [],
    eventos: ["casamiento", "corporativo"], // TODO verificar con cliente
    descripcionCorta: "Un auto de lujo para darle carácter a tu evento.",
    descripcionLarga: "Mercedes Benz Clase E 2013 es un auto de lujo del año 2013.\n\nForma parte de nuestra flota para eventos y se puede reservar para casamientos y eventos corporativos, con traslado y chofer incluido.\n\nTrabajamos con vehículos de colección desde 1991, cuidando cada detalle para que este auto de lujo llegue impecable el día del evento.",
    imagenes: ["/img/vehiculos/mercedes-benz-clase-e-2013/01.jpg"], // TODO: reemplazar por fotos reales
    destacado: false,
  },
  {
    id: "mercedes-benz-e400-2020",
    nombre: "Mercedes Benz E400 2020",
    anio: 2020,
    categoria: "lujo",
    decada: 2020,
    capacidad: 4, // TODO verificar con cliente
    convertible: false,
    colores: [],
    eventos: ["casamiento", "corporativo"], // TODO verificar con cliente
    descripcionCorta: "Un auto de lujo para darle carácter a tu evento.",
    descripcionLarga: "Mercedes Benz E400 2020 es un auto de lujo del año 2020.\n\nForma parte de nuestra flota para eventos y se puede reservar para casamientos y eventos corporativos, con traslado y chofer incluido.\n\nTrabajamos con vehículos de colección desde 1991, cuidando cada detalle para que este auto de lujo llegue impecable el día del evento.",
    imagenes: ["/img/vehiculos/mercedes-benz-e400-2020/01.jpg"], // TODO: reemplazar por fotos reales
    destacado: true,
  },
  {
    id: "audi-a4-azul",
    nombre: "Audi A4 Azul",
    anio: null,
    categoria: "lujo",
    decada: null,
    capacidad: 4, // TODO verificar con cliente
    convertible: false,
    colores: ["Azul"],
    eventos: ["casamiento", "corporativo"], // TODO verificar con cliente
    descripcionCorta: "Un auto de lujo en azul para darle carácter a tu evento.",
    descripcionLarga: "Audi A4 Azul es un auto de lujo en color azul.\n\nForma parte de nuestra flota para eventos y se puede reservar para casamientos y eventos corporativos, con traslado y chofer incluido.\n\nTrabajamos con vehículos de colección desde 1991, cuidando cada detalle para que este auto de lujo llegue impecable el día del evento.",
    imagenes: ["/img/vehiculos/audi-a4-azul/01.jpg"], // TODO: reemplazar por fotos reales
    destacado: false,
  }
];
