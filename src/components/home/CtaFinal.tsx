import { Button } from "../ui/Button";
import { Container } from "../ui/Container";
import { SectionTitle } from "../ui/SectionTitle";
import { armarUrlWhatsapp, mensajeGeneral } from "../../lib/whatsapp";
import { trackEvent } from "../../lib/analytics";

const WHATSAPP_HREF = armarUrlWhatsapp(mensajeGeneral());

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
          <Button
            href={WHATSAPP_HREF}
            external
            variant="whatsapp"
            onClick={() => trackEvent("whatsapp_general")}
          >
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
