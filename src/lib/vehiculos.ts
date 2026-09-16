import { VEHICULOS } from "../data/vehiculos";
import { TRABAJOS } from "../data/trabajos";
import type { CategoriaId, Trabajo, Vehiculo } from "../types";

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

/** Nombre + año, salvo que el nombre ya incluya el año (frecuente en este inventario, ej. "Ford A 1930"). */
export function nombreConAnio(vehiculo: Vehiculo): string {
  if (!vehiculo.anio) return vehiculo.nombre;
  if (vehiculo.nombre.includes(String(vehiculo.anio))) return vehiculo.nombre;
  return `${vehiculo.nombre} ${vehiculo.anio}`;
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
  decadas?: number[];
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
    if (filtros.decadas?.length && (v.decada === null || !filtros.decadas.includes(v.decada))) {
      return false;
    }
    return true;
  });
}

export function getDecadasDisponibles(): number[] {
  const decadas = new Set(
    VEHICULOS.map((v) => v.decada).filter((d): d is number => d !== null)
  );
  return [...decadas].sort((a, b) => a - b);
}

export function getTrabajosDeVehiculo(vehiculoId: string): Trabajo[] {
  return TRABAJOS.filter((t) => t.vehiculosIds.includes(vehiculoId));
}

export function getRelacionados(vehiculo: Vehiculo, cantidad = 3): Vehiculo[] {
  return getPorCategoria(vehiculo.categoria)
    .filter((v) => v.id !== vehiculo.id)
    .slice(0, cantidad);
}
