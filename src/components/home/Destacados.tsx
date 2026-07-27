import { Container } from "../ui/Container";
import { SectionTitle } from "../ui/SectionTitle";
import { VehiculoCard } from "../vehiculos/VehiculoCard";
import { getDestacados } from "../../lib/vehiculos";

export function Destacados() {
  const destacados = getDestacados();
  if (destacados.length === 0) return null;

  return (
    <div className="bg-superficie py-20 lg:py-32">
      <Container>
        <SectionTitle
          eyebrow="Selección"
          title="Destacados"
          description="Una muestra de la flota, elegida para inspirar tu próximo evento."
        />
      </Container>
      <Container className="overflow-x-auto">
        <div className="flex gap-6 pb-4">
          {destacados.map((vehiculo) => (
            <VehiculoCard key={vehiculo.id} vehiculo={vehiculo} className="w-72 shrink-0" />
          ))}
        </div>
      </Container>
    </div>
  );
}
