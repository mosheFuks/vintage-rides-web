import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import type {} from 'vite-react-ssg/node'
import { SITE } from './src/config/site'
import { VEHICULOS } from './src/data/vehiculos'
import { CATEGORIAS } from './src/data/categorias'
import type { Categoria, Vehiculo } from './src/types'

const RUTAS_ESTATICAS = [
  '/',
  '/catalogo',
  '/nosotros',
  '/trabajos',
  '/faq',
  '/contacto',
  '/consulta',
]

function generarSitemap(): string {
  const rutas = [
    ...RUTAS_ESTATICAS,
    ...CATEGORIAS.map((c: Categoria) => `/catalogo/${c.id}`),
    ...VEHICULOS.map((v: Vehiculo) => `/auto/${v.id}`),
  ]

  const urls = rutas
    .map((ruta) => `  <url><loc>${SITE.url}${ruta}</loc></url>`)
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

function generarRobots(): string {
  return `User-agent: *\nAllow: /\n\nSitemap: ${SITE.url}/sitemap.xml\n`
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  ssgOptions: {
    // Rutas limpias: /auto/hupmobile-1930/index.html en vez de /auto/hupmobile-1930.html
    dirStyle: 'nested',
    async onFinished(dir: string) {
      await writeFile(path.join(dir, 'sitemap.xml'), generarSitemap(), 'utf-8')
      await writeFile(path.join(dir, 'robots.txt'), generarRobots(), 'utf-8')
    },
  },
})
