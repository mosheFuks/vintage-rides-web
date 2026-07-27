# Contexto del proyecto

Web de alquiler de vehículos para eventos. React 18 + TypeScript + Vite + Tailwind + vite-react-ssg. Deploy: sin definir todavía, el proyecto es 100% local por ahora.

## ⛔ NO EXPLORES EL PROYECTO

El mapa está acá abajo. **No hagas búsquedas ni listados de directorios para orientarte al arrancar.**
Leé únicamente los archivos que el mapa indique como relevantes para la tarea pedida, y `ESTADO.md`.

Archivos que **nunca** se leen salvo pedido explícito:
- `docs/inventario-vehiculos.json` — ya fue convertido a `src/data/vehiculos.ts`. No volver a leerlo.
- `src/data/vehiculos.ts` — 206 registros. Si necesitás la forma del dato, está en `src/types/index.ts`.
- `docs/PLAN-CLAUDE-CODE.md` — leer SOLO la fase que se está ejecutando, no el archivo entero.

## Mapa

```
src/
  config/site.ts        Marca, teléfono, mail, URL base. Única fuente de datos del negocio.
  types/index.ts        Vehiculo, Trabajo, CategoriaId, TipoEvento
  data/
    vehiculos.ts        206 vehículos (NO LEER COMPLETO)
    categorias.ts       Las 8 categorías
    trabajos.ts         Producciones y eventos realizados
    faq.ts / about.ts   Textos editables
  lib/
    vehiculos.ts        getPorCategoria, getPorId, buscar, filtrar
    whatsapp.ts         Armado de todos los mensajes de wa.me
    analytics.ts        Wrapper de eventos
  components/           UI reutilizable
  pages/                Una por ruta
```

## Reglas fijas

1. **Nunca mergear a `main`.** Rama por fase (`feat/fase-N-nombre`), commit, push, avisar.
2. **Nunca inventar vehículos, años, colores ni capacidades.** Solo lo que está en `vehiculos.ts`. Si un `anio` es `null`, se omite en la UI.
3. **Nada de la marca real del cliente** en el código: ni mail, ni dominio viejo, ni dirección, ni redes. Todo sale de `site.ts`.
4. No escribir tests salvo pedido explícito.
5. No usar `<form>` con submit nativo. Todo con `onClick`.
6. Reutilizar componentes antes de crear nuevos.
7. No imprimir archivos completos en el chat. Solo diffs o resumen de 2-3 líneas.

## Al terminar cada fase

Último paso, siempre: actualizar `ESTADO.md` con lo que quedó hecho, los archivos nuevos y las decisiones tomadas. Es lo que permite que la próxima sesión arranque sin explorar.
