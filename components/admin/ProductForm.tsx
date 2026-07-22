"use client";

import { useState, useEffect, useRef } from "react";
import { times, Time } from "@/mock/times";
import { Produto, CategoriaProduto, StatusProduto, tamanhosBase } from "@/mock/produtos";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { TeamSelector } from "./TeamSelector";

interface ProductFormProps {
  produtoEdicao: Produto | null;
  onSalvoSucesso: () => void;
  onCancelarEdicao: () => void;
}

export function ProductForm({
  produtoEdicao,
  onSalvoSucesso,
  onCancelarEdicao,
}: ProductFormProps) {
  const [timeSelecionado, setTimeSelecionado] = useState<Time>(() => {
    if (produtoEdicao) {
      return times.find((t) => t.slug === produtoEdicao.timeSlug) || times[0];
    }
    return times[0];
  });
  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState<CategoriaProduto>("titular");
  const [temporada, setTemporada] = useState("2026/27");
  const [precoReais, setPrecoReais] = useState("299.00");
  const [precoOriginalReais, setPrecoOriginalReais] = useState("");
  const [status, setStatus] = useState<StatusProduto>("novo");
  const [tamanhos, setTamanhos] = useState<string[]>(["P", "M", "G", "GG"]);

  const [arquivoFrente, setArquivoFrente] = useState<File | null>(null);
  const [previewFrente, setPreviewFrente] = useState<string | null>(null);
  const [arquivoCostas, setArquivoCostas] = useState<File | null>(null);
  const [previewCostas, setPreviewCostas] = useState<string | null>(null);

  const [enviando, setEnviando] = useState(false);
  const [mensagem, setMensagem] = useState<{ tipo: "sucesso" | "erro"; texto: string } | null>(null);

  const inputFrenteRef = useRef<HTMLInputElement>(null);
  const inputCostasRef = useRef<HTMLInputElement>(null);

  // Inicializa estado ao carregar edição
  useEffect(() => {
    if (produtoEdicao) {
      const foundTime = times.find((t) => t.slug === produtoEdicao.timeSlug) || times[0];
      setTimeSelecionado(foundTime);
      setNome(produtoEdicao.nome);
      setCategoria(produtoEdicao.categoria);
      setTemporada(produtoEdicao.temporada);
      setPrecoReais((produtoEdicao.precoCentavos / 100).toFixed(2));
      setPrecoOriginalReais(
        produtoEdicao.precoOriginalCentavos ? (produtoEdicao.precoOriginalCentavos / 100).toFixed(2) : ""
      );
      setStatus(produtoEdicao.status);
      setTamanhos(produtoEdicao.tamanhosDisponiveis || []);
      setPreviewFrente(produtoEdicao.imagemFrente || null);
      setPreviewCostas(produtoEdicao.imagemCostas || null);
    }
  }, [produtoEdicao]);

  // Liberação de URLs temporárias de preview (evita memory leaks)
  useEffect(() => {
    return () => {
      if (previewFrente && previewFrente.startsWith("blob:")) URL.revokeObjectURL(previewFrente);
      if (previewCostas && previewCostas.startsWith("blob:")) URL.revokeObjectURL(previewCostas);
    };
  }, [previewFrente, previewCostas]);

  const handleToggleTamanho = (tam: string) => {
    setTamanhos((prev) =>
      prev.includes(tam) ? prev.filter((t) => t !== tam) : [...prev, tam]
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, vista: "frente" | "costas") => {
    const file = e.target.files?.[0];
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    if (vista === "frente") {
      setArquivoFrente(file);
      setPreviewFrente(objectUrl);
    } else {
      setArquivoCostas(file);
      setPreviewCostas(objectUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!timeSelecionado) {
      setMensagem({ tipo: "erro", texto: "Selecione um clube antes de salvar." });
      return;
    }

    setEnviando(true);
    setMensagem(null);

    const valPreco = parseFloat(precoReais.replace(",", "."));
    if (isNaN(valPreco) || valPreco <= 0) {
      setMensagem({ tipo: "erro", texto: "Informe um preço de venda válido maior que zero." });
      setEnviando(false);
      return;
    }

    if (tamanhos.length === 0) {
      setMensagem({ tipo: "erro", texto: "Selecione pelo menos um tamanho disponível." });
      setEnviando(false);
      return;
    }

    try {
      let caminhoFrente = previewFrente || "";
      let caminhoCostas = previewCostas || "";

      if (arquivoFrente) {
        const formData = new FormData();
        formData.append("file", arquivoFrente);
        formData.append("tipo", "camisa");
        formData.append("timeSlug", timeSelecionado.slug);
        formData.append("categoria", categoria);
        formData.append("vista", "frente");
        const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
        const data = await res.json();
        if (data.publicUrl) caminhoFrente = data.publicUrl;
      }

      if (arquivoCostas) {
        const formData = new FormData();
        formData.append("file", arquivoCostas);
        formData.append("tipo", "camisa");
        formData.append("timeSlug", timeSelecionado.slug);
        formData.append("categoria", categoria);
        formData.append("vista", "costas");
        const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
        const data = await res.json();
        if (data.publicUrl) caminhoCostas = data.publicUrl;
      }

      const precoCentavos = Math.round(valPreco * 100);
      const valPrecoOrig = precoOriginalReais ? parseFloat(precoOriginalReais.replace(",", ".")) : null;
      const precoOriginalCentavos = valPrecoOrig && !isNaN(valPrecoOrig) ? Math.round(valPrecoOrig * 100) : null;

      // Preservar o slug existente se estiver editando um produto!
      const idFinal = produtoEdicao?.id || `prod-${timeSelecionado.slug}-${categoria}-${Date.now()}`;
      const slugFinal = produtoEdicao?.slug || `${timeSelecionado.slug}-${categoria}-${Date.now().toString().slice(-4)}`;

      const payload = {
        id: idFinal,
        slug: slugFinal,
        nome: nome.trim(),
        timeId: timeSelecionado.id,
        timeSlug: timeSelecionado.slug,
        timeTipo: timeSelecionado.tipo,
        categoria,
        temporada,
        precoCentavos,
        precoOriginalCentavos,
        status,
        tamanhosDisponiveis: tamanhos,
        estoqueBaixo: false,
        corFrente: timeSelecionado.cores.primaria,
        corCostas: timeSelecionado.cores.secundaria,
        imagemFrente: caminhoFrente || `/camisas/${timeSelecionado.slug}/${categoria}-frente.jpg`,
        imagemCostas: caminhoCostas || `/camisas/${timeSelecionado.slug}/${categoria}-costas.jpg`,
      };

      const resProd = await fetch("/api/admin/produtos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const resData = await resProd.json();

      if (resProd.ok && resData.success) {
        setMensagem({ tipo: "sucesso", texto: `✅ Manto salvo com sucesso no catálogo!` });
        onSalvoSucesso();
      } else {
        setMensagem({ tipo: "erro", texto: `❌ ${resData.error || "Erro ao salvar manto."}` });
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Falha ao comunicar com servidor.";
      setMensagem({ tipo: "erro", texto: `❌ ${msg}` });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-lg border border-border bg-surface p-6 shadow-card space-y-6">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h2 className="font-display text-display-sm uppercase font-bold text-chalk flex items-center gap-2">
          <span>{produtoEdicao ? "✏️ Editar Manto" : "➕ Novo Manto no Catálogo"}</span>
        </h2>
        {produtoEdicao && (
          <Button type="button" variant="ghost" size="sm" onClick={onCancelarEdicao}>
            Cancelar Edição
          </Button>
        )}
      </div>

      {mensagem && (
        <div
          role="alert"
          className={`p-4 rounded border text-body-sm font-mono ${
            mensagem.tipo === "sucesso"
              ? "border-success/40 bg-success/10 text-success"
              : "border-danger/40 bg-danger/10 text-danger"
          }`}
        >
          {mensagem.texto}
        </div>
      )}

      <TeamSelector
        timeSelecionado={timeSelecionado}
        onSelecionarTime={(time) => setTimeSelecionado(time)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Input
            label="Título / Nome do Manto"
            id="nome-manto"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Ex: Flamengo — Camisa Titular 2026"
            required
          />
        </div>
        <div>
          <Select
            label="Categoria / Uniforme"
            id="categoria-manto"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value as CategoriaProduto)}
          >
            <option value="titular">Titular (Home)</option>
            <option value="visitante">Visitante (Away)</option>
            <option value="terceira">Terceiro Uniforme</option>
            <option value="goleiro">Goleiro</option>
            <option value="retro">Retrô / Histórica</option>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <Input
            label="Temporada"
            id="temporada"
            value={temporada}
            onChange={(e) => setTemporada(e.target.value)}
            placeholder="2026/27"
            required
          />
        </div>
        <div>
          <Input
            label="Preço de Venda (R$)"
            id="precoReais"
            value={precoReais}
            onChange={(e) => setPrecoReais(e.target.value)}
            placeholder="299.00"
            required
          />
        </div>
        <div>
          <Input
            label="Preço De (Original R$)"
            id="precoOriginalReais"
            value={precoOriginalReais}
            onChange={(e) => setPrecoOriginalReais(e.target.value)}
            placeholder="Ex: 349.00"
          />
        </div>
      </div>

      <div>
        <p className="font-mono text-caption uppercase text-chalk-dim mb-2 font-bold">
          Tamanhos Disponíveis em Estoque:
        </p>
        <div className="flex flex-wrap gap-2">
          {tamanhosBase.map((tam) => {
            const ativo = tamanhos.includes(tam);
            return (
              <button
                type="button"
                key={tam}
                onClick={() => handleToggleTamanho(tam)}
                className={`h-10 px-4 rounded border font-mono text-caption font-bold transition-colors ${
                  ativo
                    ? "bg-flood text-ink border-flood"
                    : "bg-surface-raised border-border text-chalk-dim hover:text-chalk"
                }`}
              >
                {tam}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-border pt-4">
        <div>
          <label htmlFor="input-frente" className="block font-mono text-caption uppercase text-chalk-dim mb-1 font-bold">
            Foto Frente:
          </label>
          <input
            id="input-frente"
            ref={inputFrenteRef}
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "frente")}
            className="text-caption text-chalk-dim"
          />
        </div>
        <div>
          <label htmlFor="input-costas" className="block font-mono text-caption uppercase text-chalk-dim mb-1 font-bold">
            Foto Costas:
          </label>
          <input
            id="input-costas"
            ref={inputCostasRef}
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e, "costas")}
            className="text-caption text-chalk-dim"
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
        <Button type="submit" variant="primary" size="lg" disabled={enviando}>
          {enviando ? "Salvando Manto..." : produtoEdicao ? "Atualizar Manto" : "Cadastrar no Catálogo"}
        </Button>
      </div>
    </form>
  );
}
