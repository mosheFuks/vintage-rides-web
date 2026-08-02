import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { StickyBar } from "./StickyBar";
import { WhatsappFlotante } from "./WhatsappFlotante";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-fondo text-texto">
      <Header />
      <main className="flex-1 pb-20 lg:pb-0">{children}</main>
      <Footer />
      <StickyBar />
      <WhatsappFlotante />
    </div>
  );
}
