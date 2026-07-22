import type { Metadata, Viewport } from "next";
import { Big_Shoulders_Display, Archivo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RouteLoadingBar } from "@/components/layout/RouteLoadingBar";
import { PageTransition } from "@/components/layout/PageTransition";
import { CartProvider } from "@/components/cart/CartContext";
import { CartDrawer } from "@/components/cart/CartDrawer";

const display = Big_Shoulders_Display({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

const body = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0A0B0D",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Paulin Gostosin 🔥 — Os Mantos Mais Gostosos do Futebol",
  description:
    "E-commerce oficial do Paulin Gostosin. As camisas de futebol mais estilosas, raras e gostosas dos maiores clubes e seleções do planeta.",
  keywords: ["camisas de futebol", "mantos oficiais", "brasileirao 2026", "premier league", "la liga", "paulin gostosin", "camisas retro"],
  authors: [{ name: "Paulin Gostosin" }],
  metadataBase: new URL("http://localhost:3000"),
  openGraph: {
    title: "Paulin Gostosin 🔥 — Os Mantos Mais Gostosos do Futebol",
    description: "As camisas de futebol mais estilosas, raras e gostosas dos maiores clubes e seleções do planeta.",
    url: "http://localhost:3000",
    siteName: "Paulin Gostosin 🔥",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Paulin Gostosin 🔥 — Os Mantos Mais Gostosos do Futebol",
    description: "As camisas de futebol mais estilosas, raras e gostosas do planeta.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <CartProvider>
          <RouteLoadingBar />
          <Header />
          <div className="pt-20 md:pt-24">
            <PageTransition>{children}</PageTransition>
          </div>
          <Footer />
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
