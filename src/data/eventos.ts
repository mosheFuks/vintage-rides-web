import type { TipoEvento } from "../types";

export const EVENTOS: { id: TipoEvento; nombre: string }[] = [
  { id: "casamiento", nombre: "Casamientos" },
  { id: "quince", nombre: "Fiestas de 15" },
  { id: "cine", nombre: "Cine y TV" },
  { id: "publicidad", nombre: "Publicidad" },
  { id: "turismo", nombre: "Turismo" },
  { id: "aniversario", nombre: "Aniversarios" },
  { id: "corporativo", nombre: "Eventos corporativos" },
];
