import { Link } from "react-router-dom";
import { Mail, MapPin } from "lucide-react";
import { SITE } from "../../config/site";
import { Container } from "../ui/Container";

const SECCIONES = [
  { to: "/catalogo", label: "Catálogo" },
  { to: "/nosotros", label: "Nosotros" },
  { to: "/trabajos", label: "Trabajos" },
  { to: "/faq", label: "FAQ" },
  { to: "/contacto", label: "Contacto" },
];

export function Footer() {
  return (
    <footer className="border-t border-borde bg-superficie">
      <Container className="grid gap-10 py-16 lg:grid-cols-3">
        <div className="flex flex-col gap-3">
          <span className="font-display text-2xl tracking-widest text-texto uppercase">
            {SITE.nombre}
          </span>
          <p className="max-w-xs text-sm text-texto-secundario">{SITE.tagline}</p>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-sm font-medium tracking-[0.2em] text-acento uppercase">
            Secciones
          </span>
          {SECCIONES.map((s) => (
            <Link
              key={s.to}
              to={s.to}
              className="text-sm text-texto-secundario transition-colors duration-200 hover:text-texto"
            >
              {s.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-sm font-medium tracking-[0.2em] text-acento uppercase">
            Contacto
          </span>
          <a
            href={`mailto:${SITE.email}`}
            className="flex items-center gap-2 text-sm text-texto-secundario transition-colors duration-200 hover:text-texto"
          >
            <Mail className="size-4" /> {SITE.email}
          </a>
          <span className="flex items-center gap-2 text-sm text-texto-secundario">
            <MapPin className="size-4" /> {SITE.direccion}
          </span>
          <div className="mt-2 flex items-center gap-4">
            {SITE.instagram && (
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-texto-secundario transition-colors duration-200 hover:text-texto"
              >
                Instagram
              </a>
            )}
            {SITE.facebook && (
              <a
                href={SITE.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-texto-secundario transition-colors duration-200 hover:text-texto"
              >
                Facebook
              </a>
            )}
          </div>
        </div>
      </Container>

      <div className="border-t border-borde py-6 text-center text-xs text-texto-secundario">
        © {new Date().getFullYear()} {SITE.nombre}. Todos los derechos reservados.
      </div>
    </footer>
  );
}
