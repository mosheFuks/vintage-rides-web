import { Placeholder } from "../components/ui/Placeholder";
import { Seo } from "../lib/seo";

export function NotFound() {
  return (
    <>
      <Seo
        title="Página no encontrada"
        description="La página que buscás no existe o fue movida."
        path="/404"
        noindex
      />
      <Placeholder titulo="Página no encontrada" />
    </>
  );
}
