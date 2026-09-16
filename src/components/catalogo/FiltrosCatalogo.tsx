import type { ReactNode } from "react";
import type { CategoriaId } from "../../types";
import { CATEGORIAS } from "../../data/categorias";

interface FiltrosCatalogoProps {
  categorias: CategoriaId[];
  onToggleCategoria: (id: CategoriaId) => void;
  decadas: number[];
  decadasDisponibles: number[];
  onToggleDecada: (decada: number) => void;
  hayFiltrosActivos: boolean;
  onLimpiar: () => void;
}

function GrupoFiltro({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3 border-b border-borde pb-6 last:border-b-0 last:pb-0">
      <span className="text-sm font-medium tracking-wide text-texto uppercase">{titulo}</span>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

function Checkbox({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-sm text-texto-secundario transition-colors duration-200 hover:text-texto">
      <input type="checkbox" checked={checked} onChange={onChange} className="accent-acento" />
      {label}
    </label>
  );
}

export function FiltrosCatalogo(props: FiltrosCatalogoProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <span className="font-display text-lg tracking-wide text-texto uppercase">Filtros</span>
        {props.hayFiltrosActivos && (
          <button
            type="button"
            onClick={props.onLimpiar}
            className="text-xs font-medium tracking-wide text-acento uppercase hover:underline"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      <GrupoFiltro titulo="Categoría">
        {CATEGORIAS.map((categoria) => (
          <Checkbox
            key={categoria.id}
            checked={props.categorias.includes(categoria.id)}
            onChange={() => props.onToggleCategoria(categoria.id)}
            label={categoria.nombre}
          />
        ))}
      </GrupoFiltro>

      <GrupoFiltro titulo="Década">
        {props.decadasDisponibles.map((decada) => (
          <Checkbox
            key={decada}
            checked={props.decadas.includes(decada)}
            onChange={() => props.onToggleDecada(decada)}
            label={`${decada}s`}
          />
        ))}
      </GrupoFiltro>
    </div>
  );
}
