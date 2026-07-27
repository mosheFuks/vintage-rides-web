import { Link } from "react-router-dom";
import { MessageCircle, ClipboardList } from "lucide-react";
import { SITE } from "../../config/site";

const MENSAJE_GENERAL = "Hola! Te quería hacer una consulta sobre el alquiler de autos.";
const WHATSAPP_HREF = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(MENSAJE_GENERAL)}`;

export function StickyBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex border-t border-borde bg-superficie lg:hidden">
      <a
        href={WHATSAPP_HREF}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 items-center justify-center gap-2 bg-whatsapp py-4 text-sm font-medium tracking-wide text-white uppercase transition-colors duration-200 hover:bg-whatsapp-hover"
      >
        <MessageCircle className="size-4" />
        Consultar
      </a>
      <Link
        to="/consulta"
        className="flex items-center justify-center gap-2 border-l border-borde px-5 text-sm font-medium tracking-wide text-texto uppercase transition-colors duration-200 hover:text-acento"
      >
        <ClipboardList className="size-4" />
      </Link>
    </div>
  );
}
