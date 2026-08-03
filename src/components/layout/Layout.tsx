import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { StickyBar } from "./StickyBar";
import { WhatsappFlotante } from "./WhatsappFlotante";
import { ConsultaProvider } from "../../lib/consulta";

export function Layout() {
  return (
    <ConsultaProvider>
      <div className="flex min-h-screen flex-col bg-fondo text-texto">
        <Header />
        <main className="flex-1 pb-20 lg:pb-0">
          <Outlet />
        </main>
        <Footer />
        <StickyBar />
        <WhatsappFlotante />
      </div>
    </ConsultaProvider>
  );
}
