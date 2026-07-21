"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { times, getEscudoSvg } from "@/mock/times";
import { hrefTime } from "@/lib/utils";

interface SearchOverlayProps {
  aberto: boolean;
  onFechar: () => void;
}

export function SearchOverlay({ aberto, onFechar }: SearchOverlayProps) {
  const [termo, setTermo] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (aberto) {
      const t = setTimeout(() => inputRef.current?.focus(), 350);
      return () => clearTimeout(t);
    }
    setTermo("");
  }, [aberto]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onFechar();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onFechar]);

  const resultados = termo.trim()
    ? times.filter((t) =>
        `${t.nome} ${t.apelido} ${t.pais}`.toLowerCase().includes(termo.toLowerCase())
      )
    : [];

  return (
    <AnimatePresence>
      {aberto && (
        <motion.div
          initial={{ clipPath: "circle(0% at 92% 5%)" }}
          animate={{ clipPath: "circle(150% at 92% 5%)" }}
          exit={{ clipPath: "circle(0% at 92% 5%)" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[70] bg-ink flex flex-col"
        >
          <div className="container mx-auto max-w-[1440px] px-5 sm:px-6 lg:px-10 pt-8 md:pt-14 flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-8 md:mb-14">
              <p className="font-mono text-eyebrow uppercase text-flood">Buscar</p>
              <button
                onClick={onFechar}
                aria-label="Fechar busca"
                className="h-11 w-11 flex items-center justify-center rounded-full border border-border text-chalk hover:border-flood hover:text-flood transition-colors duration-snap ease-sprint"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M1 1L15 15M15 1L1 15" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
            </div>

            <input
              ref={inputRef}
              value={termo}
              onChange={(e) => setTermo(e.target.value)}
              placeholder="Time, seleção ou país..."
              className="w-full bg-transparent font-display font-bold uppercase text-display-lg md:text-display-xl text-chalk placeholder:text-chalk-dim/30 outline-none border-b border-border focus:border-flood pb-4 transition-colors duration-quick ease-sprint"
            />

            <div className="mt-8 flex-1 overflow-y-auto pb-16">
              {termo.trim() && resultados.length === 0 && (
                <p className="text-chalk-dim text-body">
                  Nenhum resultado para &ldquo;{termo}&rdquo;.
                </p>
              )}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {resultados.map((time) => (
                  <Link
                    key={time.id}
                    href={hrefTime(time)}
                    onClick={onFechar}
                    className="group flex items-center gap-3 rounded p-3 border border-border hover:border-flood/50 hover:bg-surface transition-colors duration-snap ease-sprint"
                  >
                    <span
                      className="h-10 w-10 shrink-0 rounded-sm p-1 flex items-center justify-center overflow-hidden"
                      style={{ background: time.cores.primaria }}
                    >
                      {time.escudoUrl ? (
                        <img src={time.escudoUrl} alt={time.apelido} className="h-full w-full object-contain" />
                      ) : (
                        <span className="h-full w-full block" dangerouslySetInnerHTML={{ __html: getEscudoSvg(time) }} />
                      )}
                    </span>
                    <span className="flex flex-col">
                      <span className="text-body-sm text-chalk group-hover:text-flood transition-colors duration-snap">
                        {time.apelido}
                      </span>
                      <span className="text-caption text-chalk-dim">{time.pais}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
