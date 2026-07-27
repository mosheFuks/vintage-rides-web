import { Link } from "react-router-dom";
import { Users } from "lucide-react";
import type { Vehiculo } from "../../types";

interface VehiculoCardProps {
  vehiculo: Vehiculo;
}

export function VehiculoCard({ vehiculo }: VehiculoCardProps) {
  return (
    <Link
      to={`/auto/${vehiculo.id}`}
      className="group flex w-72 shrink-0 flex-col overflow-hidden rounded-lg border border-borde bg-superficie transition-colors duration-200 hover:border-acento"
    >
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
  );
}
