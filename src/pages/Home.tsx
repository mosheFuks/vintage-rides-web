import { Hero } from "../components/home/Hero";
import { CategoriasGrid } from "../components/home/CategoriasGrid";
import { Destacados } from "../components/home/Destacados";
import { PruebaSocial } from "../components/home/PruebaSocial";
import { CtaFinal } from "../components/home/CtaFinal";

export function Home() {
  return (
    <>
      <Hero />
      <CategoriasGrid />
      <Destacados />
      <PruebaSocial />
      <CtaFinal />
    </>
  );
}
