import { Hero } from "../components/home/Hero";
import { CategoriasGrid } from "../components/home/CategoriasGrid";
import { Destacados } from "../components/home/Destacados";
import { PruebaSocial } from "../components/home/PruebaSocial";
import { CtaFinal } from "../components/home/CtaFinal";
import { Seo } from "../lib/seo";
import { SITE } from "../config/site";

export function Home() {
  return (
    <>
      <Seo
        title={SITE.tagline}
        description="Alquiler de vehículos de colección para bodas, producciones audiovisuales y eventos especiales, con chofer incluido."
        path="/"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: SITE.nombre,
          description: SITE.tagline,
          email: SITE.email,
          telephone: `+${SITE.whatsapp}`,
          address: { "@type": "PostalAddress", addressLocality: SITE.direccion },
          url: SITE.url,
        }}
      />
      <Hero />
      <CategoriasGrid />
      <Destacados />
      <PruebaSocial />
      <CtaFinal />
    </>
  );
}
