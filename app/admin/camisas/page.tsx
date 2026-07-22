"use client";

import { useState } from "react";
import { Produto } from "@/mock/produtos";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { useProducts } from "@/hooks/useProducts";
import { ProductForm } from "@/components/admin/ProductForm";
import { ProductList } from "@/components/admin/ProductList";

export default function AdminCamisasPage() {
  const { produtos, carregando, carregarProdutos, excluirProduto } = useProducts();
  const [produtoEdicao, setProdutoEdicao] = useState<Produto | null>(null);
  const [mensagemNotificacao, setMensagemNotificacao] = useState<string | null>(null);

  const handleEditar = (p: Produto) => {
    setProdutoEdicao(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleExcluir = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta camisa do catálogo?")) return;
    const ok = await excluirProduto(id);
    if (ok) {
      setMensagemNotificacao("Produto removido com sucesso.");
      setTimeout(() => setMensagemNotificacao(null), 3000);
    }
  };

  const handleSalvoSucesso = () => {
    setProdutoEdicao(null);
    carregarProdutos();
    setMensagemNotificacao("Manto salvo no catálogo com sucesso!");
    setTimeout(() => setMensagemNotificacao(null), 3000);
  };

  return (
    <main className="min-h-screen bg-ink pt-28 pb-20 text-chalk">
      <Section spacing="sm" className="border-b border-border bg-ink-soft">
        <Container className="max-w-[1280px]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <p className="font-mono text-eyebrow uppercase text-flood">
                  Painel de Administração · Paulin Gostosin 🔥
                </p>
                <span className="rounded bg-flood/10 border border-flood/30 px-2 py-0.5 font-mono text-[0.65rem] uppercase text-flood">
                  Dados Locais / Simulados
                </span>
              </div>
              <h1 className="font-display text-display-md font-bold uppercase text-chalk">
                Gerenciador de Mantos
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-chalk-dim bg-surface px-3 py-1.5 rounded border border-border">
                📦 Mantos no Catálogo: <strong className="text-flood">{produtos.length}</strong>
              </span>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="md">
        <Container className="max-w-[1280px]">
          <div className="rounded-md bg-flood/5 border border-flood/30 p-4 mb-6 text-caption text-chalk-dim">
            ℹ️ <strong className="text-chalk">Ambiente de Demonstração:</strong> As alterações feitas neste painel persistem localmente via JSON para demonstrar a reatividade de atualização do catálogo e simulação de CRUD.
          </div>

          {mensagemNotificacao && (
            <div
              role="status"
              className="mb-6 p-4 rounded border border-success/40 bg-success/10 font-mono text-caption text-success font-bold"
            >
              {mensagemNotificacao}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-6">
              <ProductForm
                produtoEdicao={produtoEdicao}
                onSalvoSucesso={handleSalvoSucesso}
                onCancelarEdicao={() => setProdutoEdicao(null)}
              />
            </div>

            <div className="lg:col-span-5 space-y-6">
              {carregando ? (
                <div className="rounded-lg border border-border bg-surface p-8 text-center font-mono text-caption text-chalk-dim">
                  Carregando catálogo...
                </div>
              ) : (
                <ProductList
                  produtos={produtos}
                  onEditar={handleEditar}
                  onExcluir={handleExcluir}
                />
              )}
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
