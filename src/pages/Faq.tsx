import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Container } from "../components/ui/Container";
import { SectionTitle } from "../components/ui/SectionTitle";
import { FAQS } from "../data/faq";

export function Faq() {
  const [abierta, setAbierta] = useState<number | null>(0);

  return (
    <Container className="py-16 lg:py-20">
      <SectionTitle eyebrow="Ayuda" title="Preguntas frecuentes" />

      <div className="mx-auto flex max-w-3xl flex-col divide-y divide-borde border-y border-borde">
        {FAQS.map((faq, i) => {
          const estaAbierta = abierta === i;
          return (
            <div key={faq.pregunta}>
              <button
                type="button"
                onClick={() => setAbierta(estaAbierta ? null : i)}
                aria-expanded={estaAbierta}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span className="font-display text-lg tracking-wide text-texto uppercase">
                  {faq.pregunta}
                </span>
                <ChevronDown
                  className={`size-5 shrink-0 text-acento transition-transform duration-200 ${
                    estaAbierta ? "rotate-180" : ""
                  }`}
                />
              </button>
              {estaAbierta && <p className="pb-5 text-texto-secundario">{faq.respuesta}</p>}
            </div>
          );
        })}
      </div>
    </Container>
  );
}
