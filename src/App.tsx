import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Home } from "./pages/Home";
import { Catalogo } from "./pages/Catalogo";
import { Auto } from "./pages/Auto";
import { Nosotros } from "./pages/Nosotros";
import { Trabajos } from "./pages/Trabajos";
import { Faq } from "./pages/Faq";
import { Contacto } from "./pages/Contacto";
import { Consulta } from "./pages/Consulta";
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/catalogo/:categoria" element={<Catalogo />} />
        <Route path="/auto/:id" element={<Auto />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/trabajos" element={<Trabajos />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/consulta" element={<Consulta />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

export default App;
