"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Produto } from "@/mock/produtos";
import { TimeResumo } from "@/mock/times";
import {
  FiltrosState,
  aplicarFiltros,
  filtrosVazios,
  opcoesOrdenacao,
  ordenarProdutos,
  Ordenacao,
} from "@/lib/filtros";
import { FilterSystem } from "@/components/filters/FilterSystem";
import { FilterChips } from "@/components/filters/FilterChips";
import { ProductCard } from "@/components/product/ProductCard";
import { EmptyState } from "@/components/product/EmptyState";
import { Select } from "@/components/ui/Select";
import { cn } from "@/lib/utils";

interface ProductBrowserProps {
  produtos: Produto[];
  temaTime?: boolean;
  /** Só o catálogo geral passa isso — habilita busca e filtro cruzado por time. */
  mostrarBusca?: boolean;
  times?: TimeResumo[];
}

export function ProductBrowser({
  produtos,
  temaTime = false,
  mostrarBusca = false,
  times,
}: ProductBrowserProps) {
  const [filtros, setFiltros] = useState<FiltrosState>(filtrosVazios);
  const [busca, setBusca] = useState("");
  const [ordenacao, setOrdenacao] = useState<Ordenacao>("relevancia");

  const resultado = useMemo(() => {
    const filtrado = aplicarFiltros(produtos, filtros, busca);
    return ordenarProdutos(filtrado, ordenacao);
  }, [produtos, filtros, busca, ordenacao]);

  return (
    <div className="flex flex-col lg:flex-row gap-10">
      <FilterSystem filtros={filtros} onChange={setFiltros} temaTime={temaTime} times={times} />

      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
          {mostrarBusca && (
            <div className="relative flex-1">
              <input
                type="search"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Buscar por nome, time ou modelo..."
                className={cn(
                  "h-12 w-full rounded bg-surface border border-border pl-11 pr-4 text-body text-chalk",
                  "transition-colors duration-snap ease-sprint placeholder:text-chalk-dim/60",
                  "hover:border-chalk/40 focus-visible:outline-none focus-visible:border-flood focus-visible:ring-1 focus-visible:ring-flood"
                )}
              />
              <svg
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-chalk-dim"
                width="16"
                height="16"
                viewBox="0 0 18 18"
                fill="none"
              >
                <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.4" />
                <path d="M12.5 12.5L16.5 16.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
            </div>
          )}
          <div className="w-full sm:w-56 shrink-0">
            <Select
              aria-label="Ordenar"
              value={ordenacao}
              onChange={(e) => setOrdenacao(e.target.value as Ordenacao)}
            >
              {opcoesOrdenacao.map((o) => (
                <option key={o.valor} value={o.valor}>
                  Ordenar: {o.label}
                </option>
              ))}
            </Select>
          </div>
        </div>

        <FilterChips filtros={filtros} onChange={setFiltros} times={times} temaTime={temaTime} />

        <p className="font-mono text-caption text-chalk-dim mb-5">
          {resultado.length} {resultado.length === 1 ? "produto encontrado" : "produtos encontrados"}
        </p>

        {resultado.length === 0 ? (
          <EmptyState temaTime={temaTime} onLimpar={() => setFiltros({ ...filtrosVazios })} />
        ) : (
          <motion.div layout className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
            <AnimatePresence mode="popLayout" initial={false}>
              {resultado.map((produto, i) => (
                <ProductCard key={produto.id} produto={produto} temaTime={temaTime} indice={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
