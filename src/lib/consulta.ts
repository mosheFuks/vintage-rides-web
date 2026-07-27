const STORAGE_KEY = "consulta-vehiculos";

function leerIds(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function guardarIds(ids: string[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

export function estaEnConsulta(id: string): boolean {
  return leerIds().includes(id);
}

/** Agrega o quita el id de la consulta guardada y devuelve el nuevo estado (true = agregado). */
export function toggleConsulta(id: string): boolean {
  const ids = leerIds();
  const index = ids.indexOf(id);
  if (index >= 0) {
    ids.splice(index, 1);
    guardarIds(ids);
    return false;
  }
  ids.push(id);
  guardarIds(ids);
  return true;
}
