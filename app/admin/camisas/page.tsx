"use client";

import { useState, useEffect } from "react";
import { Produto } from "@/mock/produtos";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useProducts } from "@/hooks/useProducts";
import { ProductForm } from "@/components/admin/ProductForm";
import { ProductList } from "@/components/admin/ProductList";

const ADMIN_PIN_DEFAULT = process.env.NEXT_PUBLIC_ADMIN_PIN || "futrep2026";

export default function AdminCamisasPage() {
  const { produtos, carregando, carregarProdutos, excluirProduto } = useProducts();
  const [autenticado, setAutenticado] = useState(false);
  const [verificandoSessao, setVerificandoSessao] = useState(true);
  const [senhaInput, setSenhaInput] = useState("");
  const [erroSenha, setErroSenha] = useState<string | null>(null);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const [produtoEdicao, setProdutoEdicao] = useState<Produto | null>(null);
  const [mensagemNotificacao, setMensagemNotificacao] = useState<string | null>(null);

  // Verificar se já possui sessão ativa no sessionStorage/localStorage
  useEffect(() => {
    try {
      const sessaoAtiva = sessionStorage.getItem("futrep_admin_autenticado") === "true";
      setAutenticado(sessaoAtiva);
    } catch {
      setAutenticado(false);
    } finally {
      setVerificandoSessao(false);
    }
  }, []);

  const handleAutenticar = (e: React.FormEvent) => {
    e.preventDefault();
    if (senhaInput.trim() === ADMIN_PIN_DEFAULT) {
      setAutenticado(true);
      setErroSenha(null);
      try {
        sessionStorage.setItem("futrep_admin_autenticado", "true");
      } catch (e) {
        console.error("Erro ao salvar sessão admin:", e);
      }
    } else {
      setErroSenha("Senha incorreta. Acesso permitido apenas ao proprietário.");
    }
  };

  const handleLogout = () => {
    setAutenticado(false);
    try {
      sessionStorage.removeItem("futrep_admin_autenticado");
    } catch (e) {
      console.error("Erro ao limpar sessão admin:", e);
    }
  };

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

  if (verificandoSessao) {
    return (
      <main className="min-h-screen bg-ink flex items-center justify-center p-6 text-chalk">
        <div className="font-mono text-caption text-chalk-dim animate-pulse">
          Verificando permissões de acesso...
        </div>
      </main>
    );
  }

  // Tela de Autenticação / Bloqueio Exclusivo
  if (!autenticado) {
    return (
      <main className="min-h-screen bg-ink flex items-center justify-center p-6 text-chalk relative overflow-hidden pt-28 pb-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(250,204,21,0.08) 0%, transparent 70%)",
          }}
        />

        <div className="w-full max-w-md bg-surface border border-border rounded-xl p-8 shadow-2xl relative z-10 flex flex-col gap-6">
          <div className="text-center flex flex-col items-center gap-2">
            <div className="h-14 w-14 rounded-full bg-flood/10 border border-flood/30 flex items-center justify-center text-2xl mb-1">
              🔒
            </div>
            <span className="font-mono text-eyebrow uppercase text-flood tracking-wider">FUTREP Admin</span>
            <h1 className="font-display text-display-sm font-bold uppercase text-chalk">Acesso Restrito ao Proprietário</h1>
            <p className="text-body-sm text-chalk-dim">
              Esta área é exclusiva para o administrador gerenciar e adicionar mantos ao catálogo.
            </p>
          </div>

          <form onSubmit={handleAutenticar} className="flex flex-col gap-4">
            <div className="relative">
              <Input
                label="Senha de Acesso Administrador"
                id="senhaAdmin"
                type={mostrarSenha ? "text" : "password"}
                value={senhaInput}
                onChange={(e) => {
                  setSenhaInput(e.target.value);
                  setErroSenha(null);
                }}
                placeholder="Digite a senha de administrador"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                className="absolute right-3 top-9 text-caption font-mono text-chalk-dim hover:text-chalk focus-visible:outline-none"
              >
                {mostrarSenha ? "Ocultar" : "Mostrar"}
              </button>
            </div>

            {erroSenha && (
              <p
                className="text-caption font-mono text-danger bg-danger/10 border border-danger/30 p-2.5 rounded text-center"
                role="alert"
              >
                {erroSenha}
              </p>
            )}

            <Button type="submit" variant="primary" size="lg" className="w-full mt-2">
              Desbloquear Painel 🔓
            </Button>
          </form>

          <div className="border-t border-border pt-4 text-center">
            <p className="font-mono text-[0.7rem] text-chalk-dim">
              Dica de segurança: Senha padrão de testes é <code className="text-flood font-bold bg-surface-raised px-1.5 py-0.5 rounded">futrep2026</code>
            </p>
          </div>
        </div>
      </main>
    );
  }

  // Painel Principal do Gerenciador de Mantos (Quando Autenticado)
  return (
    <main className="min-h-screen bg-ink pt-28 pb-20 text-chalk">
      <Section spacing="sm" className="border-b border-border bg-ink-soft">
        <Container className="max-w-[1280px]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <p className="font-mono text-eyebrow uppercase text-flood">
                  Painel de Administração · FUTREP ⚡
                </p>
                <span className="rounded bg-success/10 border border-success/30 px-2 py-0.5 font-mono text-[0.65rem] uppercase text-success">
                  Acesso Autorizado
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
              <Button variant="ghost" size="sm" onClick={handleLogout} className="text-danger hover:bg-danger/10">
                🔒 Sair do Painel
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="md">
        <Container className="max-w-[1280px]">
          <div className="rounded-md bg-flood/5 border border-flood/30 p-4 mb-6 text-caption text-chalk-dim">
            ℹ️ <strong className="text-chalk">Sessão do Proprietário Ativa:</strong> Adicione, edite ou exclua mantos do catálogo. As alterações são persistidas no repositório de dados.
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
