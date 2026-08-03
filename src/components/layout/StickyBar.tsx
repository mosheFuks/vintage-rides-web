import { Link } from "react-router-dom";
import { MessageCircle, ClipboardList } from "lucide-react";
import { useConsulta } from "../../lib/consulta";
import { armarUrlWhatsapp, mensajeGeneral } from "../../lib/whatsapp";
import { trackEvent } from "../../lib/analytics";

const WHATSAPP_HREF = armarUrlWhatsapp(mensajeGeneral());

export function StickyBar() {
  const { ids } = useConsulta();

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex border-t border-borde bg-superficie lg:hidden">
      <a
        href={WHATSAPP_HREF}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent("whatsapp_general")}
        className="flex flex-1 items-center justify-center gap-2 bg-whatsapp py-4 text-sm font-medium tracking-wide text-white uppercase transition-colors duration-200 hover:bg-whatsapp-hover"
      >
        <MessageCircle className="size-4" />
        Consultar
      </a>
      <Link
        to="/consulta"
        className="relative flex items-center justify-center gap-2 border-l border-borde px-5 text-sm font-medium tracking-wide text-texto uppercase transition-colors duration-200 hover:text-acento"
      >
        <ClipboardList className="size-4" />
        {ids.length > 0 && (
          <span className="absolute top-2 right-3 flex size-4 items-center justify-center rounded-full bg-acento text-[10px] text-fondo">
            {ids.length}
          </span>
        )}
      </Link>
    </div>
  );
}
