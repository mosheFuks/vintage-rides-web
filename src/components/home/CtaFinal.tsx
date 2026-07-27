import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
import { SectionTitle } from "../ui/SectionTitle";
import { SITE } from "../../config/site";

const MENSAJE_GENERAL = "Hola! Quiero hacer una consulta sobre el alquiler de un vehículo para mi evento.";
const WHATSAPP_HREF = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(MENSAJE_GENERAL)}`;

export function CtaFinal() {
  return (
    <div className="bg-superficie">
      <Container className="flex flex-col items-center gap-6 py-20 text-center lg:py-32">
        <SectionTitle
          eyebrow="Reservá"
          title="Empezá a planear tu evento"
          description="Contanos qué necesitás y te ayudamos a elegir el vehículo justo para la ocasión."
          align="center"
        />
        <div className="flex flex-wrap justify-center gap-4">
          <Button href={WHATSAPP_HREF} external variant="whatsapp">
            Consultar por WhatsApp
          </Button>
          <Button href="/consulta" variant="outline">
            Armar consulta
          </Button>
        </div>
      </Container>
    </div>
  );
}
