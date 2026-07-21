"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const etapas = ["Identificação", "Entrega", "Pagamento", "Confirmação"] as const;

export function Stepper({ atual }: { atual: number }) {
  return (
    <ol className="flex items-center w-full" aria-label="Progresso da compra">
      {etapas.map((label, i) => {
        const concluida = i < atual;
        const ativa = i === atual;
        return (
          <li key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-2 shrink-0">
              <div
                className={cn(
                  "h-9 w-9 rounded-full flex items-center justify-center font-mono text-caption font-semibold border transition-colors duration-quick ease-sprint",
                  concluida
                    ? "bg-flood text-ink border-flood"
                    : ativa
                    ? "border-flood text-flood"
                    : "border-border text-chalk-dim"
                )}
                aria-current={ativa ? "step" : undefined}
              >
                {concluida ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7L5.5 10.5L12 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  i + 1
                )}
              </div>
              <span
                className={cn(
                  "font-mono text-[10px] sm:text-caption uppercase tracking-[0.05em] text-center whitespace-nowrap",
                  ativa || concluida ? "text-chalk" : "text-chalk-dim"
                )}
              >
                {label}
              </span>
            </div>
            {i < etapas.length - 1 && (
              <div className="flex-1 h-px bg-border mx-2 sm:mx-3 mt-[-1.25rem] relative overflow-hidden">
                <motion.div
                  initial={false}
                  animate={{ scaleX: concluida ? 1 : 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  style={{ originX: 0 }}
                  className="absolute inset-0 bg-flood"
                />
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
