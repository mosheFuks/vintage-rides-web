import { SITE } from "../config/site";
import { EVENTOS } from "../data/eventos";
import { nombreConAnio } from "./vehiculos";
import type { TipoEvento, Vehiculo } from "../types";

const MENSAJE_GENERAL = "Hola! Te quería hacer una consulta sobre el alquiler de autos.";

export interface DatosConsulta {
  fecha?: string;
  zona?: string;
  evento?: TipoEvento;
  duracionHoras?: string;
  comentario?: string;
}

export function armarUrlWhatsapp(mensaje: string): string {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}

export function urlVehiculo(id: string): string {
  return `${SITE.url}/auto/${id}`;
}

export function mensajeGeneral(): string {
  return MENSAJE_GENERAL;
}

export function mensajeModelo(vehiculo: Vehiculo): string {
  return `Hola! Te quería consultar por la disponibilidad del modelo ${nombreConAnio(vehiculo)}.\n${urlVehiculo(vehiculo.id)}`;
}

export function mensajeConsultaMultiple(vehiculos: Vehiculo[], datos?: DatosConsulta): string {
  const lista = vehiculos
    .map((v, i) => `${i + 1}. ${nombreConAnio(v)}\n${urlVehiculo(v.id)}`)
    .join("\n\n");

  let mensaje = `Hola! Te quería consultar por la disponibilidad de estos modelos:\n\n${lista}`;

  const nombreEvento = datos?.evento ? EVENTOS.find((e) => e.id === datos.evento)?.nombre : undefined;
  const extras = [
    datos?.fecha && `📅 Fecha: ${datos.fecha}`,
    datos?.zona && `📍 Zona: ${datos.zona}`,
    nombreEvento && `🎉 Evento: ${nombreEvento}`,
    datos?.duracionHoras && `⏱ Duración: ${datos.duracionHoras} hs`,
    datos?.comentario && `💬 ${datos.comentario}`,
  ].filter(Boolean);

  if (extras.length) mensaje += `\n\n${extras.join("\n")}`;

  return mensaje;
}
