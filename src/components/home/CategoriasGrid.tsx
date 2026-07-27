import { Link } from "react-router-dom";
import { Container } from "../ui/Container";
import { SectionTitle } from "../ui/SectionTitle";
import { CATEGORIAS } from "../../data/categorias";
import { VEHICULOS } from "../../data/vehiculos";

export function CategoriasGrid() {
  return (
    <Container className="py-20 lg:py-32">
      <SectionTitle
        eyebrow="Flota"
        title="Elegí tu categoría"
        description={`${VEHICULOS.length} vehículos organizados en ${CATEGORIAS.length} categorías, de autos antiguos a modelos modernos.`}
        align="center"
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIAS.map((categoria) => (
          <Link
            key={categoria.id}
            to={`/catalogo/${categoria.id}`}
            className="group relative flex aspect-[4/5] items-end overflow-hidden rounded-lg border border-borde bg-superficie"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-200 group-hover:scale-105"
              style={{ backgroundImage: `url(${categoria.imagen})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-fondo via-fondo/50 to-transparent" />
            <div className="relative flex flex-col gap-1 p-5">
              <span className="font-display text-xl tracking-wide text-texto uppercase">
                {categoria.nombre}
              </span>
              <span className="text-sm text-texto-secundario">
                {categoria.cantidad} vehículos
              </span>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
}
