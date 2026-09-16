// Preguntas y respuestas placeholder, editables: contenido de política/servicio, no dato de vehículo. Validar con el cliente.
export interface Faq {
  pregunta: string;
  respuesta: string;
}

export const FAQS: Faq[] = [
  {
    pregunta: "¿Incluye chofer?",
    respuesta:
      "Sí, todos los alquileres incluyen chofer con experiencia en autos de época. No entregamos los vehículos sin chofer.",
  },
  {
    pregunta: "¿Cuál es el mínimo de horas de contratación?",
    respuesta:
      "El mínimo depende del vehículo y el tipo de evento. Escribinos por WhatsApp contándonos tu evento y te confirmamos disponibilidad y duración mínima.",
  },
  {
    pregunta: "¿Qué zonas cubren? ¿Hay recargo por distancia?",
    respuesta:
      "Cubrimos CABA y GBA. Para zonas más alejadas puede aplicar un recargo por traslado, te lo confirmamos al cotizar.",
  },
  {
    pregunta: "¿Cómo se reserva? ¿Se pide seña?",
    respuesta:
      "La reserva se confirma con una seña. Coordinamos el monto y la forma de pago por WhatsApp una vez definidos el vehículo y la fecha.",
  },
];
