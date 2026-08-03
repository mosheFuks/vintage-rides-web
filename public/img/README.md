# Imágenes del sitio

Esta carpeta se sirve tal cual en la raíz del sitio (`/img/...`). No se procesan ni optimizan automáticamente: subir los archivos ya en el formato/tamaño final.

## Estructura

- `hero/home.jpg` — imagen de fondo del hero de la Home.
- `categorias/{id}.jpg` — una por cada una de las 8 categorías (`src/data/categorias.ts`). El nombre de archivo tiene que coincidir con el `id` de la categoría.
- `trabajos/{id}.jpg` — una por cada trabajo (`src/data/trabajos.ts`). El nombre de archivo tiene que coincidir con el `id` del trabajo.
- `vehiculos/{id}/` — una carpeta por cada uno de los 206 vehículos (`src/data/vehiculos.ts`), ya creadas y vacías (con un `.gitkeep` para que no se pierdan en git). El nombre de la carpeta coincide con el `id` del vehículo.

## Cómo cargar fotos de un vehículo

1. Poner la primera foto como `vehiculos/{id}/01.jpg` (es el path que ya está cargado en `imagenes` en `vehiculos.ts` para todos los vehículos).
2. Si hay más de una foto, agregar `02.jpg`, `03.jpg`, etc., **y sumar esos paths al array `imagenes` de ese vehículo en `src/data/vehiculos.ts`** — el sitio solo muestra las imágenes que están listadas ahí, no lee la carpeta automáticamente.
3. Sacar el `.gitkeep` de la carpeta una vez que tenga fotos reales (es solo un placeholder para que la carpeta exista en git).

Formato sugerido: JPG u otro formato liviano. La conversión a WebP + `loading="lazy"` está pendiente para cuando haya fotos reales (ver `ESTADO.md`, Fase 9).
