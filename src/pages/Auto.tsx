import { useState } from "react";
import type { ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { Calendar, Check, Palette, Plus, Share2, Users } from "lucide-react";
import { Container } from "../components/ui/Container";
import { Button } from "../components/ui/Button";
import { GaleriaVehiculo } from "../components/vehiculos/GaleriaVehiculo";
import { VehiculoCard } from "../components/vehiculos/VehiculoCard";
import { CATEGORIAS } from "../data/categorias";
import { EVENTOS } from "../data/eventos";
import { getPorId, getRelacionados, getTrabajosDeVehiculo, nombreConAnio } from "../lib/vehiculos";
import { useConsulta } from "../lib/consulta";
import { armarUrlWhatsapp, mensajeModelo, urlVehiculo } from "../lib/whatsapp";
import { Seo } from "../lib/seo";
import { trackEvent } from "../lib/analytics";
import { SITE } from "../config/site";
import type { Vehiculo } from "../types";

export function Auto() {
  const { id = "" } = useParams<{ id: string }>();
  const vehiculo = getPorId(id);

  if (!vehiculo) {
    return (
      <Container className="flex flex-col items-center gap-4 py-20 text-center lg:py-32">
        <span className="text-sm font-medium tracking-[0.2em] text-acento uppercase">Ups</span>
        <h1 className="font-display text-4xl tracking-wide text-texto uppercase">
          No encontramos ese vehículo
        </h1>
        <Button href="/catalogo">Volver al catálogo</Button>
      </Container>
    );
  }

  return <FichaVehiculo vehiculo={vehiculo} />;
}

function FichaVehiculo({ vehiculo }: { vehiculo: Vehiculo }) {
  const { estaEnConsulta, toggleConsulta } = useConsulta();
  const enConsulta = estaEnConsulta(vehiculo.id);
  const [copiado, setCopiado] = useState(false);

  const categoria = CATEGORIAS.find((c) => c.id === vehiculo.categoria);
  const trabajos = getTrabajosDeVehiculo(vehiculo.id);
  const relacionados = getRelacionados(vehiculo);
  const whatsappHref = armarUrlWhatsapp(mensajeModelo(vehiculo));

  async function compartir() {
    const url = urlVehiculo(vehiculo.id);
    if (navigator.share) {
      try {
        await navigator.share({ title: vehiculo.nombre, url });
      } catch {
        // el usuario cerró el diálogo de compartir, no hacer nada
      }
      return;
    }
    await navigator.clipboard.writeText(url);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  }

  return (
    <Container className="py-12 lg:py-16">
      <Seo
        title={nombreConAnio(vehiculo)}
        description={vehiculo.descripcionCorta}
        path={`/auto/${vehiculo.id}`}
        imagen={vehiculo.imagenes[0]}
        tipo="product"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: vehiculo.nombre,
          description: vehiculo.descripcionLarga,
          image: `${SITE.url}${vehiculo.imagenes[0]}`,
          category: categoria?.nombre,
          url: `${SITE.url}/auto/${vehiculo.id}`,
        }}
      />
      <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-texto-secundario">
        <Link to="/catalogo" className="hover:text-acento">
          Catálogo
        </Link>
        <span>/</span>
        {categoria && (
          <>
            <Link to={`/catalogo/${categoria.id}`} className="hover:text-acento">
              {categoria.nombre}
            </Link>
            <span>/</span>
          </>
        )}
        <span className="text-texto">{vehiculo.nombre}</span>
      </nav>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <GaleriaVehiculo imagenes={vehiculo.imagenes} nombre={vehiculo.nombre} />

        <div className="flex flex-col gap-6">
          <div>
            <div className="flex items-start justify-between gap-3">
              <h1 className="font-display text-3xl tracking-wide text-texto uppercase lg:text-4xl">
                {vehiculo.nombre}
              </h1>
              {vehiculo.anio && (
                <span className="shrink-0 text-lg text-acento">{vehiculo.anio}</span>
              )}
            </div>
            {categoria && (
              <span className="text-sm tracking-wide text-texto-secundario uppercase">
                {categoria.nombre}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 border-y border-borde py-6 sm:grid-cols-4">
            <FichaDato
              icon={<Users className="size-5" />}
              label="Capacidad"
              valor={`${vehiculo.capacidad} pas.`}
            />
            <FichaDato
              icon={<Palette className="size-5" />}
              label="Colores"
              valor={vehiculo.colores.join(", ")}
            />
            {vehiculo.decada !== null && (
              <FichaDato
                icon={<Calendar className="size-5" />}
                label="Década"
                valor={`${vehiculo.decada}s`}
              />
            )}
            <FichaDato
              icon={<Check className="size-5" />}
              label="Convertible"
              valor={vehiculo.convertible ? "Sí" : "No"}
            />
          </div>

          <p className="text-texto-secundario">{vehiculo.descripcionLarga}</p>

          {vehiculo.eventos.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {vehiculo.eventos.map((idEvento) => {
                const evento = EVENTOS.find((e) => e.id === idEvento);
                return evento ? (
                  <span
                    key={idEvento}
                    className="rounded-full border border-borde px-3 py-1 text-xs tracking-wide text-texto-secundario uppercase"
                  >
                    {evento.nombre}
                  </span>
                ) : null;
              })}
            </div>
          )}

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              variant="whatsapp"
              href={whatsappHref}
              external
              className="flex-1"
              onClick={() => trackEvent("whatsapp_modelo", { id: vehiculo.id })}
            >
              Consultar por WhatsApp
            </Button>
            <Button
              variant={enConsulta ? "outline" : "primary"}
              onClick={() => {
                if (!enConsulta) trackEvent("agregar_consulta", { id: vehiculo.id });
                toggleConsulta(vehiculo.id);
              }}
              className="flex-1"
            >
              {enConsulta ? <Check className="size-4" /> : <Plus className="size-4" />}
              {enConsulta ? "Agregado a consulta" : "Agregar a consulta"}
            </Button>
            <Button variant="outline" onClick={compartir}>
              <Share2 className="size-4" />
              {copiado ? "¡Copiado!" : "Compartir"}
            </Button>
          </div>
        </div>
      </div>

      {trabajos.length > 0 && (
        <div className="mt-16 lg:mt-24">
          <h2 className="mb-6 font-display text-2xl tracking-wide text-texto uppercase">
            Trabajos realizados con este vehículo
          </h2>
          <div className="flex gap-6 overflow-x-auto pb-2">
            {trabajos.map((trabajo) => (
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
        </div>
      )}

      {relacionados.length > 0 && (
        <div className="mt-16 lg:mt-24">
          <h2 className="mb-6 font-display text-2xl tracking-wide text-texto uppercase">
            Vehículos relacionados
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {relacionados.map((v) => (
              <VehiculoCard key={v.id} vehiculo={v} />
            ))}
          </div>
        </div>
      )}
    </Container>
  );
}

function FichaDato({ icon, label, valor }: { icon: ReactNode; label: string; valor: string }) {
  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <span className="text-acento">{icon}</span>
      <span className="text-sm text-texto">{valor}</span>
      <span className="text-xs tracking-wide text-texto-secundario uppercase">{label}</span>
    </div>
  );
}
