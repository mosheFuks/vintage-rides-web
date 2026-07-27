import { SITE } from "./config/site";

function App() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-neutral-950 px-6 text-center text-neutral-100">
      <h1 className="text-3xl font-semibold tracking-wide uppercase">
        {SITE.nombre}
      </h1>
      <p className="text-neutral-400">{SITE.tagline}</p>
      <p className="text-sm text-neutral-500">Sitio en construcción</p>
    </main>
  );
}

export default App;
