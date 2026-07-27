# Estado del proyecto

> Este archivo lo actualiza Claude Code al final de cada fase.
> Es la memoria entre sesiones: si está bien escrito, no hace falta explorar el proyecto.

**Última fase completada:** 3 — Home
**Próxima fase:** 4 — Catálogo + buscador + filtros
**Rama activa:** `feat/fase-3-home` (sin mergear a `main` todavía)

---

## Fases

| # | Fase | Estado | Rama | Mergeada |
|---|------|--------|------|----------|
| 0 | Scaffold + deploy | ✅ hecha | `feat/fase-0-scaffold` | sí |
| 1 | Sistema de diseño + layout | ✅ hecha | `feat/fase-1-diseno-layout` | sí |
| 2 | Modelo de datos | ✅ hecha | `feat/fase-2-modelo-datos` | no |
| 3 | Home | ✅ hecha | `feat/fase-3-home` | no |
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
`Placeholder` — `src/components/ui/Placeholder.tsx` — contenido temporal "Próximamente" usado por las páginas que todavía no se implementaron (Container + SectionTitle)
`VehiculoCard` — `src/components/vehiculos/VehiculoCard.tsx` — tarjeta de vehículo (imagen, nombre, año, descripción corta, capacidad); pensada para reusarse en Catálogo (Fase 4) y Auto (Fase 5)
`Hero` — `src/components/home/Hero.tsx` — sección hero de la Home: imagen de fondo, tagline, 2 CTAs
`CategoriasGrid` — `src/components/home/CategoriasGrid.tsx` — grilla de las 8 categorías con link a `/catalogo/:categoria`
`Destacados` — `src/components/home/Destacados.tsx` — carrusel horizontal de `VehiculoCard` con los vehículos `destacado: true`
`PruebaSocial` — `src/components/home/PruebaSocial.tsx` — estadísticas (años de trayectoria, vehículos, categorías) + strip de trabajos recientes
`CtaFinal` — `src/components/home/CtaFinal.tsx` — bloque de cierre con CTA de WhatsApp y de consulta

---

## Rutas implementadas

Definidas en `src/App.tsx` con `react-router-dom` (`BrowserRouter` en `src/main.tsx`). `/` tiene contenido real (Fase 3); el resto renderiza `Placeholder` por ahora:

- `/` — Home (Fase 3: Hero, categorías, destacados, prueba social, CTA)
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

## Home (Fase 3)

Página compuesta en `src/pages/Home.tsx` a partir de 5 secciones en `src/components/home/`: `Hero`, `CategoriasGrid`, `Destacados`, `PruebaSocial`, `CtaFinal`. Usa `VehiculoCard` (nuevo, en `src/components/vehiculos/`) para las tarjetas de destacados.

`npx tsc -b` y `npm run build` corren sin errores. Se probó `npm run dev` con Playwright headless (desktop 1440px y mobile 390px): las 5 secciones renderizan, sin errores de consola. Sin fotos reales todavía, las zonas de imagen se ven como fondo sólido `superficie` (no ícono de imagen rota) porque las imágenes se aplican vía `background-image` en vez de `<img>`.

---

## Decisiones tomadas

- **Enrutamiento actual con `react-router-dom` + `BrowserRouter` puro, no con `vite-react-ssg`.** La librería `vite-react-ssg` está en `package.json` (fase 0) pero todavía no está conectada: `src/main.tsx` usa `createRoot` + `BrowserRouter` normal y `vite.config.ts` no tiene `ssgOptions`. Falta migrar el entry point para que el sitio se pre-renderice como estático (necesario para SEO y OG previews en WhatsApp sin importar el hosting final). Pendiente para una fase posterior (probablemente antes de fase 9/10).
- **El hosting final todavía no está decidido** (GitHub Pages u otro). El proyecto se desarrolla 100% local por ahora; `base` en `vite.config.ts` y `SITE.url` quedan como placeholder hasta que se defina dónde se despliega.
- **Stack de versiones (fase 0):** React 18.3, Tailwind v4.3 (vía `@tailwindcss/vite`, sin `tailwind.config.js` tradicional), Vite 8.1, TypeScript ~6.0, `react-router-dom` 6.30. Lint con `oxlint` en vez de ESLint.
- **StickyBar solo visible en mobile** (`lg:hidden`): en desktop la navegación de WhatsApp/consulta vive en el Header, no se duplica.
- **`decada` en `Vehiculo` y `anio` en `Trabajo` son `number | null`** (no solo `number` como en el borrador del plan): varios vehículos y los 6 trabajos no tienen año verificado en la fuente original, y la regla de "no inventar" aplica también a estos campos derivados.
- **`capacidad` y `eventos` no estaban en `docs/inventario-vehiculos.json` para ningún vehículo.** Se completaron con defaults conservadores por categoría (definidos en el script de generación, no versionado) y quedaron documentados en `PENDIENTES-CLIENTE.md` para validar con el cliente. Mismo criterio para `imagenes` (no hay fotos todavía: paths placeholder `/img/vehiculos/{id}/01.jpg`) y `destacado` (todos en `false`, la curación queda para Fase 3).
- **`tambienEn`** (campo agregado a `Vehiculo`, no estaba en la interfaz de ejemplo del plan) resuelve los vehículos listados en más de una categoría sin duplicar la URL: `siam-argenta-1964` (también en camionetas) y `chevrolet-1939-limousine` (también en antiguos, según su propia nota).
- **Destacados de la Home curados a mano (Fase 3):** se marcó `destacado: true` en 8 vehículos, uno por categoría (ver detalle y justificación en `PENDIENTES-CLIENTE.md`). Es una selección editorial provisoria sin fotos reales, a revisar con el cliente.
- **Sin testimonios en "Prueba social":** el plan pedía 3 testimonios, pero no hay ninguno real en las fuentes del proyecto. Por la regla de no inventar contenido, se reemplazó por estadísticas reales (años desde 1991, cantidad de vehículos y categorías) + strip de trabajos. Pendiente pedir testimonios reales al cliente.
- **Imágenes por `background-image`, no `<img>`:** Hero, categorías, destacados y trabajos aplican la imagen como fondo CSS sobre un contenedor `bg-superficie`. Así, mientras no haya fotos reales, se ve un panel de color sólido en vez de un ícono de imagen rota — se eligió este patrón para toda la Home y se espera reusarlo en Catálogo/Auto.
- **Mensaje de WhatsApp armado inline en cada componente** (`Hero`, `CtaFinal`), replicando el patrón ya usado en `StickyBar`. No se creó `src/lib/whatsapp.ts` porque esa es una decisión de diseño de Fase 6 ("Motor de WhatsApp"); hasta entonces se acepta la pequeña duplicación del mensaje genérico.
- **`getDestacados()` agregado a `src/lib/vehiculos.ts`** siguiendo el mismo patrón que `getPorCategoria`/`getPorId`.

---

## Pendientes y deuda técnica

- Migrar `main.tsx`/`vite.config.ts` a `vite-react-ssg` para habilitar el pre-render (mencionado en el plan pero no ejecutado aún; necesario para deployar a producción más adelante, sea cual sea el hosting elegido).
- `Catalogo`, `Auto`, `Nosotros`, `Trabajos`, `Faq`, `Contacto`, `Consulta`, `NotFound` siguen siendo placeholders sin contenido real. `Home` ya tiene contenido real (Fase 3).
- Faltan las fotos reales de los 206 vehículos, las 8 categorías, los 6 trabajos y una imagen de hero para la Home (ver `PENDIENTES-CLIENTE.md`).
- Revisar con el cliente los 10 posibles duplicados/datos inciertos listados en `PENDIENTES-CLIENTE.md`.
- Definir `capacidad` y `eventos` reales por vehículo (hoy son estimaciones conservadoras por categoría).
- Revisar con el cliente la selección de 8 `destacado` hecha en Fase 3 y conseguir testimonios reales para "Prueba social" (ver `PENDIENTES-CLIENTE.md`).
