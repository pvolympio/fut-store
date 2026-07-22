"use client";

import { useState } from "react";
import { Produto, formatarPreco } from "@/mock/produtos";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

interface ProductListProps {
  produtos: Produto[];
  onEditar: (p: Produto) => void;
  onExcluir: (id: string) => void;
}

export function ProductList({ produtos, onEditar, onExcluir }: ProductListProps) {
  const [busca, setBusca] = useState("");

  const produtosFiltrados = produtos.filter((p) => {
    const termo = busca.toLowerCase().trim();
    if (!termo) return true;
    return (
      p.nome.toLowerCase().includes(termo) ||
      p.timeSlug.toLowerCase().includes(termo) ||
      p.categoria.toLowerCase().includes(termo)
    );
  });

  return (
    <div className="rounded-lg border border-border bg-surface p-6 shadow-card space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border pb-3">
        <h2 className="font-display text-display-sm uppercase font-bold text-chalk flex items-center gap-2">
          <span>📋 Mantos no Catálogo ({produtos.length})</span>
        </h2>
        <div className="w-full sm:w-64">
          <Input
            label=""
            id="busca-catalogo-admin"
            placeholder="Filtrar mantos..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>
      </div>

      {produtosFiltrados.length === 0 ? (
        <p className="text-body-sm text-chalk-dim text-center py-8 font-mono">
          Nenhum manto encontrado no filtro.
        </p>
      ) : (
        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
          {produtosFiltrados.map((p) => (
            <div
              key={p.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-md border border-border bg-surface-raised gap-4 hover:border-flood/40 transition-colors"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-caption uppercase text-flood font-bold">
                    {p.categoria} · {p.temporada}
                  </span>
                  {p.status && (
                    <span className="rounded bg-flood/10 border border-flood/30 px-1.5 py-0.5 font-mono text-[0.6rem] uppercase text-flood">
                      {p.status}
                    </span>
                  )}
                </div>
                <p className="font-body text-body-sm font-semibold text-chalk truncate">{p.nome}</p>
                <p className="font-mono text-caption text-chalk-dim mt-0.5">
                  Tamanhos: {p.tamanhosDisponiveis.join(", ")} · Preço:{" "}
                  <strong className="text-chalk">{formatarPreco(p.precoCentavos)}</strong>
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Button type="button" variant="secondary" size="sm" onClick={() => onEditar(p)}>
                  ✏️ Editar
                </Button>
                <Button type="button" variant="danger" size="sm" onClick={() => onExcluir(p.id)}>
                  🗑️ Excluir
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
