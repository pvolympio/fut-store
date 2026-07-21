"use client";

import { useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { useCart } from "@/components/cart/CartContext";
import { categorias, formatarPreco, Produto } from "@/mock/produtos";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { SmartImage } from "@/components/ui/SmartImage";

interface ProductCardProps {
  produto: Produto;
  /** Quando true, usa as cores do time (--team-*) como accent do card. */
  temaTime?: boolean;
  /** Índice dentro do grid, usado só para escalonar a animação de entrada. */
  indice?: number;
}

const categoriaLabel: Record<string, string> = Object.fromEntries(
  categorias.map((c) => [c.valor, c.label])
);

export function ProductCard({ produto, temaTime = false, indice = 0 }: ProductCardProps) {
  const { adicionarItem } = useCart();
  const accent = temaTime ? "text-team-primary" : "text-flood";

  const [erroFrente, setErroFrente] = useState(false);
  const [erroCostas, setErroCostas] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1],
        delay: Math.min(indice, 10) * 0.045,
      }}
      className={cn(
        "group relative flex flex-col rounded-md overflow-hidden border bg-surface transition-colors duration-quick ease-sprint",
        temaTime
          ? "border-border hover:border-team-primary/60"
          : "border-border hover:border-flood/50"
      )}
    >
      <Link
        href={`/produtos/${produto.slug}`}
        className="relative aspect-[3/4] block overflow-hidden bg-surface-raised"
      >
        {produto.status && (
          <Badge variant={produto.status} className="absolute top-3 left-3 z-20" />
        )}

        {produto.unidadesRestantes !== null && (
          <span className="absolute top-3 right-3 z-20 rounded-sm bg-ink/80 backdrop-blur-sm px-2 py-1 font-mono text-caption text-danger border border-danger/40">
            Só {produto.unidadesRestantes} un.
          </span>
        )}

        {/* "Frente" — visível por padrão */}
        {!erroFrente && (
          <SmartImage
            srcBase={`/camisas/${produto.slug}`}
            alt={`${produto.nome} - Frente`}
            onFallbackFailed={() => setErroFrente(true)}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-quick ease-sprint group-hover:opacity-0 z-10"
          />
        )}
        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-quick ease-sprint group-hover:opacity-0"
          style={{
            background: `linear-gradient(155deg, ${produto.corFrente}33, var(--surface-raised) 70%)`,
          }}
        >
          <span className="font-mono text-caption text-chalk-dim/50">FRENTE · 3:4</span>
        </div>

        {/* "Costas" — revelada no hover */}
        {!erroCostas && (
          <SmartImage
            srcBase={`/camisas/${produto.slug}-costas`}
            alt={`${produto.nome} - Costas`}
            onFallbackFailed={() => setErroCostas(true)}
            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-quick ease-sprint group-hover:opacity-100 z-10"
          />
        )}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-quick ease-sprint group-hover:opacity-100"
          style={{
            background: `linear-gradient(155deg, ${produto.corCostas}40, var(--surface-raised) 70%)`,
          }}
        >
          <span className="font-mono text-caption text-chalk-dim/50">COSTAS · 3:4</span>
        </div>

        <div
          className={cn(
            "pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-quick ease-sprint",
            temaTime ? "bg-team-primary/10" : "bg-flood/5"
          )}
        />

        {/* Botão de adição rápida — some no desktop até o hover, sempre visível no mobile */}
        <button
          type="button"
          aria-label="Adicionar rápido à sacola"
          onClick={(e) => {
            e.preventDefault();
            const tamanhoPadrao = produto.tamanhosDisponiveis[0] ?? "M";
            adicionarItem({
              produtoId: produto.id,
              slug: produto.slug,
              nome: produto.nome,
              timeNome: produto.nome.split(" — ")[0],
              timeSlug: produto.timeSlug,
              temporada: produto.temporada,
              precoUnitarioCentavos: produto.precoCentavos,
              corFrente: produto.corFrente,
              corCostas: produto.corCostas,
              tamanho: tamanhoPadrao,
              personalizacao: null,
            });
          }}
          className={cn(
            "absolute bottom-3 right-3 z-20 flex h-11 w-11 items-center justify-center rounded-full shadow-rise",
            "translate-y-0 opacity-100 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100",
            "transition-all duration-quick ease-sprint active:scale-95",
            temaTime
              ? "bg-team-primary text-team-on-primary"
              : "bg-flood text-ink"
          )}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 2V14M2 8H14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      </Link>

      <div className="p-4 flex flex-col gap-2">
        <p className="font-mono text-caption uppercase tracking-[0.06em] text-chalk-dim">
          {categoriaLabel[produto.categoria]} · {produto.temporada}
        </p>
        <Link href={`/produtos/${produto.slug}`}>
          <p className="text-body-sm text-chalk line-clamp-2 min-h-[2.6em] hover:underline underline-offset-2">
            {produto.nome}
          </p>
        </Link>
        <div className="flex items-center gap-2 font-mono text-data">
          <span className={accent}>{formatarPreco(produto.precoCentavos)}</span>
          {produto.precoOriginalCentavos && (
            <span className="text-chalk-dim line-through">
              {formatarPreco(produto.precoOriginalCentavos)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
