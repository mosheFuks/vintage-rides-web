import { useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, X } from "lucide-react";
import { Container } from "../components/ui/Container";
import { SectionTitle } from "../components/ui/SectionTitle";
import { Button } from "../components/ui/Button";
import { getPorId } from "../lib/vehiculos";
import { useConsulta } from "../lib/consulta";
import { armarUrlWhatsapp, mensajeConsultaMultiple } from "../lib/whatsapp";
import { Seo } from "../lib/seo";
import { trackEvent } from "../lib/analytics";
import { EVENTOS } from "../data/eventos";
import type { TipoEvento, Vehiculo } from "../types";

const inputClass =
  "rounded-lg border border-borde bg-fondo px-3 py-2 text-sm text-texto placeholder:text-texto-secundario focus:border-acento focus:outline-none";

export function Consulta() {
  const { ids, quitarDeConsulta, vaciarConsulta } = useConsulta();
  const vehiculos = ids
    .map((id) => getPorId(id))
    .filter((v): v is Vehiculo => v !== undefined);

  const [fecha, setFecha] = useState("");
  const [zona, setZona] = useState("");
  const [evento, setEvento] = useState<TipoEvento | "">("");
  const [duracionHoras, setDuracionHoras] = useState("");
  const [comentario, setComentario] = useState("");

  const whatsappHref = armarUrlWhatsapp(
    mensajeConsultaMultiple(vehiculos, {
      fecha: fecha || undefined,
      zona: zona || undefined,
      evento: evento || undefined,
      duracionHoras: duracionHoras || undefined,
      comentario: comentario || undefined,
    })
  );

  if (vehiculos.length === 0) {
    return (
      <Container className="flex flex-col items-center gap-4 py-20 text-center lg:py-32">
        <Seo
          title="Mi consulta"
          description="Armá una consulta con varios vehículos para preguntar disponibilidad por WhatsApp."
          path="/consulta"
          noindex
        />
        <SectionTitle
          eyebrow="Mi consulta"
          title="Todavía no agregaste vehículos"
          description="Sumá modelos desde el catálogo para consultar por varios a la vez."
          align="center"
        />
        <Button href="/catalogo">Ver catálogo</Button>
      </Container>
    );
  }

  return (
    <Container className="py-12 lg:py-16">
      <Seo
        title="Mi consulta"
        description="Armá una consulta con varios vehículos para preguntar disponibilidad por WhatsApp."
        path="/consulta"
        noindex
      />
      <SectionTitle
        eyebrow="Mi consulta"
        title="Consulta múltiple"
        description={`${vehiculos.length} vehículo${vehiculos.length === 1 ? "" : "s"} seleccionado${
          vehiculos.length === 1 ? "" : "s"
        }`}
      />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          {vehiculos.map((vehiculo) => (
            <div
              key={vehiculo.id}
              className="flex items-center gap-4 rounded-lg border border-borde bg-superficie p-4"
            >
              <Link to={`/auto/${vehiculo.id}`} className="size-16 shrink-0 overflow-hidden rounded-md">
                <div
                  className="h-full w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${vehiculo.imagenes[0]})` }}
                />
              </Link>
              <div className="flex-1">
                <Link
                  to={`/auto/${vehiculo.id}`}
                  className="font-display text-lg tracking-wide text-texto uppercase transition-colors duration-200 hover:text-acento"
                >
                  {vehiculo.nombre}
                </Link>
                {vehiculo.anio && <p className="text-sm text-texto-secundario">{vehiculo.anio}</p>}
              </div>
              <button
                type="button"
                onClick={() => quitarDeConsulta(vehiculo.id)}
                aria-label={`Quitar ${vehiculo.nombre} de la consulta`}
                className="text-texto-secundario transition-colors duration-200 hover:text-texto"
              >
                <X className="size-5" />
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={vaciarConsulta}
            className="flex items-center gap-2 self-start text-sm text-texto-secundario transition-colors duration-200 hover:text-texto"
          >
            <Trash2 className="size-4" />
            Vaciar consulta
          </button>
        </div>

        <div className="flex flex-col gap-4 rounded-lg border border-borde bg-superficie p-6">
          <p className="text-sm text-texto-secundario">
            Contanos más sobre tu evento (opcional) para que la respuesta sea más rápida.
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1 text-sm text-texto-secundario">
              Fecha del evento
              <input
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                className={inputClass}
              />
            </label>
            <label className="flex flex-col gap-1 text-sm text-texto-secundario">
              Zona
              <input
                type="text"
                value={zona}
                onChange={(e) => setZona(e.target.value)}
                placeholder="Ej: CABA, Zona Norte..."
                className={inputClass}
              />
            </label>
            <label className="flex flex-col gap-1 text-sm text-texto-secundario">
              Tipo de evento
              <select
                value={evento}
                onChange={(e) => setEvento(e.target.value as TipoEvento | "")}
                className={inputClass}
              >
                <option value="">Sin especificar</option>
                {EVENTOS.map((ev) => (
                  <option key={ev.id} value={ev.id}>
                    {ev.nombre}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-1 text-sm text-texto-secundario">
              Duración estimada (hs)
              <input
                type="number"
                min={1}
                value={duracionHoras}
                onChange={(e) => setDuracionHoras(e.target.value)}
                className={inputClass}
              />
            </label>
          </div>

          <label className="flex flex-col gap-1 text-sm text-texto-secundario">
            Comentario
            <textarea
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              rows={3}
              placeholder="Contanos cualquier detalle extra..."
              className={`resize-none ${inputClass}`}
            />
          </label>

          <Button
            variant="whatsapp"
            href={whatsappHref}
            external
            className="mt-2 w-full"
            onClick={() => trackEvent("whatsapp_multiple", { cantidad: vehiculos.length })}
          >
            Enviar por WhatsApp
          </Button>
        </div>
      </div>
    </Container>
  );
}
