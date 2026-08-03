import { Check } from "lucide-react";
import { Container } from "../components/ui/Container";
import { SectionTitle } from "../components/ui/SectionTitle";
import { ABOUT } from "../data/about";
import { VEHICULOS } from "../data/vehiculos";
import { TRABAJOS } from "../data/trabajos";
import { Seo } from "../lib/seo";

const ANIOS_TRAYECTORIA = new Date().getFullYear() - 1991;

const STATS = [
  { valor: `${ANIOS_TRAYECTORIA}+`, label: "Años de trayectoria" },
  { valor: `${VEHICULOS.length}`, label: "Vehículos en flota" },
  { valor: `${TRABAJOS.length}`, label: "Producciones documentadas" },
];

export function Nosotros() {
  return (
    <Container className="py-16 lg:py-20">
      <Seo
        title="Quiénes somos"
        description="Conocé la historia, la trayectoria y qué incluye el alquiler de nuestra flota de vehículos de colección."
        path="/nosotros"
      />
      <SectionTitle eyebrow="Nosotros" title="Quiénes somos" />

      <div className="grid grid-cols-1 gap-16 lg:grid-cols-[2fr_1fr]">
        <div className="flex flex-col gap-4">
          {ABOUT.historia.map((parrafo, i) => (
            <p key={i} className="text-texto-secundario">
              {parrafo}
            </p>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6 border-y border-borde py-8 lg:grid-cols-1 lg:border-0 lg:py-0">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1 text-center lg:items-start lg:text-left">
              <span className="font-display text-4xl text-acento">{stat.valor}</span>
              <span className="text-xs tracking-wide text-texto-secundario uppercase">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 lg:mt-24">
        <SectionTitle eyebrow="Servicio" title="Qué incluye el alquiler" />
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {ABOUT.incluye.map((item) => (
            <li key={item} className="flex items-start gap-3 text-texto-secundario">
              <Check className="mt-0.5 size-4 shrink-0 text-acento" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
