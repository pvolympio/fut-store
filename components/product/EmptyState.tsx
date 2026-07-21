"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function EmptyState({
  onLimpar,
  temaTime = false,
}: {
  onLimpar: () => void;
  temaTime?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center justify-center text-center gap-5 py-24 px-6 border border-dashed border-border rounded-md"
    >
      <div
        className={
          "h-14 w-14 rounded-full flex items-center justify-center border " +
          (temaTime ? "border-team-primary/50" : "border-flood/50")
        }
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <circle cx="9.5" cy="9.5" r="6.25" stroke="currentColor" strokeWidth="1.4" className="text-chalk-dim" />
          <path d="M14.5 14.5L19 19" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" className="text-chalk-dim" />
          <path d="M6.5 9.5H12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" className="text-chalk-dim" />
        </svg>
      </div>
      <div>
        <p className="font-display font-bold uppercase text-display-sm text-chalk mb-2">
          Nenhuma camisa com esses filtros
        </p>
        <p className="text-body-sm text-chalk-dim max-w-sm">
          Tente remover algum filtro ou tamanho — o time todo está aqui, só não
          nessa combinação exata.
        </p>
      </div>
      <Button variant="secondary" size="sm" onClick={onLimpar}>
        Limpar filtros
      </Button>
    </motion.div>
  );
}
