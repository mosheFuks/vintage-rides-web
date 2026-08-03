import type { RouteRecord } from "vite-react-ssg";
import { Layout } from "./components/layout/Layout";
import { VEHICULOS } from "./data/vehiculos";
import { CATEGORIAS } from "./data/categorias";

export const routes: RouteRecord[] = [
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        lazy: () => import("./pages/Home").then((m) => ({ Component: m.Home })),
      },
      {
        path: "catalogo",
        lazy: () => import("./pages/Catalogo").then((m) => ({ Component: m.Catalogo })),
      },
      {
        path: "catalogo/:categoria",
        lazy: () => import("./pages/Catalogo").then((m) => ({ Component: m.Catalogo })),
        getStaticPaths: () => CATEGORIAS.map((c) => `catalogo/${c.id}`),
      },
      {
        path: "auto/:id",
        lazy: () => import("./pages/Auto").then((m) => ({ Component: m.Auto })),
        getStaticPaths: () => VEHICULOS.map((v) => `auto/${v.id}`),
      },
      {
        path: "nosotros",
        lazy: () => import("./pages/Nosotros").then((m) => ({ Component: m.Nosotros })),
      },
      {
        path: "trabajos",
        lazy: () => import("./pages/Trabajos").then((m) => ({ Component: m.Trabajos })),
      },
      {
        path: "faq",
        lazy: () => import("./pages/Faq").then((m) => ({ Component: m.Faq })),
      },
      {
        path: "contacto",
        lazy: () => import("./pages/Contacto").then((m) => ({ Component: m.Contacto })),
      },
      {
        path: "consulta",
        lazy: () => import("./pages/Consulta").then((m) => ({ Component: m.Consulta })),
      },
      {
        path: "*",
        lazy: () => import("./pages/NotFound").then((m) => ({ Component: m.NotFound })),
      },
    ],
  },
];
