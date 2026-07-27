# Estado del proyecto

> Este archivo lo actualiza Claude Code al final de cada fase.
> Es la memoria entre sesiones: si está bien escrito, no hace falta explorar el proyecto.

**Última fase completada:** 2 — Modelo de datos
**Próxima fase:** 3 — Home
**Rama activa:** `feat/fase-2-modelo-datos` (sin mergear a `main` todavía)

---

## Fases

| # | Fase | Estado | Rama | Mergeada |
|---|------|--------|------|----------|
| 0 | Scaffold + deploy | ✅ hecha | `feat/fase-0-scaffold` | sí |
| 1 | Sistema de diseño + layout | ✅ hecha | `feat/fase-1-diseno-layout` | sí |
| 2 | Modelo de datos | ✅ hecha | `feat/fase-2-modelo-datos` | no |
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

## Modelo de datos (Fase 2)

Archivos nuevos:

- `src/types/index.ts` — `Vehiculo`, `Categoria`, `Trabajo`, `CategoriaId`, `TipoEvento`.
- `src/data/vehiculos.ts` — 206 vehículos, generados en una sola pasada desde `docs/inventario-vehiculos.json` (ese JSON no se vuelve a leer). **NO LEER COMPLETO**, ver forma del dato en `src/types/index.ts`.
- `src/data/categorias.ts` — las 8 categorías con nombre, descripción y cantidad.
- `src/data/trabajos.ts` — los 6 trabajos confirmados del sitio original.
- `src/lib/vehiculos.ts` — `getPorCategoria`, `getPorId`, `buscar`, `filtrar`, `getTrabajosDeVehiculo`.
- `PENDIENTES-CLIENTE.md` — posibles duplicados del inventario original + campos que no estaban en el JSON (capacidad, eventos, imágenes, destacados) y quedaron con valores conservadores o placeholder.

`npx tsc -b` y `npm run build` corren sin errores con estos datos.

---

## Decisiones tomadas

- **Enrutamiento actual con `react-router-dom` + `BrowserRouter` puro, no con `vite-react-ssg`.** La librería `vite-react-ssg` está en `package.json` (fase 0) pero todavía no está conectada: `src/main.tsx` usa `createRoot` + `BrowserRouter` normal y `vite.config.ts` no tiene `ssgOptions`. Falta migrar el entry point para que el sitio se pre-renderice como estático (necesario para SEO y OG previews en WhatsApp sin importar el hosting final). Pendiente para una fase posterior (probablemente antes de fase 9/10).
- **El hosting final todavía no está decidido** (GitHub Pages u otro). El proyecto se desarrolla 100% local por ahora; `base` en `vite.config.ts` y `SITE.url` quedan como placeholder hasta que se defina dónde se despliega.
- **Stack de versiones (fase 0):** React 18.3, Tailwind v4.3 (vía `@tailwindcss/vite`, sin `tailwind.config.js` tradicional), Vite 8.1, TypeScript ~6.0, `react-router-dom` 6.30. Lint con `oxlint` en vez de ESLint.
- **StickyBar solo visible en mobile** (`lg:hidden`): en desktop la navegación de WhatsApp/consulta vive en el Header, no se duplica.
- **`decada` en `Vehiculo` y `anio` en `Trabajo` son `number | null`** (no solo `number` como en el borrador del plan): varios vehículos y los 6 trabajos no tienen año verificado en la fuente original, y la regla de "no inventar" aplica también a estos campos derivados.
- **`capacidad` y `eventos` no estaban en `docs/inventario-vehiculos.json` para ningún vehículo.** Se completaron con defaults conservadores por categoría (definidos en el script de generación, no versionado) y quedaron documentados en `PENDIENTES-CLIENTE.md` para validar con el cliente. Mismo criterio para `imagenes` (no hay fotos todavía: paths placeholder `/img/vehiculos/{id}/01.jpg`) y `destacado` (todos en `false`, la curación queda para Fase 3).
- **`tambienEn`** (campo agregado a `Vehiculo`, no estaba en la interfaz de ejemplo del plan) resuelve los vehículos listados en más de una categoría sin duplicar la URL: `siam-argenta-1964` (también en camionetas) y `chevrolet-1939-limousine` (también en antiguos, según su propia nota).

---

## Pendientes y deuda técnica

- Migrar `main.tsx`/`vite.config.ts` a `vite-react-ssg` para habilitar el pre-render (mencionado en el plan pero no ejecutado aún; necesario para deployar a producción más adelante, sea cual sea el hosting elegido).
- Todas las páginas (`Home`, `Catalogo`, `Auto`, `Nosotros`, `Trabajos`, `Faq`, `Contacto`, `Consulta`, `NotFound`) son placeholders sin contenido real.
- Faltan las fotos reales de los 206 vehículos, las 8 categorías y los 6 trabajos (ver `PENDIENTES-CLIENTE.md`).
- Revisar con el cliente los 10 posibles duplicados/datos inciertos listados en `PENDIENTES-CLIENTE.md`.
- Definir `capacidad` y `eventos` reales por vehículo (hoy son estimaciones conservadoras por categoría) y elegir los `destacado` para la Home.
