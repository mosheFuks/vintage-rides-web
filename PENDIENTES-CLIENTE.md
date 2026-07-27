# Pendientes para consultar al cliente

> Generado en Fase 2 a partir de `docs/inventario-vehiculos.json`. Ese archivo no se vuelve a leer; esta lista es la referencia a partir de ahora.

## Posibles duplicados / datos a confirmar

Vehículos cargados igual (un registro cada uno, sin fusionar), pero con una nota en el original que sugiere revisión:

| id | nombre | nota original |
|---|---|---|
| `nsu-prinz-1962` | NSU Prinz 1962 | El sitio original lo lista también en clásicos como NSU Prinz 1961 — VERIFICAR AÑO CON EL CLIENTE |
| `renault-4-b` | Renault 4 (2) | El original lista dos Renault 4 — VERIFICAR SI SON DISTINTOS |
| `taunus-cupe-b` | Ford Taunus Cupé (2) | VERIFICAR duplicado con taunus-cupe-a |
| `mg-convertible-moderno` | MG Convertible | VERIFICAR si es el mismo que mg-1979-conv |
| `jeep-renegade-b` | Jeep Renegade (2) | VERIFICAR duplicado / color distinto |
| `renault-duster-b` | Renault Duster (2) | VERIFICAR duplicado / color distinto |
| `ford-territory-b` | Ford Territory (2) | VERIFICAR duplicado / color distinto |
| `rastrojero-b` | Rastrojero (2) | VERIFICAR duplicado con rastrojero-a |
| `ninja-b` | Kawasaki Ninja (2) | VERIFICAR duplicado con ninja-a |
| `honda` | Honda | Modelo sin especificar en el original — CONSULTAR CLIENTE |

## Datos que no estaban en el inventario original

Estos campos no existían en `docs/inventario-vehiculos.json` y se completaron con valores conservadores por categoría, marcados `// TODO verificar con cliente` en `src/data/vehiculos.ts`:

- **`capacidad`** (pasajeros): estimada por tipo de vehículo (autos/clásicos → 4, motos → 2, bicicletas → 1, colectivos → 20, limousinas → 6, kombis/motor homes → 8, jeeps → 4, resto de camionetas → 3).
- **`eventos`**: cuando el original no especificaba, se asignó un default conservador por categoría (ver `DEFAULT_EVENTOS` usado al generar el archivo).
- **`imagenes`**: no hay fotos todavía. Se dejó un path placeholder `/img/vehiculos/{id}/01.jpg` por vehículo — hay que cargar las fotos reales y actualizar las rutas.
- **`destacado`**: todos en `false` por ahora. La selección de destacados para la Home queda pendiente (Fase 3).

## Trabajos (`src/data/trabajos.ts`)

Ninguno de los 6 trabajos confirmados tenía año ni imagen en el original:

- `anio` quedó en `null` en los 6 (no inventar).
- `imagen` es un placeholder `/img/trabajos/{id}.jpg` pendiente de reemplazo.
- Solo `diarios-de-motocicleta` tiene `vehiculosIds` explícito (`norton-1948`); el resto quedó con `vehiculosIds: []` porque el original no vinculaba autos puntuales.
