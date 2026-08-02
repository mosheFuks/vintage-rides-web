import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

const STORAGE_KEY = "consulta-vehiculos";

function leerIds(): string[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

interface ConsultaContextValue {
  ids: string[];
  estaEnConsulta: (id: string) => boolean;
  toggleConsulta: (id: string) => void;
  quitarDeConsulta: (id: string) => void;
  vaciarConsulta: () => void;
}

const ConsultaContext = createContext<ConsultaContextValue | null>(null);

export function ConsultaProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>(() => leerIds());

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  }, [ids]);

  function estaEnConsulta(id: string): boolean {
    return ids.includes(id);
  }

  function toggleConsulta(id: string): void {
    setIds((actuales) =>
      actuales.includes(id) ? actuales.filter((i) => i !== id) : [...actuales, id]
    );
  }

  function quitarDeConsulta(id: string): void {
    setIds((actuales) => actuales.filter((i) => i !== id));
  }

  function vaciarConsulta(): void {
    setIds([]);
  }

  return (
    <ConsultaContext.Provider
      value={{ ids, estaEnConsulta, toggleConsulta, quitarDeConsulta, vaciarConsulta }}
    >
      {children}
    </ConsultaContext.Provider>
  );
}

export function useConsulta(): ConsultaContextValue {
  const contexto = useContext(ConsultaContext);
  if (!contexto) throw new Error("useConsulta debe usarse dentro de ConsultaProvider");
  return contexto;
}
