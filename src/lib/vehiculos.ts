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

export interface FiltrosVehiculo {
  texto?: string;
  categorias?: CategoriaId[];
  eventos?: TipoEvento[];
  decadas?: number[];
  colores?: string[];
  convertible?: boolean;
  capacidadMinima?: number;
}

export function filtrar(filtros: FiltrosVehiculo): Vehiculo[] {
  const texto = filtros.texto ? normalizar(filtros.texto.trim()) : "";

  return VEHICULOS.filter((v) => {
    if (texto) {
      const coincideNombre = normalizar(v.nombre).includes(texto);
      const coincideAnio = v.anio !== null && v.anio.toString().includes(texto);
      if (!coincideNombre && !coincideAnio) return false;
    }
    if (filtros.categorias?.length) {
      const enCategoria =
        filtros.categorias.includes(v.categoria) ||
        v.tambienEn?.some((c) => filtros.categorias!.includes(c));
      if (!enCategoria) return false;
    }
    if (filtros.eventos?.length && !v.eventos.some((e) => filtros.eventos!.includes(e))) {
      return false;
    }
    if (filtros.decadas?.length && (v.decada === null || !filtros.decadas.includes(v.decada))) {
      return false;
    }
    if (filtros.colores?.length && !v.colores.some((c) => filtros.colores!.includes(c))) {
      return false;
    }
    if (filtros.convertible !== undefined && v.convertible !== filtros.convertible) return false;
    if (filtros.capacidadMinima !== undefined && v.capacidad < filtros.capacidadMinima) return false;
    return true;
  });
}

export function getDecadasDisponibles(): number[] {
  const decadas = new Set(
    VEHICULOS.map((v) => v.decada).filter((d): d is number => d !== null)
  );
  return [...decadas].sort((a, b) => a - b);
}

export function getColoresDisponibles(): string[] {
  const colores = new Set(VEHICULOS.flatMap((v) => v.colores));
  return [...colores].sort((a, b) => a.localeCompare(b, "es"));
}

export function getCapacidadMaxima(): number {
  return Math.max(...VEHICULOS.map((v) => v.capacidad));
}

export function getTrabajosDeVehiculo(vehiculoId: string): Trabajo[] {
  return TRABAJOS.filter((t) => t.vehiculosIds.includes(vehiculoId));
}
