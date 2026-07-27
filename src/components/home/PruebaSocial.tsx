import { Link } from "react-router-dom";
import { Container } from "../ui/Container";
import { SectionTitle } from "../ui/SectionTitle";
import { VEHICULOS } from "../../data/vehiculos";
import { CATEGORIAS } from "../../data/categorias";
import { TRABAJOS } from "../../data/trabajos";

const ANIOS_TRAYECTORIA = new Date().getFullYear() - 1991;

const STATS = [
  { valor: `${ANIOS_TRAYECTORIA}+`, label: "Años de trayectoria" },
  { valor: `${VEHICULOS.length}`, label: "Vehículos en flota" },
  { valor: `${CATEGORIAS.length}`, label: "Categorías" },
];

export function PruebaSocial() {
  return (
    <Container className="py-20 lg:py-32">
      <SectionTitle
        eyebrow="Trayectoria"
        title="Vehículos de colección desde 1991"
        align="center"
      />

      <div className="grid grid-cols-1 gap-8 border-y border-borde py-10 sm:grid-cols-3">
        {STATS.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-2 text-center">
            <span className="font-display text-5xl text-acento">{stat.valor}</span>
            <span className="text-sm tracking-wide text-texto-secundario uppercase">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-14 flex gap-6 overflow-x-auto pb-2">
        {TRABAJOS.map((trabajo) => (
          <Link
            key={trabajo.id}
            to="/trabajos"
            className="group relative flex aspect-video w-72 shrink-0 items-end overflow-hidden rounded-lg border border-borde bg-superficie"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-200 group-hover:scale-105"
              style={{ backgroundImage: `url(${trabajo.imagen})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-fondo via-fondo/40 to-transparent" />
            <span className="relative p-4 text-sm font-medium tracking-wide text-texto uppercase">
              {trabajo.titulo}
            </span>
          </Link>
        ))}
      </div>
    </Container>
  );
}
