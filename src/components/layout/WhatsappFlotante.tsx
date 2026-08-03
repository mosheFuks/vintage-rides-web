import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";
import { armarUrlWhatsapp, mensajeGeneral } from "../../lib/whatsapp";

export function WhatsappFlotante() {
  const [abierto, setAbierto] = useState(false);
  const [mensaje, setMensaje] = useState(mensajeGeneral());
  const popoverRef = useRef<HTMLDivElement>(null);
  const mensajeVacio = mensaje.trim().length === 0;

  useEffect(() => {
    if (!abierto) return;
    function onPointerDown(e: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setAbierto(false);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setAbierto(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [abierto]);

  return (
    <div ref={popoverRef} className="fixed right-6 bottom-6 z-40 hidden lg:block">
      {abierto && (
        <div className="absolute right-0 bottom-full mb-3 w-80 rounded-lg border-2 border-whatsapp bg-white p-4 shadow-xl">
          <div className="mb-3 flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm font-semibold tracking-wide text-whatsapp uppercase">
              <MessageCircle className="size-4" />
              WhatsApp
            </span>
            <button
              type="button"
              onClick={() => setAbierto(false)}
              aria-label="Cerrar"
              className="text-whatsapp"
            >
              <X className="size-4" />
            </button>
          </div>

          <textarea
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            rows={4}
            className="w-full resize-none rounded-md border border-whatsapp/40 bg-white p-2 text-sm text-neutral-800 focus:border-whatsapp focus:outline-none"
          />

          <a
            href={mensajeVacio ? undefined : armarUrlWhatsapp(mensaje)}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={mensajeVacio}
            onClick={(e) => {
              if (mensajeVacio) {
                e.preventDefault();
                return;
              }
              setAbierto(false);
            }}
            className={`mt-3 flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium tracking-wide uppercase transition-colors duration-200 ${
              mensajeVacio
                ? "cursor-not-allowed bg-whatsapp/40 text-white/70"
                : "bg-whatsapp text-white hover:bg-whatsapp-hover"
            }`}
          >
            <Send className="size-4" />
            Enviar
          </a>
        </div>
      )}

      <button
        type="button"
        onClick={() => setAbierto((a) => !a)}
        aria-label="Consultar por WhatsApp"
        aria-expanded={abierto}
        className="flex size-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg transition-colors duration-200 hover:bg-whatsapp-hover"
      >
        <MessageCircle className="size-6" />
      </button>
    </div>
  );
}
