# Estado del proyecto

> Este archivo lo actualiza Claude Code al final de cada fase.
> Es la memoria entre sesiones: si está bien escrito, no hace falta explorar el proyecto.

**Última fase completada:** 9 — SEO + performance + analytics
**Próxima fase:** 10 — QA final
**Rama activa:** `feat/fase-9-seo-performance-analytics` (sin mergear a `main` todavía)

---

## Fases

| # | Fase | Estado | Rama | Mergeada |
|---|------|--------|------|----------|
| 0 | Scaffold + deploy | ✅ hecha | `feat/fase-0-scaffold` | sí |
| 1 | Sistema de diseño + layout | ✅ hecha | `feat/fase-1-diseno-layout` | sí |
| 2 | Modelo de datos | ✅ hecha | `feat/fase-2-modelo-datos` | no |
| 3 | Home | ✅ hecha | `feat/fase-3-home` | no |
| 4 | Catálogo + buscador + filtros | ✅ hecha | `feat/fase-4-catalogo` | no |
| 5 | Página de modelo | ✅ hecha | `feat/fase-5-pagina-modelo` | no |
| 6 | Motor de WhatsApp | ✅ hecha | `feat/fase-6-whatsapp` | no |
| 7 | About + trabajos | ✅ hecha | `feat/fase-7-nosotros-trabajos` | no |
| 8 | FAQ + contacto | ✅ hecha | `feat/fase-8-faq-contacto` | no |
| 9 | SEO + performance + analytics | ✅ hecha (parcial, ver detalle) | `feat/fase-9-seo-performance-analytics` | no |
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
`VehiculoCard` — `src/components/vehiculos/VehiculoCard.tsx` — tarjeta de vehículo (imagen, nombre, año, descripción corta, capacidad). Props nuevas en Fase 4: `mostrarAcciones` (agrega fila "Ver más" + "Agregar/Agregado a consulta", usada en Catálogo) y `className` (para que cada contexto controle el ancho: `w-72 shrink-0` en el carrusel de Destacados, ancho completo en la grilla de Catálogo)
`FiltrosCatalogo` — `src/components/catalogo/FiltrosCatalogo.tsx` — grupos de checkboxes (categoría, tipo de evento, década, color), slider de capacidad mínima y toggle de convertible; mismo componente para el aside desktop y el drawer mobile de `Catalogo`
`GaleriaVehiculo` — `src/components/vehiculos/GaleriaVehiculo.tsx` — imagen principal + tira de miniaturas (solo si hay más de 1 foto) + lightbox fullscreen con flechas, swipe táctil, navegación por teclado (Esc/flechas) y contador "n / total". Usada en `Auto`
`WhatsappFlotante` — `src/components/layout/WhatsappFlotante.tsx` — botón circular fijo abajo a la derecha, solo desktop (`hidden lg:block`). Al hacerle click abre un popover (fondo blanco, borde y textos en el verde de WhatsApp) con un `textarea` editable precargado con `mensajeGeneral()` y un botón "Enviar" que arma la URL `wa.me` con el texto ya editado; se cierra con Escape, click afuera o al enviar. En mobile ese rol lo cumple `StickyBar` (sin popover, va directo a `wa.me`)
`Hero` — `src/components/home/Hero.tsx` — sección hero de la Home: imagen de fondo, tagline, 2 CTAs
`CategoriasGrid` — `src/components/home/CategoriasGrid.tsx` — grilla de las 8 categorías con link a `/catalogo/:categoria`
`Destacados` — `src/components/home/Destacados.tsx` — carrusel horizontal de `VehiculoCard` con los vehículos `destacado: true`
`PruebaSocial` — `src/components/home/PruebaSocial.tsx` — estadísticas (años de trayectoria, vehículos, categorías) + strip de trabajos recientes
`CtaFinal` — `src/components/home/CtaFinal.tsx` — bloque de cierre con CTA de WhatsApp y de consulta

---

## Rutas implementadas

Definidas en `src/App.tsx` con `react-router-dom` (`BrowserRouter` en `src/main.tsx`). `/` y `/catalogo` (+ `/catalogo/:categoria`) tienen contenido real; el resto renderiza `Placeholder` por ahora:

- `/` — Home (Fase 3: Hero, categorías, destacados, prueba social, CTA)
- `/catalogo` — Catálogo (Fase 4: buscador, filtros, grilla paginada)
- `/catalogo/:categoria` — Catálogo, precarga el filtro de categoría (ver decisiones)
- `/auto/:id` — Página de modelo (Fase 5: galería + lightbox, ficha técnica, descripción, chips de eventos, trabajos realizados, botonera de WhatsApp/consulta/compartir, relacionados)
- `/nosotros` — Nosotros (Fase 7: historia, números y qué incluye el servicio)
- `/trabajos` — Trabajos (Fase 7: grilla filtrable por tipo de evento y año, modal con vehículos usados)
- `/faq` — FAQ (Fase 8: acordeón con las 8 preguntas base)
- `/contacto` — Contacto (Fase 8: datos, horarios, botón de WhatsApp y mapa embebido)
- `/consulta` — Consulta (Fase 6: lista de vehículos seleccionados + formulario previo opcional + envío por WhatsApp)
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

## Catálogo (Fase 4)

Página en `src/pages/Catalogo.tsx`. Buscador (nombre + año, debounce 300ms) + filtros (categoría, tipo de evento, década, color: multi; capacidad mínima: slider; convertible: toggle) en `src/components/catalogo/FiltrosCatalogo.tsx`, sidebar fija en desktop y drawer a pantalla completa en mobile (botón "Filtros"). Todo el estado de filtros vive en los **query params** de la URL (compartible/bookmarkeable), no en `useState`. Contador de resultados, botón "Limpiar filtros" y estado vacío diseñado. Grilla con "Ver más vehículos" que suma de a 24 (`LOTE`), sin scroll infinito. Cada card usa `VehiculoCard` con `mostrarAcciones` (botones "Ver más" y "Agregar/Agregado a consulta").

`npx tsc -b` y `npm run build` corren sin errores. **No se probó en navegador esta sesión** (Playwright no estaba instalado y el usuario prefirió no instalarlo ahora): falta verificar visualmente buscador, filtros, drawer mobile y el toggle de "Agregar a consulta" antes de dar la fase por validada en UI.

---

## Página de modelo (Fase 5)

Página en `src/pages/Auto.tsx` (ruta `/auto/:id`). Si `getPorId` no encuentra el vehículo, muestra un estado "No encontramos ese vehículo" con link de vuelta al catálogo (no hay redirect automático). Estructura, según el plan: breadcrumb (Catálogo / Categoría / Nombre), `GaleriaVehiculo`, nombre + año + categoría, ficha técnica (capacidad, colores, década si no es `null`, convertible sí/no), descripción larga, chips de tipos de evento (labels desde `data/eventos.ts`), grilla de "Trabajos realizados con este vehículo" (`getTrabajosDeVehiculo`, mismo estilo de card que el strip de trabajos de `PruebaSocial`, linkea a `/trabajos` que todavía es placeholder), botonera (Consultar por WhatsApp, Agregar/Agregado a consulta reutilizando `lib/consulta.ts`, Compartir) y grilla de "Vehículos relacionados" (misma categoría, 3 items, `VehiculoCard` sin acciones).

`npx tsc -b` y `npm run build` corren sin errores. **No se probó en navegador esta sesión**: el usuario, consultado explícitamente, prefirió no instalar Playwright (mismo criterio que en Fase 4).

---

## Motor de WhatsApp (Fase 6)

`src/lib/whatsapp.ts` centraliza todos los mensajes: `mensajeGeneral()`, `mensajeModelo(vehiculo)`, `mensajeConsultaMultiple(vehiculos, datos?)` y `armarUrlWhatsapp(mensaje)` (arma la URL `wa.me` con `SITE.whatsapp`). También expone `urlVehiculo(id)` para armar la URL absoluta de un modelo con `SITE.url`. Reemplaza los mensajes inline que había en `StickyBar`, `Hero`, `CtaFinal` y `Auto` (que además estaban ligeramente desincronizados entre sí).

`src/lib/consulta.tsx` pasó de un par de funciones sobre `localStorage` a un Context (`ConsultaProvider`) + hook (`useConsulta`), persistido en `sessionStorage` según el plan. Expone `ids`, `estaEnConsulta`, `toggleConsulta`, `quitarDeConsulta` y `vaciarConsulta`. `main.tsx` envuelve `<App />` con `<ConsultaProvider>`. `VehiculoCard` y `Auto` ahora leen del contexto en vez de tener cada uno su propio `useState` local — así el contador del Header/StickyBar se actualiza al instante al tocar "Agregar a consulta" desde cualquier lado.

Botón general de WhatsApp: `WhatsappFlotante` (nuevo, solo desktop) + el ya existente de `StickyBar` (mobile). El contador de la consulta múltiple aparece como badge en el ícono de `Header` (desktop, nuevo) y en el ícono de `StickyBar` (mobile).

`/consulta` (`src/pages/Consulta.tsx`) ahora tiene contenido real: si no hay vehículos seleccionados muestra un estado vacío con link al catálogo; si hay, lista cada uno (miniatura, nombre, año, botón quitar) + botón "Vaciar consulta", y un formulario opcional (fecha, zona, tipo de evento, duración estimada, comentario — ninguno bloquea el envío) que arma el mensaje final con `mensajeConsultaMultiple`. Botón "Enviar por WhatsApp" al final.

`npx tsc -b`, `npm run build` y `npm run lint` corren sin errores (el lint deja dos warnings esperables de `react-hooks/exhaustive-deps` y uno de `react-refresh` en `consulta.tsx` por exportar el hook junto al Provider, mismo criterio ya aceptado en `Catalogo.tsx`). **No se probó en navegador esta sesión** (ver "Pendientes y deuda técnica").

---

## About + Trabajos (Fase 7)

`src/data/about.ts` nuevo: `ABOUT.historia` (3 párrafos placeholder) y `ABOUT.incluye` (lista de qué incluye el alquiler: chofer, traslado, seguro, decoración opcional, asesoramiento). Es contenido de marketing genérico editable, no dato de vehículo — mismo criterio que `SITE.tagline` o la copy de `Hero`/`CtaFinal`.

`src/pages/Nosotros.tsx`: historia + una fila de 3 números (años de trayectoria, vehículos en flota, producciones documentadas) + lista de "Qué incluye el alquiler". El plan pedía un número de "eventos realizados", pero no hay ningún dato real de cuántos eventos se hicieron en 35 años — inventar un número violaría la regla de no inventar contenido, así que se usó `TRABAJOS.length` ("producciones documentadas") como métrica real derivada, mismo criterio que reemplazó los testimonios inventados en Fase 3.

`src/pages/Trabajos.tsx`: grilla de los 6 `TRABAJOS`, filtrable por tipo de evento (chips, solo se muestran los tipos que efectivamente aparecen en los datos) y por año (select, oculto porque hoy los 6 trabajos tienen `anio: null` — la lógica de filtrado ya está armada y se activa sola si en el futuro se carga algún año real). Cada card abre un modal (no ruta propia) con la imagen grande, tipo, año si existe, descripción si existe, y — la relación bidireccional pedida con Fase 5 — la grilla de vehículos usados (`getPorId` sobre `vehiculosIds`, reusando `VehiculoCard`), oculta si el trabajo no tiene ningún vehículo vinculado. El campo `fuente` de `Trabajo` nunca se renderiza (es solo trazabilidad interna, como ya aclaraba su comentario en `types/index.ts`).

`npx tsc -b`, `npm run build` y `npm run lint` corren sin errores/warnings nuevos. **No se probó en navegador esta sesión** (ver "Pendientes y deuda técnica").

---

## FAQ + Contacto (Fase 8)

`SITE.horarios` nuevo en `src/config/site.ts` ("Lunes a sábado de 9 a 19 hs", placeholder editable), siguiendo el criterio de que `site.ts` es la única fuente de datos del negocio.

`src/data/faq.ts` nuevo: `FAQS` (8 preguntas/respuestas, las mismas del plan, con respuestas placeholder genéricas y no comprometidas — p. ej. "consultanos por WhatsApp" en vez de inventar un mínimo de horas o un monto de seña concretos). `src/pages/Faq.tsx` es un acordeón simple (una pregunta abierta a la vez, la primera abierta por defecto), sin librería nueva.

`src/pages/Contacto.tsx`: card con email/dirección/horarios (iconos de `lucide-react`), botón "Consultar por WhatsApp" (mismo `lib/whatsapp.ts` de Fase 6) y un mapa embebido con `<iframe>` de Google Maps (`google.com/maps?q=...&output=embed`, sin API key) centrado en `SITE.direccion` — no hace falta clave ni librería para un embed simple de solo lectura.

`npx tsc -b`, `npm run build` y `npm run lint` corren sin errores/warnings nuevos. **No se probó en navegador esta sesión** (ver "Pendientes y deuda técnica").

---

## SEO + Performance + Analytics (Fase 9)

**SSG con `vite-react-ssg` — migración completa.** `src/main.tsx` ahora exporta `createRoot` desde `ViteReactSSG({ routes, basename })` en vez de montar `createRoot()` + `BrowserRouter` a mano. `src/App.tsx` se eliminó: sus rutas pasaron a `src/routes.tsx` como un árbol `RouteRecord[]` (formato data-router de react-router). `Layout` (`src/components/layout/Layout.tsx`) dejó de recibir `children` y ahora es el `Component` de la ruta raíz `/`, usa `<Outlet />` para las rutas hijas, y es donde vive `<ConsultaProvider>` (antes estaba en `main.tsx`; con rutas basadas en objetos ya no hay un único punto de montaje JSX para envolver, así que el layout raíz es el lugar natural). Cada página se carga con `lazy: () => import('./pages/X').then(m => ({ Component: m.X }))` — es el mecanismo de code-splitting por ruta que pedía el plan ("lazy loading de rutas"), nativo de `vite-react-ssg`/react-router en vez de envolver a mano con `React.lazy`. `/auto/:id` y `/catalogo/:categoria` tienen `getStaticPaths` que devuelven, respectivamente, los 206 ids de `vehiculos.ts` y los 8 ids de `categorias.ts`, para que **todas** se prerendericen.

`npm run build` ahora corre `tsc -b && vite-react-ssg build` (antes `vite build`). `npm run dev` se dejó como `vite` puro (CSR), sin cambios: `vite-react-ssg` detecta que corre en el navegador y monta la app igual (confirmado con `curl` contra el dev server), así que el flujo de desarrollo de todas las fases anteriores sigue funcionando idéntico. Se probó con `npm run build` real: **221 páginas generadas** (7 estáticas + 8 categorías + 206 vehículos), verificado contando carpetas en `dist/auto` y `dist/catalogo`.

**`ssgOptions.dirStyle: 'nested'`** en `vite.config.ts` (`/auto/hupmobile-1930` → `dist/auto/hupmobile-1930/index.html`, no `.html` en la URL) para cumplir "URLs limpias, sin `.html`". **Ojo:** `vite preview` local necesita la barra final (`/auto/hupmobile-1930/`) para resolver el archivo anidado correctamente; sin la barra devuelve el `index.html` de la raíz. Es una particularidad del preview server de Vite, no del build — los hosts estáticos típicos (Netlify, GitHub Pages, Vercel) resuelven `carpeta/` automáticamente. A verificar contra el hosting real una vez que se decida (Fase 10 ya lo tiene en su checklist).

**Meta tags y JSON-LD:** `src/lib/seo.tsx` exporta `<Seo>` (envuelve `<Head>` de `vite-react-ssg`, que es un wrapper de `react-helmet-async`): `title`, `description`, `canonical`, Open Graph, Twitter card y, opcionalmente, un bloque `jsonLd` y/o `noindex`. Se agregó a las 9 páginas: `LocalBusiness` en Home, `Product` en cada `Auto` (imagen, categoría, descripción larga), `FAQPage` en Faq (las 8 preguntas). `Consulta` y `NotFound` llevan `noindex` (contenido personal/sin valor de búsqueda). Verificado con `vite preview` + `curl`/`grep` sobre los archivos generados: title, description, og:image y JSON-LD correctos y **distintos por ruta** (antes de la corrección de abajo, todas las páginas mostraban el `<title>` de Home).

**Bug encontrado y corregido en el proceso:** el `index.html` original tenía `<title>` y `<meta name="description">` estáticos que `vite-react-ssg` no reemplaza (los agrega el `Head` de cada página, pero no borra los del template), así que cada página prerenderizada terminaba con **dos** `<title>` (uno correcto de Helmet, uno viejo de `index.html`, ver commit). Se sacaron esas dos líneas de `index.html`: ahora el título/description siempre viene del `<Seo>` de cada página, sin duplicados. Confirmado en el HTML generado tras el fix.

**Segundo bug encontrado (más importante, afecta contenido real no solo SEO): duplicación de año en el nombre.** Varios vehículos ya tienen el año adentro del campo `nombre` (ej. `"Hupmobile 1930"`, `"Ford A 1930 Bordo 4 Puertas"`), pero desde Fase 6 `lib/whatsapp.ts` armaba `"{nombre} {año}"` sin chequear eso, así que el mensaje de WhatsApp decía **"Hupmobile 1930 1930"**. Se detectó al verificar el `<title>` prerenderizado de esa página. Fix: `nombreConAnio(vehiculo)` (nuevo, en `src/lib/vehiculos.ts`) solo agrega el año si el nombre todavía no lo incluye (`nombre.includes(String(anio))`); `lib/whatsapp.ts` y el título de `Seo` en `Auto.tsx` ahora usan ese único helper. Esto corrige tanto los mensajes de WhatsApp (Fase 6) como los títulos SEO (Fase 9) — mismo bug, dos síntomas.

**Sitemap y robots.txt:** no genera nada `vite-react-ssg` por sí solo, así que se agregó `ssgOptions.onFinished` en `vite.config.ts` (recibe el directorio de salida ya con todas las páginas escritas) que arma `sitemap.xml` (221 URLs, mismas rutas que `getStaticPaths` + las estáticas) y `robots.txt` (permite todo, apunta al sitemap) usando `SITE.url`. Como `SITE.url` sigue en `http://localhost:5173`, ambos archivos quedan apuntando a localhost hasta que se defina el dominio real — mismo criterio ya anotado en el plan.

**`lang="es"`** corregido en `index.html` (estaba en `"en"`). Charset UTF-8 ya estaba bien.

**Analytics:** `src/lib/analytics.ts` — `trackEvent(nombre, props?)`, no-op si `window.plausible` no existe (SSR-safe: `typeof window === "undefined"` corta antes). Se agregó el script de Plausible a `index.html` (`data-domain="localhost"`, placeholder — **no hay cuenta de Plausible real creada**, es solo la integración de código; el script no va a mandar datos a ningún lado útil hasta que se registre un dominio real ahí, tal como pasa con `SITE.url`). Se cablearon los 5 eventos pedidos por el plan: `whatsapp_general` (Hero, CtaFinal, StickyBar, WhatsappFlotante, Contacto), `whatsapp_modelo` con `id` (botón WhatsApp de `Auto`), `whatsapp_multiple` con `cantidad` (botón "Enviar por WhatsApp" de `Consulta`), `agregar_consulta` con `id` (solo al agregar, no al quitar — en `VehiculoCard` y `Auto`), `busqueda` con `termino` (en el debounce del buscador de `Catalogo`, solo cuando hay texto). `Button` (`src/components/ui/Button.tsx`) se extendió para aceptar `onClick` también en modo link (antes era mutuamente excluyente con `href`): no bloquea la navegación, solo dispara el tracking antes de salir.

**Performance — parcial, a propósito.** Lo que pedía el plan de imágenes (WebP, `loading="lazy"`, `width`/`height` explícitos, blur placeholder) **no se hizo esta sesión**: todo el sitio usa `background-image` en vez de `<img>` (decisión de Fase 3, ver más abajo) precisamente porque no hay fotos reales todavía — convertir a WebP algo que no existe, o agregar `loading="lazy"` a un `<img>` que no se usa en ningún lado, no tiene sentido todavía. Es un cambio grande (toca `VehiculoCard`, `GaleriaVehiculo`, `Hero`, `CategoriasGrid`, `Destacados`, `PruebaSocial`, `Trabajos`, `Consulta`) que además revertiría esa decisión de Fase 3, así que se dejó pendiente explícitamente para cuando lleguen las fotos reales, en vez de improvisar una migración a medias. Lo que sí se hizo de Performance: lazy loading de rutas (ver arriba) y `dirStyle: nested` para URLs limpias.

`npx tsc -b`, `npm run build` (con el pipeline real de SSG) y `npm run lint` corren sin errores/warnings nuevos.

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
- **`filtrar()` rediseñado en Fase 4 para filtros múltiples** (`categorias`, `eventos`, `decadas`, `colores` como arrays) y con un campo `texto` que matchea nombre o año. Se eliminó `buscar()` (no tenía otros usos y quedó subsumida por `filtrar({ texto })`) para no mantener dos rutas de normalización de texto en paralelo.
- **`getDecadasDisponibles()`, `getColoresDisponibles()` y `getCapacidadMaxima()`** agregadas a `src/lib/vehiculos.ts`: derivan las opciones de los filtros de década/color/capacidad directamente de `VEHICULOS` en vez de hardcodearlas, para no inventar valores que no estén en los datos.
- **`src/data/eventos.ts` nuevo**: labels en español para los 7 valores de `TipoEvento` (`{ id, nombre }`, mismo patrón que `categorias.ts`). Es solo texto de UI para un `type` ya existente, no dato de negocio inventado.
- **`/catalogo/:categoria` solo precarga el filtro la primera vez**: un `useEffect` copia el param de ruta al query param `categoria` únicamente si este todavía no está seteado en la URL. Si el usuario después deselecciona esa categoría desde el sidebar, la URL sigue mostrando `/catalogo/:categoria` en el path pero los resultados ya no están filtrados por ella — se aceptó esta pequeña inconsistencia de path vs. resultados para no duplicar la fuente de verdad (los query params mandan siempre).
- **"Agregar a consulta" con persistencia mínima en `localStorage`** (`src/lib/consulta.ts`, clave `consulta-vehiculos`, solo `estaEnConsulta`/`toggleConsulta`). Es el único pedazo de la Fase 6 ("carrito" de consulta múltiple) que se adelantó, porque el plan de Fase 4 pide explícitamente el botón en cada card. No se creó contador visible (badge en Header/StickyBar) ni la página `/consulta` real: eso es contenido de Fase 6.
- **`VehiculoCard` dejó de ser un único `<Link>` envolviendo toda la tarjeta.** Ahora es un `<div>` con un `<Link className="contents">` alrededor de imagen+datos, y la fila de acciones (Fase 4) queda fuera del link como hermano — necesario porque un `<button>` (Agregar a consulta) no puede anidarse dentro de un `<a>`. El ancho fijo `w-72 shrink-0` que tenía el componente se movió a la prop `className` (ver arriba), así el carrusel de Destacados y la grilla de Catálogo pueden pedir anchos distintos sin bifurcar el componente.
- **`getRelacionados(vehiculo, cantidad = 3)` agregado a `src/lib/vehiculos.ts`** (Fase 5): reusa `getPorCategoria` y excluye el propio vehículo, siguiendo el mismo patrón que los otros helpers derivados de `VEHICULOS`.
- **Mensaje de WhatsApp por modelo armado inline en `Auto.tsx`** (Fase 5), mismo criterio que Fase 3/4: no se creó todavía `src/lib/whatsapp.ts` porque el "motor de WhatsApp" formal es Fase 6. La URL absoluta usa `SITE.url` (placeholder hasta definir hosting).
- **"Compartir" usa Web Share API (`navigator.share`) con fallback a `navigator.clipboard.writeText`** + mensaje "¡Copiado!" temporal (2s) en el mismo botón. No se agregó librería de toast para esto.
- **Solo 1 foto por vehículo en los datos actuales** (`vehiculos.ts`), así que `GaleriaVehiculo` oculta miniaturas, flechas y contador cuando `imagenes.length === 1` — esa lógica ya está resuelta en el componente, no hace falta tocarla cuando entren fotos reales.
- **`/auto/:id` con id inexistente no redirige**: muestra un mensaje "No encontramos ese vehículo" con botón de vuelta a `/catalogo`, en vez de reusar `NotFound` (esa página es para rutas que no matchean, esta es para un id inválido dentro de una ruta válida).
- **Persistencia de la consulta múltiple cambiada de `localStorage` a `sessionStorage`** (Fase 6), siguiendo la letra del plan. Efecto práctico: la lista de "Agregar a consulta" ahora se pierde al cerrar la pestaña/navegador, no es permanente entre sesiones. Se aceptó porque así lo pide `docs/PLAN-CLAUDE-CODE.md` para el `ConsultaContext`; si en QA (Fase 10) se prefiere que sobreviva más tiempo, es un cambio de una palabra en `src/lib/consulta.tsx`.
- **`src/lib/consulta.tsx`** (cambió de `.ts` a `.tsx` porque ahora exporta un componente `ConsultaProvider`) reemplaza por completo al archivo de Fase 4: no quedó ninguna función vieja ni wrapper de compatibilidad, todos los consumidores (`VehiculoCard`, `Auto`, `Header`, `StickyBar`, `Consulta`) se migraron al hook `useConsulta()`.
- **Mensaje general de WhatsApp unificado**: Fase 3 tenía dos textos ligeramente distintos para el mismo botón ("Te quería hacer una consulta..." en `StickyBar` vs. "Quiero hacer una consulta..." en `Hero`/`CtaFinal`). Fase 6 los reemplaza a todos por el texto único de `mensajeGeneral()` (el que ya estaba en `StickyBar`, que coincide con el que pide el plan textualmente).
- **Botón flotante de WhatsApp solo en desktop** (`WhatsappFlotante`, `hidden lg:flex`): en mobile ese rol ya lo cumple el botón grande de `StickyBar`, no se duplica. Con esto se completa la decisión de Fase 1 de que "la navegación de WhatsApp/consulta vive en el Header" — en la práctica quedó repartida entre Header (contador de consulta), el botón flotante (WhatsApp general en desktop) y StickyBar (ambos en mobile), en vez de meter todo dentro del `<Header>`.
- **Formulario de `/consulta` sin `<form>` ni validación bloqueante**: los 5 campos (fecha, zona, evento, duración, comentario) son inputs controlados sueltos dentro de un `<div>`, todos opcionales; el botón "Enviar por WhatsApp" es un link (`Button` con `href` + `external`) que recalcula el mensaje en cada render, no un submit.
- **`WhatsappFlotante` con popover editable (ajuste posterior a la Fase 6)**: en vez de linkear directo a `wa.me`, el botón abre un panel con `textarea` (precargado con `mensajeGeneral()`, editable) + botón "Enviar". Es intencionalmente el único lugar de la app con fondo blanco (el resto del sitio es tema oscuro): pedido explícito para que el popover se sienta "a lo WhatsApp" (blanco, borde y textos en `--color-whatsapp`). El botón "Enviar" se deshabilita visualmente si el mensaje queda vacío. Cierra con Escape, click afuera o al enviar (vía listener de `mousedown`/`keydown` en un `useEffect`, mismo patrón que el lightbox de `GaleriaVehiculo`). Solo se aplicó al botón flotante de desktop, no a `StickyBar` (mobile), que no se tocó.
- **Trabajos con modal en vez de página propia** (Fase 7): el plan permitía "modal/página"; se eligió modal porque no hace falta una URL individual por trabajo (no hay SEO ni compartir involucrados como sí en `/auto/:id`) y evita crear 6 rutas nuevas para contenido que probablemente crezca poco. El estado del modal es local a `Trabajos.tsx`, no deep-linkeable — si más adelante se quiere compartir un trabajo puntual, se puede sumar un query param sin tocar el resto.
- **Filtro de año en `/trabajos` construido pero oculto**: como ningún trabajo tiene `anio` cargado todavía, mostrar un `<select>` con una sola opción ("Todos los años") sería un control muerto. Se condicionó su render a que exista al menos un año real en los datos (`aniosDisponibles.length > 0`), mismo criterio que otras partes del sitio esconden secciones vacías en vez de mostrarlas rotas o inventar contenido.
- **"Eventos realizados" del plan reemplazado por "Producciones documentadas" (`TRABAJOS.length`)** en `/nosotros`: no hay un conteo real de eventos en 35 años de trayectoria en ninguna fuente del proyecto, y la regla de no inventar contenido aplica también a este tipo de números de marketing, no solo a datos de vehículos.
- **Respuestas de FAQ deliberadamente sin comprometer números concretos** (mínimo de horas, monto de seña, recargo por zona): ninguno de esos datos existe en las fuentes del proyecto, así que las respuestas derivan la conversación a WhatsApp en vez de inventar una cifra. Mismo criterio de "no inventar" aplicado a texto de política, no solo a datos de vehículos.
- **Mapa de `/contacto` con `<iframe>` de Google Maps sin API key** (`google.com/maps?q=...&output=embed`), apuntado a `SITE.direccion` (hoy "Villa Devoto, CABA", un valor genérico de zona, no una dirección real del cliente). Se prefirió esto a integrar una librería de mapas (Leaflet, Google Maps JS SDK) por ser "mapa embebido simple", tal cual pide el plan.
- **`ConsultaProvider` se movió de `main.tsx` a `Layout`** (Fase 9): con rutas basadas en objetos (`RouteRecord[]`) ya no hay un único árbol JSX en `main.tsx` para envolver con el provider: el layout raíz (`Component` de la ruta `/`, con `<Outlet />`) es ahora ese punto único, ya que envuelve a todas las páginas por diseño.
- **Performance de imágenes (WebP, lazy, blur) explícitamente no implementada en Fase 9**: bloqueada por la falta de fotos reales (ver detalle arriba). No se trató como "no aplica y listo": quedó registrada como pendiente concreta a retomar cuando el cliente entregue las fotos.
- **`nombreConAnio()` centralizado en `lib/vehiculos.ts`**: corrige un bug de Fase 6 (duplicaba el año cuando ya estaba en el nombre, ej. "Hupmobile 1930 1930") que afectaba tanto los mensajes de WhatsApp como los títulos SEO nuevos de Fase 9. Un solo helper para las dos fases, en vez de mantener la lógica duplicada e inconsistente que había.
- **`index.html` sin `<title>`/`<meta description>` estáticos** (Fase 9): los ponía cada página vía `Head`, pero `vite-react-ssg` no borra lo que ya está en el template, así que quedaban duplicados en el HTML prerenderizado. Se sacaron del `index.html`; ahora el único título/description válido es el que arma `src/lib/seo.tsx` por ruta.

---

## Pendientes y deuda técnica

- Migrar `main.tsx`/`vite.config.ts` a `vite-react-ssg` para habilitar el pre-render (mencionado en el plan pero no ejecutado aún; necesario para deployar a producción más adelante, sea cual sea el hosting elegido).
- **Probar el Catálogo (Fase 4) en navegador**: no se hizo esta sesión (ver "Catálogo (Fase 4)" arriba). Verificar buscador con debounce, cada grupo de filtros, drawer mobile, "Ver más vehículos" y el toggle "Agregar a consulta" en desktop y mobile antes de mergear.
- **Probar la Página de modelo (Fase 5) en navegador**: tampoco se hizo esta sesión (ver "Página de modelo (Fase 5)" arriba). Falta verificar la galería/lightbox (flechas, swipe, teclado) con fotos reales, el botón Compartir en un navegador con y sin Web Share API, y el estado de "vehículo no encontrado".
- **Probar el Motor de WhatsApp (Fase 6) en navegador**: tampoco se hizo esta sesión. Falta verificar: botón flotante desktop (incluido el popover editable) vs. StickyBar mobile (que no se pisen/dupliquen), que el contador del Header y StickyBar se actualice en vivo al tocar "Agregar a consulta" desde distintas páginas, el flujo completo de `/consulta` (agregar varios, completar el formulario opcional, confirmar el texto final que llega a WhatsApp) y que la consulta efectivamente se pierda al cerrar la pestaña (por el cambio a `sessionStorage`).
- **Probar Nosotros y Trabajos (Fase 7) en navegador**: tampoco se hizo esta sesión. Falta verificar la grilla y los filtros de `/trabajos` (chips de tipo, que el select de año se mantenga oculto), el modal (abrir/cerrar con click afuera/Escape/botón X) y que el trabajo con vehículo vinculado (`diarios-de-motocicleta`) muestre bien la card de `VehiculoCard` dentro del modal.
- **Probar FAQ y Contacto (Fase 8) en navegador**: tampoco se hizo esta sesión. Falta verificar el acordeón de `/faq` (que abra/cierre bien, que solo una pregunta quede abierta a la vez) y que el `<iframe>` de Google Maps en `/contacto` cargue correctamente (algunos entornos/red corporativa bloquean `google.com/maps` embebido).
- `NotFound` sigue siendo el único placeholder sin contenido real. Todas las demás páginas (`Home`, `Catalogo`, `Auto`, `Consulta`, `Nosotros`, `Trabajos`, `Faq`, `Contacto`) ya tienen contenido real.
- **Imágenes en WebP + `loading="lazy"` + `width`/`height` + blur placeholder (pendiente de Fase 9)**: bloqueado hasta tener fotos reales de los 206 vehículos, ver "SEO + Performance + Analytics (Fase 9)" arriba. Cuando lleguen las fotos, van a hacer falta dos cosas a la vez: las fotos en sí, y decidir si se vuelve a `<img>` (para poder usar `loading="lazy"`/`width`/`height` de verdad) o si se mantiene `background-image` y se busca otra forma de lazy-load.
- **`Lighthouse ≥ 90 Performance / ≥ 95 SEO-Accesibilidad` (objetivo de Fase 9) no medido esta sesión**: no se corrió Lighthouse (no hay navegador disponible, ver nota de Playwright). Correrlo cuando haya forma de abrir el sitio en un Chrome real, idealmente ya con fotos reales cargadas.
- **Cuenta de Plausible real**: el script está integrado en `index.html` pero con `data-domain="localhost"` (placeholder). No va a registrar datos hasta que exista una cuenta de Plausible con el dominio real configurado — actualizar junto con `SITE.url` cuando se defina el hosting.
- **Alerta para la Fase 10 (checklist de marca):** el plan pide que `grep -ri "hupmobile.com.ar" .` devuelva 0 resultados, pero `src/data/trabajos.ts` ya tiene varias URLs `https://hupmobile.com.ar/...` en el campo `fuente` (agregadas en Fase 2, documentadas como "solo trazabilidad interna, no se muestra en UI"). Hoy no se renderizan en ningún lado (confirmado en Fase 7), pero técnicamente SÍ están en el código fuente, así que ese grep del checklist va a encontrarlas. Decidir en Fase 10 si se borra el campo `fuente` de esos 4 registros o si se ajusta el criterio del checklist — no se tocó esta sesión porque es una decisión de la fase de QA, no de SEO.
- **Probar el sitio prerenderizado (Fase 9) en un navegador real**: se verificó todo con `curl`/`grep` sobre los archivos generados y con `vite preview`, pero no se abrió visualmente. Falta confirmar que la hidratación del lado del cliente funciona sin errores de consola (mismatch de SSR vs cliente) en las 221 páginas, especialmente en `/auto/:id` y `/catalogo/:categoria` que dependen de `getStaticPaths`.
- Faltan las fotos reales de los 206 vehículos, las 8 categorías, los 6 trabajos y una imagen de hero para la Home (ver `PENDIENTES-CLIENTE.md`).
- Revisar con el cliente los 10 posibles duplicados/datos inciertos listados en `PENDIENTES-CLIENTE.md`.
- Definir `capacidad` y `eventos` reales por vehículo (hoy son estimaciones conservadoras por categoría).
- Revisar con el cliente la selección de 8 `destacado` hecha en Fase 3 y conseguir testimonios reales para "Prueba social" (ver `PENDIENTES-CLIENTE.md`).
