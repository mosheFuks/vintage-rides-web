# PLAN DE CONSTRUCCIÓN — Web de Alquiler de Autos para Eventos

> Este archivo es el prompt maestro para Claude Code.
> Ejecutar **una fase por sesión**. No avanzar a la siguiente sin confirmación del usuario.

---

## ⚙️ REGLAS GLOBALES (leer siempre antes de cada fase)

### Eficiencia (importante — minimizar tokens)
- No releer archivos ya leídos en la misma sesión.
- No imprimir archivos completos en el chat; mostrar solo diffs o resúmenes de 2-3 líneas.
- No pedir confirmación intermedia dentro de una fase: ejecutar la fase completa y recién ahí reportar.
- No generar tests unitarios salvo pedido explícito.
- No crear README extensos ni documentación decorativa.
- Reutilizar componentes existentes antes de crear nuevos.

### Git
- Una rama por fase: `feat/fase-N-nombre`.
- **NUNCA** mergear a `main` automáticamente. Commitear, pushear la rama y avisar.
- Commits en español, formato: `fase-N: descripción corta`.

### Branding (crítico)
- **La marca real NO se menciona en ningún lado**: ni en el repo, ni en el código, ni en textos visibles, ni en metadatos.
- Todo nombre, teléfono, mail y redes sale de **un único archivo de configuración**: `src/config/site.ts`.
- Valores placeholder por defecto:
  ```ts
  export const SITE = {
    nombre: "Autos Especiales",
    tagline: "El encanto de viajar en el tiempo",
    whatsapp: "5491151172606",   // formato internacional sin + ni espacios
    email: "contacto@ejemplo.com",
    direccion: "Villa Devoto, CABA",
    instagram: "",
    facebook: "",
    url: "https://USUARIO.github.io/REPO",
  };
  ```

### Stack fijo
- React 18 + TypeScript + Vite
- **vite-react-ssg** (prerender estático — necesario para OG previews en WhatsApp y SEO)
- React Router v6 (integrado vía vite-react-ssg)
- Tailwind CSS
- lucide-react (íconos)
- Deploy: GitHub Pages vía GitHub Actions

---

## FASE 0 — Repo + scaffold + deploy

1. Crear repo público en GitHub con nombre neutro: **`vintage-rides-web`**.
2. Inicializar proyecto: `npm create vite@latest . -- --template react-ts`
3. Instalar: `tailwindcss @tailwindcss/vite vite-react-ssg react-router-dom lucide-react`
4. Configurar Tailwind v4 vía plugin de Vite.
5. Configurar `vite.config.ts` con `base: "/vintage-rides-web/"`.
6. Crear `src/config/site.ts` con los placeholders de arriba.
7. Crear workflow `.github/workflows/deploy.yml` (build + deploy a Pages en push a `main`).
8. Página mínima "En construcción" para validar que el deploy funciona.
9. Verificar que la URL de GitHub Pages carga OK.

**Entregable:** sitio vacío pero desplegado y accesible.

---

## FASE 1 — Sistema de diseño + layout base

### Dirección estética
Editorial oscuro, premium, con foco absoluto en la fotografía. Nada de plantilla genérica.

```
Fondo base:      #0E0E10
Superficie:      #16161A
Acento:          #C9A227  (dorado)
Acento hover:    #E0B93D
Texto principal: #F5F3EF
Texto secundario:#A0A0A8
Borde sutil:     #26262C
```

**Tipografía:** títulos `Bebas Neue` o `Oswald` (condensada, mayúsculas, tracking amplio) / cuerpo `Inter`.

**Principios:**
- Imágenes a sangre completa, sin bordes redondeados excesivos (máx `rounded-lg`).
- Mucho aire vertical. Secciones separadas por `py-20` desktop / `py-12` mobile.
- Transiciones sutiles (200ms). Sin animaciones llamativas.
- Grillas: 1 col mobile / 2 tablet / 3 desktop.

### Componentes a crear
- `Layout` (wrapper con header + footer + sticky bar)
- `Header` — logo texto, nav, menú hamburguesa mobile
- `Footer` — contacto, redes, links a secciones
- `StickyBar` (solo mobile, fija abajo): botón WhatsApp general + contador de consulta múltiple
- `Container`, `SectionTitle`, `Button` (variantes: primary / outline / whatsapp)

**Entregable:** layout navegable con páginas vacías.

---

## FASE 2 — Modelo de datos

Crear `src/data/vehiculos.ts` y `src/types/index.ts`. **Todo el contenido vive acá**, ningún componente hardcodea datos.

```ts
export type CategoriaId =
  | "antiguos"
  | "clasicos"
  | "limousinas"
  | "modernos"
  | "lujo"
  | "clasicos-argentinos"
  | "motos"
  | "camionetas";

export type TipoEvento =
  | "casamiento" | "quince" | "cine" | "publicidad"
  | "turismo" | "aniversario" | "corporativo";

export interface Trabajo {
  id: string;
  titulo: string;          // "Publicidad Quilmes 2023"
  tipo: TipoEvento;
  anio: number;
  imagen: string;
  descripcion?: string;
  vehiculosIds: string[];  // vincula trabajo <-> autos usados
}

export interface Vehiculo {
  id: string;              // slug: "hupmobile-1930"
  nombre: string;          // "Hupmobile"
  anio: number;
  categoria: CategoriaId;
  decada: number;          // 1930
  capacidad: number;       // pasajeros
  convertible: boolean;
  colores: string[];
  eventos: TipoEvento[];
  descripcionCorta: string;  // 1 línea, para la card
  descripcionLarga: string;  // 2-3 párrafos, para la página del modelo
  imagenes: string[];        // 1ra = principal
  destacado: boolean;
}
```

Crear también `src/data/categorias.ts` (id, nombre, descripción, imagen de portada) y `src/data/trabajos.ts`.

### ⛔ REGLA CRÍTICA DE CONTENIDO
**Cargar EXCLUSIVAMENTE los vehículos listados en `inventario-vehiculos.json`.**
- Prohibido inventar vehículos, años, colores o capacidades que no figuren ahí.
- Si un campo viene en `null` (típicamente `anio`), dejarlo en `null` y **omitirlo en la UI**. No estimar.
- `descripcionCorta` y `descripcionLarga` sí se redactan (son texto comercial), pero solo con datos verificables del JSON: marca, modelo, año si existe, color, si es convertible y la nota.
- `capacidad` y `eventos` que no estén en el JSON: dejar valores conservadores y marcarlos con `// TODO verificar con cliente`.

> **Nota sobre el nombre "Hupmobile":** es a la vez la marca del cliente y un modelo real de la flota. El vehículo `hupmobile-1930` **se mantiene** (es un auto). Lo que NO puede aparecer es la marca como identidad del sitio: nombre de la empresa, mail, Instagram, Facebook, ni el dominio viejo. El check de Fase 10 se ajusta a eso.

Las 8 categorías (nombre exacto y cantidad real de vehículos):
1. Autos antiguos — 27
2. Autos clásicos — 44
3. Limousinas y colectivos antiguos — 11
4. Autos modernos — 15
5. Autos de lujo — 6
6. Clásicos argentinos — 61
7. **Motos y bicicletas** — 18 *(la categoría incluye bicicletas, no solo motos)*
8. Camionetas, kombis y jeeps — 24

**Total: 206 vehículos.** Con este volumen, el buscador y los filtros de la Fase 4 no son opcionales: son el eje de la navegación. La grilla de catálogo debe paginar o usar scroll infinito (lotes de 24).

Varios vehículos aparecen en más de una categoría en el sitio original (campo `tambienEn`). Manejarlos como **un solo registro** que puede listarse en varias categorías, nunca duplicando la URL.

Los registros con `nota` que empieza en "VERIFICAR" son posibles duplicados del sitio viejo: cargarlos igual, pero listarlos en un archivo `PENDIENTES-CLIENTE.md` para consultarle al dueño.

Helpers en `src/lib/vehiculos.ts`: `getPorCategoria`, `getPorId`, `buscar`, `filtrar`, `getTrabajosDeVehiculo`.

---

## FASE 3 — Home

Secciones en orden:
1. **Hero** — imagen full-screen, tagline, 2 CTAs (Ver catálogo / WhatsApp)
2. **Grilla de 8 categorías** — card con imagen de portada + nombre + cantidad de vehículos
3. **Destacados** — carrusel horizontal de vehículos `destacado: true`
4. **Prueba social** — contador de eventos realizados + 3 testimonios + strip de trabajos recientes
5. **CTA final** — bloque de contacto con WhatsApp

---

## FASE 4 — Catálogo + buscador + filtros

Ruta `/catalogo` y `/catalogo/:categoria`.

- **Buscador** por nombre y año (input con debounce 300ms, match parcial case-insensitive).
- **Filtros** (sidebar desktop / drawer mobile):
  - Categoría (multi)
  - Tipo de evento (multi)
  - Década (multi)
  - Capacidad mínima (slider)
  - Convertible (toggle)
  - Color (multi)
- Contador de resultados + botón "Limpiar filtros".
- Estado de filtros sincronizado con **query params** en la URL (compartible).
- Estado vacío diseñado ("No encontramos vehículos con esos filtros").
- Cada card: imagen, nombre + año, descripción corta, botón "Ver más" + botón "+ Agregar a consulta".

---

## FASE 5 — Página de modelo

Ruta `/auto/:id` — **cada vehículo tiene su URL propia y prerenderizada.**

Estructura:
1. Galería con lightbox (flechas, swipe en mobile, contador de fotos)
2. Nombre + año + categoría (breadcrumb arriba)
3. Ficha técnica: capacidad, colores disponibles, convertible, década
4. Descripción larga
5. Chips de tipos de evento recomendados
6. **Trabajos realizados con este vehículo** — grilla filtrada desde `trabajos.ts`
7. Botonera fija/destacada: **Consultar por WhatsApp** + **Agregar a consulta múltiple** + **Compartir** (Web Share API con fallback a copiar link)
8. **Vehículos relacionados** (misma categoría, 3 items)

Meta tags OG dinámicas por vehículo (título, descripción, imagen) — se resuelven en Fase 9.

---

## FASE 6 — Motor de WhatsApp (núcleo del negocio)

Crear `src/lib/whatsapp.ts`. Toda URL se arma con `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(msg)}`.

### 6.1 — Botón general
Flotante desktop (esquina inferior derecha) + en StickyBar mobile.
```
Hola! Te quería hacer una consulta sobre el alquiler de autos.
```

### 6.2 — Consulta por modelo
```
Hola! Te quería consultar por la disponibilidad del modelo {nombre} {año}.
{URL_DEL_MODELO}
```
La URL absoluta se arma con `SITE.url + /auto/ + id`.

### 6.3 — Consulta múltiple ("carrito")
- Context `ConsultaContext` + `useConsulta()` hook. Persistir en `sessionStorage`.
- Botón "+ Agregar a consulta" en cards y página de modelo (toggle add/remove).
- Contador visible en Header (desktop) y StickyBar (mobile).
- Panel/drawer `/consulta` con la lista de seleccionados, miniatura, botón quitar.
- Mensaje generado:
```
Hola! Te quería consultar por la disponibilidad de estos modelos:

1. {nombre} {año}
{url}

2. {nombre} {año}
{url}
```

### 6.4 — Formulario previo (opcional, antes de enviar)
Campos: fecha del evento, zona, tipo de evento (select), duración estimada (horas), comentario libre. Todos opcionales — **nunca bloquear el envío**.

Mensaje final con datos completados:
```
Hola! Te quería consultar por la disponibilidad de estos modelos:

1. {nombre} {año}
{url}

📅 Fecha: {fecha}
📍 Zona: {zona}
🎉 Evento: {tipo}
⏱ Duración: {horas} hs
💬 {comentario}
```

**Regla:** cero uso de `<form>` con submit nativo. Todo con `onClick`.

---

## FASE 7 — About + Trabajos realizados

Ruta `/nosotros`:
- Historia de la empresa (texto placeholder editable en `src/data/about.ts`)
- Números: años de trayectoria, eventos realizados, vehículos en flota
- Qué incluye el servicio (chofer, decoración, cobertura, etc.)

Ruta `/trabajos`:
- Grilla filtrable por tipo de evento y año
- Cada trabajo abre modal/página con fotos y **links a los vehículos usados** (relación bidireccional con Fase 5)

---

## FASE 8 — FAQ + Contacto

Ruta `/faq` — acordeón. Preguntas base (editables en `src/data/faq.ts`):
- ¿Incluye chofer?
- ¿Cuál es el mínimo de horas de contratación?
- ¿Qué zonas cubren? ¿Hay recargo por distancia?
- ¿Cómo se reserva? ¿Se pide seña?
- ¿La decoración está incluida?
- ¿Se puede ver el auto antes del evento?
- ¿Qué pasa si llueve? (convertibles)
- ¿Trabajan con producciones de cine y publicidad?

Ruta `/contacto` — datos, WhatsApp, mapa embebido de zona (iframe simple), horarios.

---

## FASE 9 — SEO + Performance + Analytics

### SEO
- Migrar el entry a **vite-react-ssg** para prerenderizar todas las rutas (incluidas las de cada vehículo).
- Meta tags por ruta: `title`, `description`, `og:title`, `og:description`, `og:image`, `og:url`, `twitter:card`.
- **Schema.org JSON-LD**: `LocalBusiness` en home, `Product` en cada vehículo, `FAQPage` en FAQ.
- Generar `sitemap.xml` y `robots.txt` en build.
- URLs limpias, sin espacios, sin `.html`.
- `lang="es"` y charset UTF-8 correcto.

### Performance
- Todas las imágenes en **WebP**, con `loading="lazy"` (excepto el hero) y `width`/`height` explícitos para evitar CLS.
- Blur placeholder o skeleton mientras cargan.
- Lazy loading de rutas con `React.lazy`.
- Objetivo: **Lighthouse ≥ 90 en Performance y ≥ 95 en SEO/Accesibilidad**.

### Analytics
- Integrar **Plausible** (script liviano, sin cookies) o GA4.
- Trackear eventos custom:
  - `whatsapp_general`
  - `whatsapp_modelo` (con id del vehículo)
  - `whatsapp_multiple` (con cantidad)
  - `agregar_consulta` (con id)
  - `busqueda` (con término)
- Wrapper en `src/lib/analytics.ts` para no ensuciar los componentes.

---

## FASE 10 — QA final

- Probar en 360px, 390px, 768px, 1024px, 1440px.
- Verificar que todos los links de WhatsApp abran correctamente en iOS y Android.
- Verificar que las URLs de modelo prerenderizadas devuelvan HTML con las OG tags correctas (`curl` a la URL).
- Navegación por teclado + contraste AA.
- Corregir cualquier warning de consola.
- Checklist de marca. Deben devolver **0 resultados**:
  - `grep -ri "hupmobile30" .`
  - `grep -ri "hupmobile.com.ar" .`
  - `grep -ri "hotmail" .`
  - `grep -ri "Marcos Paz 2522" .`
  - `grep -ri "Autos Especiales" src/components src/pages`  (solo permitido en `site.ts` como placeholder editable)
  - La única aparición válida de "Hupmobile" es el vehículo `hupmobile-1930` en `vehiculos.ts`.

---

## 📋 CHECKLIST DE ARRANQUE

Antes de empezar la Fase 0, confirmar con el usuario:
- [ ] Nombre de usuario de GitHub
- [ ] Repo público o privado
- [ ] Confirmar nombre de repo: `vintage-rides-web`
