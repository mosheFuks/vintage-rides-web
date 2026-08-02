import { Link } from "react-router-dom";
import { Users, Check, Plus } from "lucide-react";
import type { Vehiculo } from "../../types";
import { useConsulta } from "../../lib/consulta";

interface VehiculoCardProps {
  vehiculo: Vehiculo;
  /** Muestra la fila de acciones (Ver más / Agregar a consulta) usada en el catálogo. */
  mostrarAcciones?: boolean;
  className?: string;
}

export function VehiculoCard({ vehiculo, mostrarAcciones = false, className = "" }: VehiculoCardProps) {
  const { estaEnConsulta, toggleConsulta } = useConsulta();
  const enConsulta = estaEnConsulta(vehiculo.id);

  return (
    <div
      className={`group flex flex-col overflow-hidden rounded-lg border border-borde bg-superficie transition-colors duration-200 hover:border-acento ${className}`}
    >
      <Link to={`/auto/${vehiculo.id}`} className="contents">
        <div className="aspect-[4/3] w-full overflow-hidden bg-superficie">
          <div
            className="h-full w-full bg-cover bg-center transition-transform duration-200 group-hover:scale-105"
            style={{ backgroundImage: `url(${vehiculo.imagenes[0]})` }}
          />
        </div>
        <div className="flex flex-1 flex-col gap-2 p-5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display text-xl tracking-wide text-texto uppercase">
              {vehiculo.nombre}
            </h3>
            {vehiculo.anio && (
              <span className="shrink-0 text-sm text-acento">{vehiculo.anio}</span>
            )}
          </div>
          <p className="line-clamp-2 text-sm text-texto-secundario">{vehiculo.descripcionCorta}</p>
          <span className="mt-auto flex items-center gap-2 text-xs text-texto-secundario">
            <Users className="size-4" /> {vehiculo.capacidad} pasajeros
          </span>
        </div>
      </Link>

      {mostrarAcciones && (
        <div className="flex gap-2 border-t border-borde p-5 pt-4">
          <Link
            to={`/auto/${vehiculo.id}`}
            className="flex flex-1 items-center justify-center rounded-lg border border-acento px-3 py-2 text-xs font-medium tracking-wide text-acento uppercase transition-colors duration-200 hover:bg-acento/10"
          >
            Ver más
          </Link>
          <button
            type="button"
            onClick={() => toggleConsulta(vehiculo.id)}
            className={`flex flex-1 items-center justify-center gap-1 rounded-lg px-3 py-2 text-xs font-medium tracking-wide uppercase transition-colors duration-200 ${
              enConsulta
                ? "bg-acento/10 text-acento"
                : "bg-acento text-fondo hover:bg-acento-hover"
            }`}
          >
            {enConsulta ? <Check className="size-4" /> : <Plus className="size-4" />}
            {enConsulta ? "Agregado" : "Agregar"}
          </button>
        </div>
      )}
    </div>
  );
}
