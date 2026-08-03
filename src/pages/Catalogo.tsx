import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Container } from "../components/ui/Container";
import { SectionTitle } from "../components/ui/SectionTitle";
import { Button } from "../components/ui/Button";
import { VehiculoCard } from "../components/vehiculos/VehiculoCard";
import { FiltrosCatalogo } from "../components/catalogo/FiltrosCatalogo";
import { CATEGORIAS } from "../data/categorias";
import {
  filtrar,
  getCapacidadMaxima,
  getColoresDisponibles,
  getDecadasDisponibles,
} from "../lib/vehiculos";
import { Seo } from "../lib/seo";
import { trackEvent } from "../lib/analytics";
import type { CategoriaId, TipoEvento } from "../types";

const LOTE = 24;

function leerLista(params: URLSearchParams, clave: string): string[] {
  const valor = params.get(clave);
  return valor ? valor.split(",").filter(Boolean) : [];
}

export function Catalogo() {
  const { categoria: categoriaRuta } = useParams<{ categoria?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [drawerAbierto, setDrawerAbierto] = useState(false);
  const [textoInput, setTextoInput] = useState(searchParams.get("q") ?? "");

  const decadasDisponibles = useMemo(() => getDecadasDisponibles(), []);
  const coloresDisponibles = useMemo(() => getColoresDisponibles(), []);
  const capacidadMaxima = useMemo(() => getCapacidadMaxima(), []);

  // Pre-carga el filtro de categoría al entrar por /catalogo/:categoria, sin pisar una selección ya presente en la URL.
  useEffect(() => {
    if (categoriaRuta && !searchParams.get("categoria")) {
      const next = new URLSearchParams(searchParams);
      next.set("categoria", categoriaRuta);
      setSearchParams(next, { replace: true });
    }
  }, [categoriaRuta]);

  // Debounce de 300ms entre lo que se escribe y lo que se sincroniza a la URL.
  useEffect(() => {
    const id = setTimeout(() => {
      const next = new URLSearchParams(searchParams);
      if (textoInput) {
        next.set("q", textoInput);
        trackEvent("busqueda", { termino: textoInput });
      } else {
        next.delete("q");
      }
      setSearchParams(next, { replace: true });
    }, 300);
    return () => clearTimeout(id);
  }, [textoInput]);

  const categorias = leerLista(searchParams, "categoria") as CategoriaId[];
  const eventos = leerLista(searchParams, "evento") as TipoEvento[];
  const decadas = leerLista(searchParams, "decada").map(Number);
  const colores = leerLista(searchParams, "color");
  const convertible = searchParams.get("convertible") === "1";
  const capacidadMinima = Number(searchParams.get("capacidad") ?? 1);

  function actualizar(mut: (params: URLSearchParams) => void) {
    const next = new URLSearchParams(searchParams);
    mut(next);
    setSearchParams(next, { replace: true });
  }

  function toggleEnLista(clave: string, valor: string) {
    actualizar((params) => {
      const actuales = leerLista(params, clave);
      const nuevos = actuales.includes(valor)
        ? actuales.filter((v) => v !== valor)
        : [...actuales, valor];
      if (nuevos.length) params.set(clave, nuevos.join(","));
      else params.delete(clave);
    });
  }

  const resultados = useMemo(
    () =>
      filtrar({
        texto: searchParams.get("q") ?? undefined,
        categorias: categorias.length ? categorias : undefined,
        eventos: eventos.length ? eventos : undefined,
        decadas: decadas.length ? decadas : undefined,
        colores: colores.length ? colores : undefined,
        convertible: convertible || undefined,
        capacidadMinima: capacidadMinima > 1 ? capacidadMinima : undefined,
      }),
    [searchParams.toString()]
  );

  const [visibles, setVisibles] = useState(LOTE);
  useEffect(() => {
    setVisibles(LOTE);
  }, [searchParams.toString()]);

  const hayFiltrosActivos =
    categorias.length > 0 ||
    eventos.length > 0 ||
    decadas.length > 0 ||
    colores.length > 0 ||
    convertible ||
    capacidadMinima > 1 ||
    Boolean(searchParams.get("q"));

  function limpiarFiltros() {
    setTextoInput("");
    setSearchParams(new URLSearchParams(), { replace: true });
  }

  const categoriaUnica =
    categorias.length === 1 ? CATEGORIAS.find((c) => c.id === categorias[0]) : undefined;

  // Se deriva del param de ruta (no del query param, que recién se completa en un useEffect)
  // para que el título/description queden correctos en el HTML prerenderizado de cada categoría.
  const categoriaSeo = categoriaRuta ? CATEGORIAS.find((c) => c.id === categoriaRuta) : undefined;

  const propsFiltros = {
    categorias,
    onToggleCategoria: (id: CategoriaId) => toggleEnLista("categoria", id),
    eventos,
    onToggleEvento: (id: TipoEvento) => toggleEnLista("evento", id),
    decadas,
    decadasDisponibles,
    onToggleDecada: (decada: number) => toggleEnLista("decada", String(decada)),
    colores,
    coloresDisponibles,
    onToggleColor: (color: string) => toggleEnLista("color", color),
    capacidadMinima,
    capacidadMaxima,
    onCambiarCapacidad: (valor: number) =>
      actualizar((params) => {
        if (valor > 1) params.set("capacidad", String(valor));
        else params.delete("capacidad");
      }),
    convertible,
    onToggleConvertible: () =>
      actualizar((params) => {
        if (convertible) params.delete("convertible");
        else params.set("convertible", "1");
      }),
    hayFiltrosActivos,
    onLimpiar: limpiarFiltros,
  };

  return (
    <Container className="py-16 lg:py-20">
      <Seo
        title={categoriaSeo ? categoriaSeo.nombre : "Catálogo"}
        description={
          categoriaSeo
            ? categoriaSeo.descripcion
            : "Catálogo completo de vehículos de colección para alquiler: antiguos, clásicos, limousinas, motos y más."
        }
        path={categoriaSeo ? `/catalogo/${categoriaSeo.id}` : "/catalogo"}
      />
      <SectionTitle
        eyebrow="Flota"
        title={categoriaUnica ? categoriaUnica.nombre : "Catálogo"}
        description={`${resultados.length} vehículo${resultados.length === 1 ? "" : "s"} encontrado${
          resultados.length === 1 ? "" : "s"
        }`}
      />

      <div className="flex flex-col gap-10 lg:flex-row">
        <aside className="hidden w-64 shrink-0 lg:block">
          <FiltrosCatalogo {...propsFiltros} />
        </aside>

        <div className="flex-1">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-texto-secundario" />
              <input
                type="text"
                value={textoInput}
                onChange={(e) => setTextoInput(e.target.value)}
                placeholder="Buscar por nombre o año..."
                className="w-full rounded-lg border border-borde bg-superficie py-3 pl-10 pr-4 text-sm text-texto placeholder:text-texto-secundario focus:border-acento focus:outline-none"
              />
            </div>
            <button
              type="button"
              onClick={() => setDrawerAbierto(true)}
              className="flex items-center justify-center gap-2 rounded-lg border border-borde px-4 py-3 text-sm tracking-wide text-texto uppercase transition-colors duration-200 hover:border-acento lg:hidden"
            >
              <SlidersHorizontal className="size-4" />
              Filtros
            </button>
          </div>

          {resultados.length === 0 ? (
            <div className="flex flex-col items-center gap-4 rounded-lg border border-borde bg-superficie px-6 py-20 text-center">
              <p className="text-texto-secundario">No encontramos vehículos con esos filtros.</p>
              <Button variant="outline" onClick={limpiarFiltros}>
                Limpiar filtros
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {resultados.slice(0, visibles).map((vehiculo) => (
                  <VehiculoCard key={vehiculo.id} vehiculo={vehiculo} mostrarAcciones />
                ))}
              </div>
              {visibles < resultados.length && (
                <div className="mt-10 flex justify-center">
                  <Button variant="outline" onClick={() => setVisibles((v) => v + LOTE)}>
                    Ver más vehículos
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {drawerAbierto && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="absolute inset-0 bg-fondo/80" onClick={() => setDrawerAbierto(false)} />
          <div className="relative ml-auto flex h-full w-full max-w-sm flex-col overflow-y-auto bg-superficie p-6">
            <div className="mb-6 flex items-center justify-between">
              <span className="font-display text-xl tracking-wide text-texto uppercase">
                Filtros
              </span>
              <button
                type="button"
                onClick={() => setDrawerAbierto(false)}
                aria-label="Cerrar filtros"
              >
                <X className="size-6 text-texto" />
              </button>
            </div>
            <FiltrosCatalogo {...propsFiltros} />
            <Button className="mt-6 w-full" onClick={() => setDrawerAbierto(false)}>
              Ver {resultados.length} resultados
            </Button>
          </div>
        </div>
      )}
    </Container>
  );
}
