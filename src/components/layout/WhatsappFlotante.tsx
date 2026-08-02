import { MessageCircle } from "lucide-react";
import { armarUrlWhatsapp, mensajeGeneral } from "../../lib/whatsapp";

const WHATSAPP_HREF = armarUrlWhatsapp(mensajeGeneral());

export function WhatsappFlotante() {
  return (
    <a
      href={WHATSAPP_HREF}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Consultar por WhatsApp"
      className="fixed right-6 bottom-6 z-40 hidden size-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg transition-colors duration-200 hover:bg-whatsapp-hover lg:flex"
    >
      <MessageCircle className="size-6" />
    </a>
  );
}
