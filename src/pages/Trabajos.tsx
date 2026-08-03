import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Container } from "../components/ui/Container";
import { SectionTitle } from "../components/ui/SectionTitle";
import { VehiculoCard } from "../components/vehiculos/VehiculoCard";
import { TRABAJOS } from "../data/trabajos";
import { EVENTOS } from "../data/eventos";
import { getPorId } from "../lib/vehiculos";
import type { Trabajo, TipoEvento } from "../types";

const tiposDisponibles = [...new Set(TRABAJOS.map((t) => t.tipo))];
const aniosDisponibles = [...new Set(TRABAJOS.map((t) => t.anio).filter((a): a is number => a !== null))].sort(
  (a, b) => b - a
);

function nombreTipo(tipo: TipoEvento): string {
  return EVENTOS.find((e) => e.id === tipo)?.nombre ?? tipo;
}

export function Trabajos() {
  const [tipoFiltro, setTipoFiltro] = useState<TipoEvento | "todos">("todos");
  const [anioFiltro, setAnioFiltro] = useState<number | "todos">("todos");
  const [seleccionado, setSeleccionado] = useState<Trabajo | null>(null);

  useEffect(() => {
    if (!seleccionado) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setSeleccionado(null);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [seleccionado]);

  const filtrados = TRABAJOS.filter((t) => {
    if (tipoFiltro !== "todos" && t.tipo !== tipoFiltro) return false;
    if (anioFiltro !== "todos" && t.anio !== anioFiltro) return false;
    return true;
  });

  return (
    <Container className="py-16 lg:py-20">
      <SectionTitle
        eyebrow="Producciones"
        title="Trabajos realizados"
        description="Cine, publicidad, turismo y eventos donde estuvo presente la flota."
      />

      <div className="mb-8 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setTipoFiltro("todos")}
          className={`rounded-full border px-4 py-1.5 text-xs tracking-wide uppercase transition-colors duration-200 ${
            tipoFiltro === "todos"
              ? "border-acento bg-acento/10 text-acento"
              : "border-borde text-texto-secundario hover:border-acento"
          }`}
        >
          Todos
        </button>
        {tiposDisponibles.map((tipo) => (
          <button
            key={tipo}
            type="button"
            onClick={() => setTipoFiltro(tipo)}
            className={`rounded-full border px-4 py-1.5 text-xs tracking-wide uppercase transition-colors duration-200 ${
              tipoFiltro === tipo
                ? "border-acento bg-acento/10 text-acento"
                : "border-borde text-texto-secundario hover:border-acento"
            }`}
          >
            {nombreTipo(tipo)}
          </button>
        ))}

        {aniosDisponibles.length > 0 && (
          <select
            value={anioFiltro}
            onChange={(e) => setAnioFiltro(e.target.value === "todos" ? "todos" : Number(e.target.value))}
            className="rounded-full border border-borde bg-fondo px-4 py-1.5 text-xs tracking-wide text-texto-secundario uppercase focus:border-acento focus:outline-none"
          >
            <option value="todos">Todos los años</option>
            {aniosDisponibles.map((anio) => (
              <option key={anio} value={anio}>
                {anio}
              </option>
            ))}
          </select>
        )}
      </div>

      {filtrados.length === 0 ? (
        <p className="py-20 text-center text-texto-secundario">No hay trabajos con ese filtro.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtrados.map((trabajo) => (
            <button
              key={trabajo.id}
              type="button"
              onClick={() => setSeleccionado(trabajo)}
              className="group relative flex aspect-video items-end overflow-hidden rounded-lg border border-borde bg-superficie text-left"
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-200 group-hover:scale-105"
                style={{ backgroundImage: `url(${trabajo.imagen})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-fondo via-fondo/50 to-transparent" />
              <div className="relative flex flex-col gap-1 p-4">
                <span className="text-xs tracking-wide text-acento uppercase">{nombreTipo(trabajo.tipo)}</span>
                <span className="text-sm font-medium tracking-wide text-texto uppercase">{trabajo.titulo}</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {seleccionado && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-fondo/90 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSeleccionado(null);
          }}
        >
          <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-y-auto rounded-lg border border-borde bg-superficie">
            <div className="relative aspect-video w-full shrink-0 bg-fondo">
              <div
                className="h-full w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${seleccionado.imagen})` }}
              />
              <button
                type="button"
                onClick={() => setSeleccionado(null)}
                aria-label="Cerrar"
                className="absolute top-3 right-3 flex size-9 items-center justify-center rounded-full bg-fondo/80 text-texto"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="flex flex-col gap-4 p-6">
              <div>
                <span className="text-xs tracking-wide text-acento uppercase">
                  {nombreTipo(seleccionado.tipo)}
                  {seleccionado.anio ? ` · ${seleccionado.anio}` : ""}
                </span>
                <h2 className="font-display text-2xl tracking-wide text-texto uppercase">{seleccionado.titulo}</h2>
              </div>

              {seleccionado.descripcion && (
                <p className="text-texto-secundario">{seleccionado.descripcion}</p>
              )}

              {seleccionado.vehiculosIds.length > 0 && (
                <div>
                  <span className="mb-3 block text-sm font-medium tracking-wide text-texto uppercase">
                    Vehículos usados
                  </span>
                  <div className="flex gap-4 overflow-x-auto pb-2">
                    {seleccionado.vehiculosIds
                      .map((id) => getPorId(id))
                      .filter((v) => v !== undefined)
                      .map((vehiculo) => (
                        <VehiculoCard key={vehiculo.id} vehiculo={vehiculo} className="w-56 shrink-0" />
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}
