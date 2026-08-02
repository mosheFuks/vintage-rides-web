import { useEffect, useRef, useState } from "react";
import type { TouchEvent } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface GaleriaVehiculoProps {
  imagenes: string[];
  nombre: string;
}

export function GaleriaVehiculo({ imagenes, nombre }: GaleriaVehiculoProps) {
  const [indice, setIndice] = useState(0);
  const [lightboxAbierto, setLightboxAbierto] = useState(false);
  const total = imagenes.length;
  const touchStartX = useRef<number | null>(null);

  function anterior() {
    setIndice((i) => (i - 1 + total) % total);
  }

  function siguiente() {
    setIndice((i) => (i + 1) % total);
  }

  useEffect(() => {
    if (!lightboxAbierto) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setLightboxAbierto(false);
      else if (e.key === "ArrowLeft") anterior();
      else if (e.key === "ArrowRight") siguiente();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxAbierto]);

  function onTouchStart(e: TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function onTouchEnd(e: TouchEvent) {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) {
      if (delta > 0) anterior();
      else siguiente();
    }
    touchStartX.current = null;
  }

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={() => setLightboxAbierto(true)}
        className="group relative block aspect-[4/3] w-full overflow-hidden rounded-lg bg-superficie"
      >
        <div
          className="h-full w-full bg-cover bg-center transition-transform duration-200 group-hover:scale-105"
          style={{ backgroundImage: `url(${imagenes[indice]})` }}
        />
        {total > 1 && (
          <span className="absolute right-3 bottom-3 rounded-full bg-fondo/80 px-3 py-1 text-xs text-texto">
            {indice + 1} / {total}
          </span>
        )}
      </button>

      {total > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {imagenes.map((imagen, i) => (
            <button
              key={imagen}
              type="button"
              onClick={() => setIndice(i)}
              className={`size-16 shrink-0 overflow-hidden rounded-md border transition-colors duration-200 ${
                i === indice ? "border-acento" : "border-borde"
              }`}
            >
              <div
                className="h-full w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${imagen})` }}
              />
            </button>
          ))}
        </div>
      )}

      {lightboxAbierto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-fondo/95 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) setLightboxAbierto(false);
          }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <button
            type="button"
            onClick={() => setLightboxAbierto(false)}
            aria-label="Cerrar galería"
            className="absolute top-4 right-4 text-texto"
          >
            <X className="size-8" />
          </button>

          {total > 1 && (
            <button
              type="button"
              onClick={anterior}
              aria-label="Foto anterior"
              className="absolute left-2 text-texto sm:left-6"
            >
              <ChevronLeft className="size-10" />
            </button>
          )}

          <div
            className="aspect-[4/3] w-full max-w-4xl bg-cover bg-center"
            style={{ backgroundImage: `url(${imagenes[indice]})` }}
            role="img"
            aria-label={`${nombre} - foto ${indice + 1} de ${total}`}
          />

          {total > 1 && (
            <button
              type="button"
              onClick={siguiente}
              aria-label="Foto siguiente"
              className="absolute right-2 text-texto sm:right-6"
            >
              <ChevronRight className="size-10" />
            </button>
          )}

          {total > 1 && (
            <span className="absolute bottom-6 text-sm text-texto-secundario">
              {indice + 1} / {total}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
