import { Head } from "vite-react-ssg";
import { SITE } from "../config/site";

interface SeoProps {
  title: string;
  description: string;
  path: string;
  imagen?: string;
  tipo?: "website" | "product";
  jsonLd?: Record<string, unknown>;
  noindex?: boolean;
}

export function Seo({ title, description, path, imagen, tipo = "website", jsonLd, noindex }: SeoProps) {
  const url = `${SITE.url}${path}`;
  const tituloCompleto = path === "/" ? title : `${title} | ${SITE.nombre}`;
  const imagenAbsoluta = `${SITE.url}${imagen ?? "/img/hero/home.jpg"}`;

  return (
    <Head>
      <title>{tituloCompleto}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      <meta property="og:type" content={tipo} />
      <meta property="og:title" content={tituloCompleto} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imagenAbsoluta} />
      <meta property="og:url" content={url} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={tituloCompleto} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imagenAbsoluta} />

      {jsonLd && (
        // eslint-disable-next-line react-dom/no-dangerously-set-innerhtml
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Head>
  );
}
