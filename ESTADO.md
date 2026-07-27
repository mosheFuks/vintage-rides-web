# Estado del proyecto

> Este archivo lo actualiza Claude Code al final de cada fase.
> Es la memoria entre sesiones: si está bien escrito, no hace falta explorar el proyecto.

**Última fase completada:** 1 — Sistema de diseño + layout
**Próxima fase:** 2 — Modelo de datos
**Rama activa:** main (fases 0 y 1 ya mergeadas)

---

## Fases

| # | Fase | Estado | Rama | Mergeada |
|---|------|--------|------|----------|
| 0 | Scaffold + deploy | ✅ hecha | `feat/fase-0-scaffold` | sí |
| 1 | Sistema de diseño + layout | ✅ hecha | `feat/fase-1-diseno-layout` | sí |
| 2 | Modelo de datos | ⬜ pendiente | — | — |
| 3 | Home | ⬜ pendiente | — | — |
| 4 | Catálogo + buscador + filtros | ⬜ pendiente | — | — |
| 5 | Página de modelo | ⬜ pendiente | — | — |
| 6 | Motor de WhatsApp | ⬜ pendiente | — | — |
| 7 | About + trabajos | ⬜ pendiente | — | — |
| 8 | FAQ + contacto | ⬜ pendiente | — | — |
| 9 | SEO + performance + analytics | ⬜ pendiente | — | — |
| 10 | QA final | ⬜ pendiente | — | — |

---

## Componentes existentes

`Layout` — `src/components/layout/Layout.tsx` — envoltorio de página: Header + contenido + Footer + StickyBar
`Header` — `src/components/layout/Header.tsx` — nav sticky con logo y links, menú hamburguesa en mobile
`Footer` — `src/components/layout/Footer.tsx` — secciones, contacto y redes, todo desde `SITE`
`StickyBar` — `src/components/layout/StickyBar.tsx` — barra inferior fija solo mobile: WhatsApp + link a `/consulta`
`Button` — `src/components/ui/Button.tsx` — variantes: primary / outline / whatsapp; renderiza `<Link>`, `<a>` o `<button>` según props
`Container` — `src/components/ui/Container.tsx` — wrapper de ancho máximo (max-w-7xl) con padding horizontal
`SectionTitle` — `src/components/ui/SectionTitle.tsx` — eyebrow + título + descripción opcional, align left/center
`Placeholder` — `src/components/ui/Placeholder.tsx` — contenido temporal "Próximamente" usado por todas las páginas hasta que se implementen (Container + SectionTitle)

---

## Rutas implementadas

Definidas en `src/App.tsx` con `react-router-dom` (`BrowserRouter` en `src/main.tsx`). Todas renderizan `Placeholder` por ahora (sin contenido real todavía):

- `/` — Home
- `/catalogo` — Catálogo
- `/catalogo/:categoria` — Catálogo filtrado por categoría
- `/auto/:id` — Página de modelo
- `/nosotros` — Nosotros
- `/trabajos` — Trabajos
- `/faq` — FAQ
- `/contacto` — Contacto
- `/consulta` — Consulta
- `*` — NotFound

---

## Decisiones tomadas

- **Enrutamiento actual con `react-router-dom` + `BrowserRouter` puro, no con `vite-react-ssg`.** La librería `vite-react-ssg` está en `package.json` (fase 0) pero todavía no está conectada: `src/main.tsx` usa `createRoot` + `BrowserRouter` normal y `vite.config.ts` no tiene `ssgOptions`. Falta migrar el entry point para que el sitio se pre-renderice y pueda deployarse a GitHub Pages como estático. Pendiente para una fase posterior (probablemente antes de fase 9/10).
- **Stack de versiones (fase 0):** React 18.3, Tailwind v4.3 (vía `@tailwindcss/vite`, sin `tailwind.config.js` tradicional), Vite 8.1, TypeScript ~6.0, `react-router-dom` 6.30. Lint con `oxlint` en vez de ESLint.
- **StickyBar solo visible en mobile** (`lg:hidden`): en desktop la navegación de WhatsApp/consulta vive en el Header, no se duplica.

---

## Pendientes y deuda técnica

- Migrar `main.tsx`/`vite.config.ts` a `vite-react-ssg` para habilitar el pre-render y el deploy a GitHub Pages (mencionado en el plan pero no ejecutado aún).
- Todas las páginas (`Home`, `Catalogo`, `Auto`, `Nosotros`, `Trabajos`, `Faq`, `Contacto`, `Consulta`, `NotFound`) son placeholders sin contenido real.
