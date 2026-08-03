import { Clock, Mail, MapPin } from "lucide-react";
import { Container } from "../components/ui/Container";
import { SectionTitle } from "../components/ui/SectionTitle";
import { Button } from "../components/ui/Button";
import { SITE } from "../config/site";
import { armarUrlWhatsapp, mensajeGeneral } from "../lib/whatsapp";
import { Seo } from "../lib/seo";
import { trackEvent } from "../lib/analytics";

const WHATSAPP_HREF = armarUrlWhatsapp(mensajeGeneral());

export function Contacto() {
  return (
    <Container className="py-16 lg:py-20">
      <Seo
        title="Contacto"
        description={`Escribinos por WhatsApp o visitanos en ${SITE.direccion}. Horario de atención: ${SITE.horarios}.`}
        path="/contacto"
      />
      <SectionTitle
        eyebrow="Contacto"
        title="Hablemos de tu evento"
        description="Escribinos por WhatsApp o pasá a visitarnos, con estos datos nos ubicás."
      />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 rounded-lg border border-borde bg-superficie p-6">
            <a
              href={`mailto:${SITE.email}`}
              className="flex items-center gap-3 text-texto-secundario transition-colors duration-200 hover:text-texto"
            >
              <Mail className="size-5 shrink-0 text-acento" />
              {SITE.email}
            </a>
            <span className="flex items-center gap-3 text-texto-secundario">
              <MapPin className="size-5 shrink-0 text-acento" />
              {SITE.direccion}
            </span>
            <span className="flex items-center gap-3 text-texto-secundario">
              <Clock className="size-5 shrink-0 text-acento" />
              {SITE.horarios}
            </span>
          </div>

          <Button
            variant="whatsapp"
            href={WHATSAPP_HREF}
            external
            className="w-full sm:w-fit"
            onClick={() => trackEvent("whatsapp_general")}
          >
            Consultar por WhatsApp
          </Button>
        </div>

        <div className="aspect-video w-full overflow-hidden rounded-lg border border-borde">
          <iframe
            title={`Ubicación de ${SITE.nombre}`}
            src={`https://www.google.com/maps?q=${encodeURIComponent(SITE.direccion)}&output=embed`}
            className="h-full w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </Container>
  );
}
