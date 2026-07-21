"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { getEscudoSvg } from "@/mock/times";
import { clubes, selecoes } from "@/mock/navegacao";
import { hrefTime } from "@/lib/utils";

interface MobileMenuProps {
  aberto: boolean;
  onFechar: () => void;
}

function Accordion({
  titulo,
  itens,
  onFechar,
}: {
  titulo: string;
  itens: typeof clubes;
  onFechar: () => void;
}) {
  const [expandido, setExpandido] = useState(false);
  return (
    <div className="border-b border-border">
      <button
        onClick={() => setExpandido((v) => !v)}
        className="w-full flex items-center justify-between py-5"
      >
        <span className="font-display font-bold uppercase text-display-sm text-chalk">
          {titulo}
        </span>
        <motion.span
          animate={{ rotate: expandido ? 45 : 0 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-flood text-2xl leading-none"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {expandido && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-2 gap-2 pb-5">
              {itens.map((time) => (
                <Link
                  key={time.id}
                  href={hrefTime(time)}
                  onClick={onFechar}
                  className="flex items-center gap-2 rounded p-2 hover:bg-surface transition-colors duration-snap ease-sprint"
                >
                  <span
                    className="h-7 w-7 shrink-0 rounded-sm p-0.5 flex items-center justify-center overflow-hidden"
                    style={{ background: time.cores.primaria }}
                  >
                    {time.escudoUrl ? (
                      <img src={time.escudoUrl} alt={time.apelido} className="h-full w-full object-contain" />
                    ) : (
                      <span className="h-full w-full block" dangerouslySetInnerHTML={{ __html: getEscudoSvg(time) }} />
                    )}
                  </span>
                  <span className="text-body-sm text-chalk-dim">{time.apelido}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function MobileMenu({ aberto, onFechar }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {aberto && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onFechar}
            className="fixed inset-0 z-[80] bg-ink/70 backdrop-blur-sm md:hidden"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 bottom-0 z-[90] w-[86%] max-w-sm bg-ink-soft border-l border-border flex flex-col md:hidden"
          >
            <div className="flex items-center justify-between p-5 border-b border-border">
              <span className="font-display font-black uppercase text-display-sm text-chalk">
                Menu
              </span>
              <button
                onClick={onFechar}
                aria-label="Fechar menu"
                className="h-10 w-10 flex items-center justify-center rounded-full border border-border text-chalk"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M1 1L15 15M15 1L1 15" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5">
              <Link
                href="/produtos"
                onClick={onFechar}
                className="block py-5 border-b border-border font-display font-bold uppercase text-display-sm text-chalk"
              >
                Catálogo
              </Link>
              <Accordion titulo="Clubes" itens={clubes} onFechar={onFechar} />
              <Accordion titulo="Seleções" itens={selecoes} onFechar={onFechar} />
              <Link
                href="/style-guide"
                onClick={onFechar}
                className="block py-5 font-display font-bold uppercase text-display-sm text-chalk-dim"
              >
                Style Guide
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
