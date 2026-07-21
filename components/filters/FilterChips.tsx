"use client";

import { AnimatePresence, motion } from "framer-motion";
import { categorias } from "@/mock/produtos";
import { TimeResumo } from "@/mock/times";
import { FiltrosState, filtrosVazios } from "@/lib/filtros";
import { cn } from "@/lib/utils";

interface Chip {
  chave: string;
  label: string;
  remover: () => void;
}

export function FilterChips({
  filtros,
  onChange,
  times,
  temaTime = false,
}: {
  filtros: FiltrosState;
  onChange: (f: FiltrosState) => void;
  times?: TimeResumo[];
  temaTime?: boolean;
}) {
  const chips: Chip[] = [
    ...filtros.categorias.map((c) => ({
      chave: `cat-${c}`,
      label: categorias.find((cat) => cat.valor === c)?.label ?? c,
      remover: () => onChange({ ...filtros, categorias: filtros.categorias.filter((v) => v !== c) }),
    })),
    ...filtros.tamanhos.map((t) => ({
      chave: `tam-${t}`,
      label: `Tam. ${t}`,
      remover: () => onChange({ ...filtros, tamanhos: filtros.tamanhos.filter((v) => v !== t) }),
    })),
    ...filtros.timeSlugs.map((slug) => ({
      chave: `time-${slug}`,
      label: times?.find((t) => t.slug === slug)?.apelido ?? slug,
      remover: () => onChange({ ...filtros, timeSlugs: filtros.timeSlugs.filter((v) => v !== slug) }),
    })),
    ...(filtros.apenasPromocao
      ? [{ chave: "promo", label: "Com desconto", remover: () => onChange({ ...filtros, apenasPromocao: false }) }]
      : []),
    ...(filtros.apenasEstoqueBaixo
      ? [
          {
            chave: "estoque",
            label: "Últimas unidades",
            remover: () => onChange({ ...filtros, apenasEstoqueBaixo: false }),
          },
        ]
      : []),
  ];

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      <AnimatePresence initial={false}>
        {chips.map((chip) => (
          <motion.button
            key={chip.chave}
            type="button"
            onClick={chip.remover}
            layout
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "flex items-center gap-1.5 rounded-pill border px-3 py-1.5 font-mono text-caption uppercase tracking-[0.04em] transition-colors duration-snap",
              temaTime
                ? "border-team-primary/50 text-team-primary hover:bg-team-primary/10"
                : "border-flood/50 text-flood hover:bg-flood/10"
            )}
          >
            {chip.label}
            <span aria-hidden className="text-[0.7rem] leading-none">✕</span>
          </motion.button>
        ))}
        {chips.length > 1 && (
          <motion.button
            key="limpar-tudo"
            type="button"
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onChange({ ...filtrosVazios, timeSlugs: [] })}
            className="font-mono text-caption uppercase tracking-[0.04em] text-chalk-dim hover:text-chalk underline underline-offset-2 px-1"
          >
            Limpar tudo
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
