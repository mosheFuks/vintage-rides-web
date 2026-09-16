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
- **`destacado`**: en Fase 3 se marcaron 8 vehículos en `true` (uno por categoría) para la sección "Destacados" de la Home. Tras reducir el catálogo (ver más abajo), quedan 3: `ford-t-1924`, `citroen-c4-lounge`, `limousine-lincoln-1989`. Es una curación editorial provisoria (sin fotos reales todavía); revisar con el cliente si prefiere otros modelos.

## Reducción de categorías (post Fase 9)

A pedido del cliente, el catálogo quedó limitado a 3 de las 8 categorías originales. Primero se probó con **Autos antiguos**, **Autos clásicos** y **Limousinas y colectivos antiguos**; después el cliente pidió cambiar Clásicos por **Autos modernos**, así que la selección final quedó en **Autos antiguos**, **Autos modernos** y **Limousinas y colectivos antiguos**. Los 44 vehículos de Clásicos se eliminaron y los 15 de Modernos se recuperaron del historial de git (commit `d28ee5a`, tip de `main`). `src/data/vehiculos.ts` quedó con 53 vehículos en total; `src/data/categorias.ts` y el tipo `CategoriaId` (`src/types/index.ts`) se ajustaron a juego. Los datos de las categorías descartadas (clásicos, lujo, clásicos argentinos, motos, camionetas) ya no están en el repo, pero siguen recuperables desde `d28ee5a` si el cliente pide reincorporar alguna más adelante.

## Home (Fase 3)

- La sección "Prueba social" del plan pide 3 testimonios. No hay testimonios reales en ninguna fuente del proyecto, así que **no se inventaron**: se implementaron solo estadísticas derivadas de los datos reales (años de trayectoria desde 1991, cantidad de vehículos, cantidad de categorías) y el strip de trabajos. Pedir al cliente 2-3 testimonios reales de clientes para agregar esa pieza.
- El hero y las imágenes de categorías/destacados/trabajos referencian paths placeholder (`/img/hero/home.jpg`, etc.) que todavía no existen como archivos; hasta que se carguen fotos reales, esas zonas se ven como fondo sólido (color `superficie`), sin ícono de imagen rota.

## Trabajos (`src/data/trabajos.ts`)

Ninguno de los 6 trabajos confirmados tenía año ni imagen en el original:

- `anio` quedó en `null` en los 6 (no inventar).
- `imagen` es un placeholder `/img/trabajos/{id}.jpg` pendiente de reemplazo.
- Solo `diarios-de-motocicleta` tiene `vehiculosIds` explícito (`norton-1948`); el resto quedó con `vehiculosIds: []` porque el original no vinculaba autos puntuales.
