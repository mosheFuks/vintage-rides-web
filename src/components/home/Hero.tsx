import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
import { SITE } from "../../config/site";
import { VEHICULOS } from "../../data/vehiculos";
import { CATEGORIAS } from "../../data/categorias";

const MENSAJE_GENERAL = "Hola! Quiero hacer una consulta sobre el alquiler de un vehículo para mi evento.";
const WHATSAPP_HREF = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(MENSAJE_GENERAL)}`;

export function Hero() {
  return (
    <section
      className="relative flex h-[85vh] min-h-[560px] w-full items-end bg-superficie bg-cover bg-center"
      style={{ backgroundImage: "url(/img/hero/home.jpg)" }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-fondo via-fondo/60 to-fondo/10" />
      <Container className="relative pb-16 lg:pb-24">
        <span className="text-sm font-medium tracking-[0.2em] text-acento uppercase">
          Desde 1991
        </span>
        <h1 className="mt-4 max-w-3xl font-display text-5xl tracking-wide text-texto uppercase lg:text-7xl">
          {SITE.tagline}
        </h1>
        <p className="mt-4 max-w-xl text-texto-secundario">
          {VEHICULOS.length} vehículos de colección en {CATEGORIAS.length} categorías, con
          traslado y chofer para cada evento.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button href="/catalogo">Ver catálogo</Button>
          <Button href={WHATSAPP_HREF} external variant="whatsapp">
            Consultar por WhatsApp
          </Button>
        </div>
      </Container>
    </section>
  );
}
