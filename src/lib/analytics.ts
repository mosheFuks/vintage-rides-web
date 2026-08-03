type EventProps = Record<string, string | number>;

declare global {
  interface Window {
    plausible?: (evento: string, opciones?: { props?: EventProps }) => void;
  }
}

export function trackEvent(nombre: string, props?: EventProps): void {
  if (typeof window === "undefined" || !window.plausible) return;
  window.plausible(nombre, props ? { props } : undefined);
}
