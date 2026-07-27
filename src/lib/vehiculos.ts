import { VEHICULOS } from "../data/vehiculos";
import { TRABAJOS } from "../data/trabajos";
import type { CategoriaId, TipoEvento, Trabajo, Vehiculo } from "../types";

export function getPorCategoria(categoria: CategoriaId): Vehiculo[] {
  return VEHICULOS.filter(
    (v) => v.categoria === categoria || v.tambienEn?.includes(categoria)
  );
}

export function getPorId(id: string): Vehiculo | undefined {
  return VEHICULOS.find((v) => v.id === id);
}

export function getDestacados(): Vehiculo[] {
  return VEHICULOS.filter((v) => v.destacado);
}

function normalizar(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();
}

export function buscar(query: string): Vehiculo[] {
  const q = normalizar(query.trim());
  if (!q) return [];
  return VEHICULOS.filter((v) => normalizar(v.nombre).includes(q));
}

export interface FiltrosVehiculo {
  categoria?: CategoriaId;
  convertible?: boolean;
  evento?: TipoEvento;
  decada?: number;
  capacidadMinima?: number;
}

export function filtrar(filtros: FiltrosVehiculo): Vehiculo[] {
  return VEHICULOS.filter((v) => {
    if (filtros.categoria && v.categoria !== filtros.categoria && !v.tambienEn?.includes(filtros.categoria)) {
      return false;
    }
    if (filtros.convertible !== undefined && v.convertible !== filtros.convertible) return false;
    if (filtros.evento && !v.eventos.includes(filtros.evento)) return false;
    if (filtros.decada !== undefined && v.decada !== filtros.decada) return false;
    if (filtros.capacidadMinima !== undefined && v.capacidad < filtros.capacidadMinima) return false;
    return true;
  });
}

export function getTrabajosDeVehiculo(vehiculoId: string): Trabajo[] {
  return TRABAJOS.filter((t) => t.vehiculosIds.includes(vehiculoId));
}
