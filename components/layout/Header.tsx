"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { MegaMenu } from "./MegaMenu";
import { SearchOverlay } from "./SearchOverlay";
import { MobileMenu } from "./MobileMenu";
import { CartBadge } from "./CartBadge";
import { clubes, selecoes } from "@/mock/navegacao";

type MenuAberto = "clubes" | "selecoes" | null;

/**
 * Header — comportamento de scroll "compactação inteligente":
 * - No topo da página: alto, transparente, respira com o hero.
 * - Ao passar de 80px: compacta (altura menor, fundo com blur, borda).
 * - Ao descer rápido além de 200px: some (translateY -100%).
 * - Ao subir (mesmo que pouco): reaparece imediatamente.
 * Isso mantém a navegação sempre acessível sem competir com o hero
 * dos times, que costuma ser a peça mais forte da página.
 */
export function Header() {
  const [compacto, setCompacto] = useState(false);
  const [escondido, setEscondido] = useState(false);
  const [menuAberto, setMenuAberto] = useState<MenuAberto>(null);
  const [buscaAberta, setBuscaAberta] = useState(false);
  const [mobileAberto, setMobileAberto] = useState(false);
  const ultimoScrollY = useRef(0);

  useEffect(() => {
    let ticking = false;

    function handleScroll() {
      const y = window.scrollY;
      setCompacto(y > 80);

      const diff = y - ultimoScrollY.current;
      if (y > 200 && diff > 4) {
        setEscondido(true);
        setMenuAberto(null);
      } else if (diff < -4 || y < 200) {
        setEscondido(false);
      }
      ultimoScrollY.current = y;
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        animate={{ y: escondido ? "-100%" : "0%" }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        onMouseLeave={() => setMenuAberto(null)}
        className={cn(
          "fixed top-0 left-0 right-0 z-[60] border-b transition-[height,background-color,border-color] duration-300 ease-sprint",
          compacto
            ? "h-16 bg-ink/92 backdrop-blur-md border-border"
            : "h-20 md:h-24 bg-transparent border-transparent"
        )}
      >
        <div className="container mx-auto max-w-[1440px] h-full px-5 sm:px-6 lg:px-10 flex items-center justify-between">
          <Link
            href="/"
            className="group flex items-center gap-2 select-none"
          >
            <span className="font-display font-black uppercase text-2xl md:text-3xl tracking-tighter text-chalk group-hover:text-flood transition-colors duration-quick">
              FUT<span className="text-flood">.</span>
            </span>
            <span className="rounded-md bg-gradient-to-r from-flood via-amber-400 to-yellow-300 text-ink font-mono text-[0.7rem] md:text-caption font-black uppercase px-2 py-0.5 shadow-[0_0_20px_rgba(250,204,21,0.6)] tracking-wider transform -rotate-2 group-hover:rotate-0 group-hover:scale-110 transition-all duration-quick border border-amber-200/50">
              REP ⚡
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 rounded-full border border-flood/40 bg-flood/10 px-2.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-wider text-flood ml-1">
              <span className="h-1.5 w-1.5 rounded-full bg-flood animate-pulse" />
              Demo Portfólio
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1 h-full">
            <button
              onMouseEnter={() => setMenuAberto("clubes")}
              onFocus={() => setMenuAberto("clubes")}
              className={cn(
                "h-full px-4 font-mono text-caption uppercase tracking-[0.08em] transition-colors duration-snap",
                menuAberto === "clubes" ? "text-flood" : "text-chalk hover:text-flood"
              )}
            >
              Clubes
            </button>
            <button
              onMouseEnter={() => setMenuAberto("selecoes")}
              onFocus={() => setMenuAberto("selecoes")}
              className={cn(
                "h-full px-4 font-mono text-caption uppercase tracking-[0.08em] transition-colors duration-snap",
                menuAberto === "selecoes" ? "text-flood" : "text-chalk hover:text-flood"
              )}
            >
              Seleções
            </button>
            <Link
              href="/produtos"
              className="h-full px-4 flex items-center font-mono text-caption uppercase tracking-[0.08em] text-chalk hover:text-flood transition-colors duration-snap"
            >
              Catálogo
            </Link>
            <Link
              href="/style-guide"
              className="h-full px-4 flex items-center font-mono text-caption uppercase tracking-[0.08em] text-chalk hover:text-flood transition-colors duration-snap"
            >
              Style Guide
            </Link>
          </nav>

          <div className="flex items-center gap-1 md:gap-2">
            <button
              onClick={() => setBuscaAberta(true)}
              aria-label="Buscar"
              className="h-11 w-11 flex items-center justify-center rounded-full text-chalk hover:bg-surface-raised transition-colors duration-snap ease-sprint"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.4" />
                <path d="M12.5 12.5L16.5 16.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </button>
            <CartBadge />
            <button
              onClick={() => setMobileAberto(true)}
              aria-label="Abrir menu"
              className="h-11 w-11 flex items-center justify-center rounded-full text-chalk hover:bg-surface-raised transition-colors duration-snap ease-sprint md:hidden"
            >
              <svg width="18" height="14" viewBox="0 0 18 14" fill="none">
                <path d="M0 1H18M0 7H18M0 13H18" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </button>
          </div>
        </div>

        <MegaMenu
          aberto={menuAberto === "clubes"}
          titulo="Clubes"
          descricao="Os clubes que definem a identidade das grandes ligas mundiais."
          itens={clubes}
        />
        <MegaMenu
          aberto={menuAberto === "selecoes"}
          titulo="Seleções"
          descricao="As camisas que vestem torcidas inteiras a cada convocação."
          itens={selecoes}
        />
      </motion.header>

      <SearchOverlay aberto={buscaAberta} onFechar={() => setBuscaAberta(false)} />
      <MobileMenu aberto={mobileAberto} onFechar={() => setMobileAberto(false)} />
    </>
  );
}
