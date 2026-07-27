import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { SITE } from "../../config/site";

const NAV_LINKS = [
  { to: "/catalogo", label: "Catálogo" },
  { to: "/nosotros", label: "Nosotros" },
  { to: "/trabajos", label: "Trabajos" },
  { to: "/faq", label: "FAQ" },
  { to: "/contacto", label: "Contacto" },
];

export function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm tracking-wide uppercase transition-colors duration-200 ${
      isActive ? "text-acento" : "text-texto-secundario hover:text-texto"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-borde bg-fondo/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
        <Link
          to="/"
          className="font-display text-2xl tracking-widest text-texto uppercase"
          onClick={() => setMenuAbierto(false)}
        >
          {SITE.nombre}
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className="text-texto lg:hidden"
          aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setMenuAbierto((abierto) => !abierto)}
        >
          {menuAbierto ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {menuAbierto && (
        <nav className="flex flex-col gap-4 border-t border-borde px-6 py-6 lg:hidden">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={linkClass}
              onClick={() => setMenuAbierto(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
