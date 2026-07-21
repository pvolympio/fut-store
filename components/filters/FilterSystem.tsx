"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiltrosState, contarFiltrosAtivos, filtrosVazios } from "@/lib/filtros";
import { TimeResumo } from "@/mock/times";
import { Button } from "@/components/ui/Button";
import { FilterFields } from "./FilterFields";
import { cn } from "@/lib/utils";

interface FilterSystemProps {
  filtros: FiltrosState;
  onChange: (f: FiltrosState) => void;
  temaTime?: boolean;
  times?: TimeResumo[];
}

export function FilterSystem({ filtros, onChange, temaTime = false, times }: FilterSystemProps) {
  const [abertoMobile, setAbertoMobile] = useState(false);
  const ativos = contarFiltrosAtivos(filtros);

  return (
    <>
      {/* Gatilho — visível apenas em telas menores que a sidebar (lg) */}
      <div className="lg:hidden mb-6">
        <Button
          variant="secondary"
          size="md"
          onClick={() => setAbertoMobile(true)}
          className="w-full justify-between"
        >
          <span className="flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 4H14M4.5 8H11.5M6.5 12H9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            Filtrar
          </span>
          {ativos > 0 && (
            <span
              className={cn(
                "flex h-5 min-w-[1.25rem] items-center justify-center rounded-pill px-1 font-mono text-[0.7rem]",
                temaTime ? "bg-team-primary text-team-on-primary" : "bg-flood text-ink"
              )}
            >
              {ativos}
            </span>
          )}
        </Button>
      </div>

      {/* Sidebar — desktop */}
      <aside className="hidden lg:block w-[260px] shrink-0">
        <div className="sticky top-28 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <p className="font-display font-bold uppercase text-display-sm text-chalk">Filtros</p>
            {ativos > 0 && (
              <button
                onClick={() => onChange({ ...filtrosVazios })}
                className="font-mono text-caption text-chalk-dim hover:text-chalk underline underline-offset-2"
              >
                Limpar
              </button>
            )}
          </div>
          <FilterFields filtros={filtros} onChange={onChange} temaTime={temaTime} times={times} />
        </div>
      </aside>

      {/* Bottom sheet — mobile */}
      <AnimatePresence>
        {abertoMobile && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAbertoMobile(false)}
              className="fixed inset-0 z-[90] bg-ink/70 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="fixed left-0 right-0 bottom-0 z-[95] max-h-[85vh] rounded-t-lg border-t border-border bg-ink-soft flex flex-col lg:hidden"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
                <p className="font-display font-bold uppercase text-display-sm text-chalk">Filtros</p>
                <button
                  onClick={() => setAbertoMobile(false)}
                  aria-label="Fechar filtros"
                  className="h-9 w-9 flex items-center justify-center rounded-full border border-border text-chalk"
                >
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                    <path d="M1 1L15 15M15 1L1 15" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </button>
              </div>
              <div className="overflow-y-auto px-5 py-6">
                <FilterFields filtros={filtros} onChange={onChange} temaTime={temaTime} times={times} />
              </div>
              <div className="flex gap-3 px-5 py-4 border-t border-border shrink-0">
                <Button variant="ghost" size="md" className="flex-1" onClick={() => onChange({ ...filtrosVazios })}>
                  Limpar
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  className={cn("flex-1", temaTime && "bg-team-primary text-team-on-primary hover:bg-team-primary/85")}
                  onClick={() => setAbertoMobile(false)}
                >
                  Ver resultados
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
