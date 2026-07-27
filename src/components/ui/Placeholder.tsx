import { Container } from "./Container";
import { SectionTitle } from "./SectionTitle";

interface PlaceholderProps {
  titulo: string;
}

export function Placeholder({ titulo }: PlaceholderProps) {
  return (
    <Container className="py-20 lg:py-32">
      <SectionTitle eyebrow="Próximamente" title={titulo} align="center" />
    </Container>
  );
}
