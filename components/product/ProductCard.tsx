"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { useCart } from "@/components/cart/CartContext";
import { categorias, formatarPreco, Produto } from "@/mock/produtos";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
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
  const [seletorAberto, setSeletorAberto] = useState(false);
  const [toastFeedback, setToastFeedback] = useState<string | null>(null);

  const seletorRef = useRef<HTMLDivElement>(null);
  const botaoRef = useRef<HTMLButtonElement>(null);

  const tamanhos = produto.tamanhosDisponiveis ?? [];
  const semEstoque = tamanhos.length === 0;

  // Fechar seletor ao clicar fora ou apertar Esc
  useEffect(() => {
    if (!seletorAberto) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSeletorAberto(false);
        botaoRef.current?.focus();
      }
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (seletorRef.current && !seletorRef.current.contains(e.target as Node)) {
        setSeletorAberto(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [seletorAberto]);

  // Timer para ocultar toast de feedback
  useEffect(() => {
    if (!toastFeedback) return;
    const timer = setTimeout(() => setToastFeedback(null), 3000);
    return () => clearTimeout(timer);
  }, [toastFeedback]);

  const executarAdicao = (tamanho: string) => {
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
      tamanho,
      personalizacao: null,
    });
    setSeletorAberto(false);
    setToastFeedback(`Tam. ${tamanho} adicionado!`);
  };

  const handleQuickAddClick = () => {
    if (semEstoque) return;

    if (tamanhos.length === 1) {
      executarAdicao(tamanhos[0]);
    } else {
      setSeletorAberto((prev) => !prev);
    }
  };

  return (
    <motion.article
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
      {/* Toast de feedback de adição rápida */}
      <AnimatePresence>
        {toastFeedback && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            role="status"
            aria-live="polite"
            className="absolute top-2 left-2 right-2 z-30 bg-flood text-ink font-mono text-caption font-bold px-3 py-1.5 rounded text-center shadow-lg"
          >
            {toastFeedback}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Área da imagem: Link da imagem e botão Quick Add como irmãos */}
      <div className="relative aspect-[3/4] overflow-hidden bg-surface-raised">
        <Link
          href={`/produtos/${produto.slug}`}
          className="absolute inset-0 z-10 block"
          aria-label={`Ver detalhes de ${produto.nome}`}
          tabIndex={-1}
        >
          <span className="sr-only">Ver detalhes de {produto.nome}</span>
        </Link>

        {produto.status && (
          <Badge variant={produto.status} className="absolute top-3 left-3 z-20" />
        )}

        {semEstoque ? (
          <span className="absolute top-3 right-3 z-20 rounded-sm bg-danger/90 backdrop-blur-sm px-2 py-1 font-mono text-caption text-chalk border border-danger">
            Sem estoque
          </span>
        ) : produto.unidadesRestantes !== null ? (
          <span className="absolute top-3 right-3 z-20 rounded-sm bg-ink/80 backdrop-blur-sm px-2 py-1 font-mono text-caption text-danger border border-danger/40">
            Só {produto.unidadesRestantes} un.
          </span>
        ) : null}

        {/* "Frente" — visível por padrão */}
        {!erroFrente && (
          <SmartImage
            srcBase={produto.imagemFrente || `/camisas/${produto.timeSlug}/${produto.categoria}-frente.jpg`}
            alt={produto.nome}
            onFallbackFailed={() => setErroFrente(true)}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-quick ease-sprint group-hover:opacity-0 z-[5]"
          />
        )}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center p-6 transition-opacity duration-quick ease-sprint group-hover:opacity-0 text-center"
          style={{
            background: `radial-gradient(circle at 50% 35%, ${produto.corFrente}44 0%, var(--surface-raised) 85%)`,
          }}
        >
          <div className="h-16 w-16 mb-3 rounded border border-white/10 p-2 flex items-center justify-center bg-ink/40 shadow-inner">
            <SmartImage
              srcBase={`/escudos/${produto.timeSlug}`}
              alt=""
              className="h-full w-full object-contain filter drop-shadow"
            />
          </div>
          <span className="font-mono text-[0.65rem] uppercase font-bold text-chalk-dim tracking-wider mb-1">
            {produto.categoria} · {produto.temporada}
          </span>
        </div>

        {/* "Costas" — revelada no hover */}
        {!erroCostas && (
          <SmartImage
            srcBase={produto.imagemCostas || `/camisas/${produto.timeSlug}/${produto.categoria}-costas.jpg`}
            alt=""
            onFallbackFailed={() => setErroCostas(true)}
            className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-quick ease-sprint group-hover:opacity-100 z-[5]"
          />
        )}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center p-6 opacity-0 transition-opacity duration-quick ease-sprint group-hover:opacity-100 text-center"
          style={{
            background: `radial-gradient(circle at 50% 35%, ${produto.corCostas}55 0%, var(--surface-raised) 85%)`,
          }}
        >
          <div className="h-16 w-16 mb-3 rounded border border-white/10 p-2 flex items-center justify-center bg-ink/40 shadow-inner">
            <SmartImage
              srcBase={`/escudos/${produto.timeSlug}`}
              alt=""
              className="h-full w-full object-contain filter drop-shadow opacity-75"
            />
          </div>
          <span className="font-mono text-[0.65rem] uppercase font-bold text-chalk-dim tracking-wider mb-1">
            Vista Traseira
          </span>
        </div>

        <div
          className={cn(
            "pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-quick ease-sprint",
            temaTime ? "bg-team-primary/10" : "bg-flood/5"
          )}
        />

        {/* Botão de adição rápida — irmão do Link, fora dele */}
        <button
          ref={botaoRef}
          type="button"
          disabled={semEstoque}
          aria-disabled={semEstoque}
          aria-expanded={seletorAberto}
          aria-label={
            semEstoque
              ? `${produto.nome} está indisponível`
              : `Adicionar ${produto.nome} à sacola`
          }
          onClick={handleQuickAddClick}
          className={cn(
            "absolute bottom-3 right-3 z-20 flex h-11 items-center justify-center rounded-full shadow-rise px-3.5",
            "translate-y-0 opacity-100 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100",
            "transition-all duration-quick ease-sprint active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flood",
            semEstoque
              ? "bg-surface-raised text-chalk-dim border border-border cursor-not-allowed opacity-80"
              : temaTime
              ? "bg-team-primary text-team-on-primary"
              : "bg-flood text-ink"
          )}
        >
          {semEstoque ? (
            <span className="font-mono text-caption uppercase font-bold">Indisponível</span>
          ) : (
            <div className="flex items-center gap-1.5 font-mono text-caption uppercase font-bold">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M8 2V14M2 8H14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              <span>{tamanhos.length === 1 ? `+${tamanhos[0]}` : "Adicionar"}</span>
            </div>
          )}
        </button>

        {/* Popover acessível para seleção rápida de tamanhos */}
        <AnimatePresence>
          {seletorAberto && (
            <motion.div
              ref={seletorRef}
              initial={{ opacity: 0, scale: 0.92, y: 6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 6 }}
              role="dialog"
              aria-label="Selecione o tamanho para adição rápida"
              className="absolute bottom-16 right-3 z-30 bg-surface border border-border p-3 rounded-md shadow-2xl flex flex-col gap-2 max-w-[200px]"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.7rem] uppercase font-bold text-chalk-dim">
                  Selecione o tamanho:
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSeletorAberto(false);
                    botaoRef.current?.focus();
                  }}
                  className="text-chalk-dim hover:text-chalk p-0.5"
                  aria-label="Fechar seletor"
                >
                  ✕
                </button>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                {tamanhos.map((tam) => (
                  <button
                    key={tam}
                    type="button"
                    onClick={() => executarAdicao(tam)}
                    className="h-8 rounded border border-border bg-surface-raised font-mono text-caption font-bold text-chalk hover:border-flood hover:text-flood transition-colors focus-visible:ring-2 focus-visible:ring-flood"
                  >
                    {tam}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Informações do produto */}
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
    </motion.article>
  );
}
