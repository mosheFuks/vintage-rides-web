export type CategoriaId =
  | "antiguos"
  | "clasicos"
  | "limousinas"
  | "modernos"
  | "lujo"
  | "clasicos-argentinos"
  | "motos"
  | "camionetas";

export type TipoEvento =
  | "casamiento"
  | "quince"
  | "cine"
  | "publicidad"
  | "turismo"
  | "aniversario"
  | "corporativo";

export interface Trabajo {
  id: string;
  titulo: string;
  tipo: TipoEvento;
  /** null cuando el año exacto no figura en la fuente original */
  anio: number | null;
  imagen: string;
  descripcion?: string;
  /** URL de referencia del sitio original, solo para trazabilidad interna */
  fuente?: string;
  vehiculosIds: string[];
}

export interface Vehiculo {
  id: string;
  nombre: string;
  /** null cuando el año no figura en el inventario original: se omite en la UI */
  anio: number | null;
  categoria: CategoriaId;
  /** Categorías adicionales donde también se lista este vehículo, sin duplicar la URL */
  tambienEn?: CategoriaId[];
  /** null cuando anio es null */
  decada: number | null;
  capacidad: number;
  convertible: boolean;
  colores: string[];
  eventos: TipoEvento[];
  descripcionCorta: string;
  descripcionLarga: string;
  imagenes: string[];
  destacado: boolean;
  nota?: string;
}

export interface Categoria {
  id: CategoriaId;
  nombre: string;
  descripcion: string;
  imagen: string;
  cantidad: number;
}
