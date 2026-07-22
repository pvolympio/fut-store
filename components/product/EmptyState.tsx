"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

interface EmptyStateProps {
  onLimpar?: () => void;
  termoBusca?: string;
  onLimparBusca?: () => void;
  onLimparFiltros?: () => void;
  onLimparTudo?: () => void;
  temaTime?: boolean;
  mensagemTitulo?: string;
  mensagemDesc?: string;
}

export function EmptyState({
  onLimpar,
  termoBusca,
  onLimparBusca,
  onLimparFiltros,
  onLimparTudo,
  temaTime = false,
  mensagemTitulo,
  mensagemDesc,
}: EmptyStateProps) {
  const sugestoes = ["Brasil", "Flamengo", "Real Madrid", "Titular", "Retrô"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center justify-center text-center gap-5 py-20 px-6 border border-dashed border-border rounded-md bg-ink-soft/40"
    >
      <div
        className={
          "h-14 w-14 rounded-full flex items-center justify-center border " +
          (temaTime ? "border-team-primary/50" : "border-flood/50")
        }
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
          <circle cx="9.5" cy="9.5" r="6.25" stroke="currentColor" strokeWidth="1.4" className="text-chalk-dim" />
          <path d="M14.5 14.5L19 19" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" className="text-chalk-dim" />
          <path d="M6.5 9.5H12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" className="text-chalk-dim" />
        </svg>
      </div>

      <div>
        <p className="font-display font-bold uppercase text-display-sm text-chalk mb-2">
          {mensagemTitulo || (termoBusca ? `Nenhum resultado para "${termoBusca}"` : "Nenhuma camisa encontrada")}
        </p>
        <p className="text-body-sm text-chalk-dim max-w-md leading-relaxed">
          {mensagemDesc ||
            (termoBusca
              ? `Não encontramos mantos correspondentes a "${termoBusca}". Tente verificar a ortografia ou usar termos mais genéricos.`
              : "Nenhum manto coincide com a combinação atual de filtros.")}
        </p>
      </div>

      {sugestoe.length > 0 && (
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-caption text-chalk-dim uppercase tracking-wider">
            Sugestões de busca:
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {sugestoes.map((sugestaoname) => (
              <span
                key={sugestaoname}
                className="font-mono text-caption bg-surface-raised border border-border px-2.5 py-1 rounded text-chalk-dim"
              >
                {sugestaoname}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
        {termoBusca && onLimparBusca && (
          <Button variant="secondary" size="sm" onClick={onLimparBusca}>
            Limpar busca
          </Button>
        )}
        {(onLimpar || onLimparFiltros) && (
          <Button variant="secondary" size="sm" onClick={onLimpar || onLimparFiltros}>
            Limpar filtros
          </Button>
        )}
        {onLimparTudo && (
          <Button variant="primary" size="sm" onClick={onLimparTudo}>
            Resetar busca e filtros
          </Button>
        )}
        <Link href="/admin/camisas">
          <Button variant="ghost" size="sm">
            ⚙️ Gerenciador de Mantos
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}

const sugestoe = ["Brasil", "Flamengo", "Real Madrid", "Titular", "Retrô"];
