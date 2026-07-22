"use client";

import { useState, useEffect, useRef } from "react";
import { times, Time, getEscudoSvg } from "@/mock/times";
import { Produto, CategoriaProduto, StatusProduto, tamanhosBase, formatarPreco } from "@/mock/produtos";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export default function AdminCamisasPage() {
  const [busca, setBusca] = useState("");
  const [paisFiltro, setPaisFiltro] = useState("Todos");
  const [timeSelecionado, setTimeSelecionado] = useState<Time>(times[0]);

  // Campos do produto
  const [idEdicao, setIdEdicao] = useState<string | null>(null);
  const [nome, setNome] = useState("");
  const [categoria, setCategoria] = useState<CategoriaProduto>("titular");
  const [temporada, setTemporada] = useState("2026/27");
  const [precoReais, setPrecoReais] = useState("299.00");
  const [precoOriginalReais, setPrecoOriginalReais] = useState("");
  const [status, setStatus] = useState<StatusProduto>("novo");
  const [tamanhos, setTamanhos] = useState<string[]>(["P", "M", "G", "GG"]);

  // Uploads de Fotos
  const [arquivoFrente, setArquivoFrente] = useState<File | null>(null);
  const [previewFrente, setPreviewFrente] = useState<string | null>(null);
  const [arquivoCostas, setArquivoCostas] = useState<File | null>(null);
  const [previewCostas, setPreviewCostas] = useState<string | null>(null);

  // Estado geral
  const [enviando, setEnviando] = useState(false);
  const [mensagem, setMensagem] = useState<{ tipo: "sucesso" | "erro"; texto: string } | null>(null);
  const [produtosCadastrados, setProdutosCadastrados] = useState<Produto[]>([]);

  // Referências dos inputs de arquivo
  const inputFrenteRef = useRef<HTMLInputElement>(null);
  const inputCostasRef = useRef<HTMLInputElement>(null);

  const carregarProdutos = async () => {
    try {
      const res = await fetch("/api/admin/produtos");
      const data = await res.json();
      if (data.produtos) setProdutosCadastrados(data.produtos);
    } catch (err) {
      console.error("Erro ao carregar produtos:", err);
    }
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  // Preenche nome padrão dinamicamente ao trocar de time ou categoria
  useEffect(() => {
    if (!idEdicao) {
      const rotulosCat: Record<CategoriaProduto, string> = {
        titular: "Camisa Titular 2026/27",
        visitante: "Camisa Visitante 2026/27",
        terceira: "Camisa Terceiro Uniforme",
        goleiro: "Camisa de Goleiro",
        retro: "Camisa Retrô Edição Histórica",
      };
      setNome(`${timeSelecionado.apelido} — ${rotulosCat[categoria]}`);
    }
  }, [timeSelecionado, categoria, idEdicao]);

  const handleToggleTamanho = (tam: string) => {
    setTamanhos((prev) =>
      prev.includes(tam) ? prev.filter((t) => t !== tam) : [...prev, tam]
    );
  };

  const handleLimparFormulario = () => {
    setIdEdicao(null);
    setCategoria("titular");
    setTemporada("2026/27");
    setPrecoReais("299.00");
    setPrecoOriginalReais("");
    setStatus("novo");
    setTamanhos(["P", "M", "G", "GG"]);
    setArquivoFrente(null);
    setPreviewFrente(null);
    setArquivoCostas(null);
    setPreviewCostas(null);
    setMensagem(null);
    if (inputFrenteRef.current) inputFrenteRef.current.value = "";
    if (inputCostasRef.current) inputCostasRef.current.value = "";
  };

  const handleEditar = (p: Produto) => {
    const timeRef = times.find((t) => t.slug === p.timeSlug) || times[0];
    setTimeSelecionado(timeRef);
    setIdEdicao(p.id);
    setNome(p.nome);
    setCategoria(p.categoria);
    setTemporada(p.temporada);
    setPrecoReais((p.precoCentavos / 100).toFixed(2));
    setPrecoOriginalReais(p.precoOriginalCentavos ? (p.precoOriginalCentavos / 100).toFixed(2) : "");
    setStatus(p.status);
    setTamanhos(p.tamanhosDisponiveis || []);
    setPreviewFrente(p.imagemFrente || null);
    setPreviewCostas(p.imagemCostas || null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleExcluir = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir esta camisa do catálogo?")) return;
    try {
      const res = await fetch(`/api/admin/produtos?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setMensagem({ tipo: "sucesso", texto: "Produto excluído com sucesso." });
        await carregarProdutos();
      }
    } catch (err) {
      setMensagem({ tipo: "erro", texto: "Erro ao excluir produto." });
    }
  };

  const handleSalvarProduto = async (e: React.FormEvent) => {
    e.preventDefault();
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

      // Upload da foto da frente (se fornecido arquivo novo)
      if (arquivoFrente) {
        const formDataFrente = new FormData();
        formDataFrente.append("file", arquivoFrente);
        formDataFrente.append("tipo", "camisa");
        formDataFrente.append("timeSlug", timeSelecionado.slug);
        formDataFrente.append("categoria", categoria);
        formDataFrente.append("vista", "frente");

        const resFrente = await fetch("/api/admin/upload", { method: "POST", body: formDataFrente });
        const dataFrente = await resFrente.json();
        if (dataFrente.publicUrl) caminhoFrente = dataFrente.publicUrl;
      }

      // Upload da foto das costas (se fornecido arquivo novo)
      if (arquivoCostas) {
        const formDataCostas = new FormData();
        formDataCostas.append("file", arquivoCostas);
        formDataCostas.append("tipo", "camisa");
        formDataCostas.append("timeSlug", timeSelecionado.slug);
        formDataCostas.append("categoria", categoria);
        formDataCostas.append("vista", "costas");

        const resCostas = await fetch("/api/admin/upload", { method: "POST", body: formDataCostas });
        const dataCostas = await resCostas.json();
        if (dataCostas.publicUrl) caminhoCostas = dataCostas.publicUrl;
      }

      const precoCentavos = Math.round(valPreco * 100);
      const valPrecoOrig = precoOriginalReais ? parseFloat(precoOriginalReais.replace(",", ".")) : null;
      const precoOriginalCentavos = valPrecoOrig && !isNaN(valPrecoOrig) ? Math.round(valPrecoOrig * 100) : null;

      const payload = {
        id: idEdicao || `prod-${timeSelecionado.slug}-${categoria}-${Date.now()}`,
        slug: `${timeSelecionado.slug}-${categoria}-${Date.now().toString().slice(-4)}`,
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
        setMensagem({ tipo: "sucesso", texto: `✅ Manto cadastrado com sucesso no catálogo do ${timeSelecionado.apelido}!` });
        handleLimparFormulario();
        await carregarProdutos();
      } else {
        setMensagem({ tipo: "erro", texto: `❌ ${resData.error || "Erro ao salvar manto."}` });
      }
    } catch (err: any) {
      setMensagem({ tipo: "erro", texto: `❌ ${err?.message || "Falha ao comunicar com servidor."}` });
    } finally {
      setEnviando(false);
    }
  };

  const timesFiltrados = times.filter((t) => {
    const atendeBusca = t.nome.toLowerCase().includes(busca.toLowerCase()) || t.apelido.toLowerCase().includes(busca.toLowerCase());
    const atendePais = paisFiltro === "Todos" || t.pais.toLowerCase() === paisFiltro.toLowerCase();
    return atendeBusca && atendePais;
  });

  return (
    <main className="min-h-screen bg-ink pt-28 pb-20 text-chalk">
      <Section spacing="sm" className="border-b border-border bg-ink-soft">
        <Container className="max-w-[1280px]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <p className="font-mono text-eyebrow uppercase text-flood mb-1">
                Painel do Administrador · Paulin Gostosin 🔥
              </p>
              <h1 className="font-display text-display-md font-bold uppercase text-chalk">
                Cadastro de Mantos por Clube
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-chalk-dim bg-surface px-3 py-1.5 rounded border border-border">
                📦 Mantos Cadastrados: <strong className="text-flood">{produtosCadastrados.length}</strong>
              </span>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="md">
        <Container className="max-w-[1280px]">
          <div className="grid grid-cols-12 gap-8">
            {/* Form de Cadastro */}
            <div className="col-span-12 lg:col-span-7 space-y-6">
              <form onSubmit={handleSalvarProduto} className="rounded-lg border border-border bg-surface p-6 shadow-card space-y-6">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <h2 className="font-display text-display-sm uppercase font-bold text-chalk flex items-center gap-2">
                    <span>{idEdicao ? "✏️ Editar Manto" : "➕ Cadastrar Novo Manto"}</span>
                  </h2>
                  {idEdicao && (
                    <button
                      type="button"
                      onClick={handleLimparFormulario}
                      className="text-xs font-mono text-flood hover:underline"
                    >
                      Cancelar Edição
                    </button>
                  )}
                </div>

                {/* 1. Seleção do Time */}
                <div>
                  <label className="block font-mono text-xs uppercase text-chalk-dim mb-1.5 font-semibold">
                    1. Selecione o Clube ou Seleção
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Filtrar times..."
                      value={busca}
                      onChange={(e) => setBusca(e.target.value)}
                      className="flex-1 bg-ink border border-border rounded px-3 py-2 text-sm text-chalk placeholder:text-chalk-dim focus:outline-none focus:border-flood"
                    />
                  </div>
                  <select
                    value={timeSelecionado.slug}
                    onChange={(e) => {
                      const t = times.find((x) => x.slug === e.target.value);
                      if (t) setTimeSelecionado(t);
                    }}
                    className="w-full bg-ink border border-border rounded px-3 py-2.5 text-sm text-chalk focus:outline-none focus:border-flood font-mono"
                  >
                    {timesFiltrados.map((t) => (
                      <option key={t.id} value={t.slug}>
                        {t.apelido} — {t.nome} ({t.pais})
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2. Nome do Produto */}
                <div>
                  <label className="block font-mono text-xs uppercase text-chalk-dim mb-1.5 font-semibold">
                    2. Nome / Título do Manto
                  </label>
                  <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                    placeholder="Ex: Fluminense — Camisa Titular 2026/27"
                    className="w-full bg-ink border border-border rounded px-3.5 py-2.5 text-sm text-chalk focus:outline-none focus:border-flood"
                  />
                </div>

                {/* 3. Categoria, Temporada & Status */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-mono text-xs uppercase text-chalk-dim mb-1.5 font-semibold">
                      Categoria
                    </label>
                    <select
                      value={categoria}
                      onChange={(e) => setCategoria(e.target.value as any)}
                      className="w-full bg-ink border border-border rounded px-3 py-2 text-sm text-chalk focus:outline-none focus:border-flood font-mono"
                    >
                      <option value="titular">Titular</option>
                      <option value="visitante">Visitante</option>
                      <option value="terceira">Terceiro Uniforme</option>
                      <option value="goleiro">Goleiro</option>
                      <option value="retro">Retrô</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-mono text-xs uppercase text-chalk-dim mb-1.5 font-semibold">
                      Temporada
                    </label>
                    <input
                      type="text"
                      value={temporada}
                      onChange={(e) => setTemporada(e.target.value)}
                      placeholder="Ex: 2026/27"
                      className="w-full bg-ink border border-border rounded px-3 py-2 text-sm text-chalk focus:outline-none focus:border-flood font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs uppercase text-chalk-dim mb-1.5 font-semibold">
                      Badge / Selo
                    </label>
                    <select
                      value={status || ""}
                      onChange={(e) => setStatus((e.target.value as any) || null)}
                      className="w-full bg-ink border border-border rounded px-3 py-2 text-sm text-chalk focus:outline-none focus:border-flood font-mono"
                    >
                      <option value="">Sem Badge</option>
                      <option value="novo">NOVO</option>
                      <option value="limitada">EDIÇÃO LIMITADA</option>
                      <option value="retro">RETRÔ</option>
                      <option value="esgotando">ESGOTANDO</option>
                    </select>
                  </div>
                </div>

                {/* 4. Preço & Preço Original */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-xs uppercase text-chalk-dim mb-1.5 font-semibold">
                      Preço de Venda (R$)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={precoReais}
                      onChange={(e) => setPrecoReais(e.target.value)}
                      required
                      placeholder="299.00"
                      className="w-full bg-ink border border-border rounded px-3.5 py-2 text-sm text-chalk focus:outline-none focus:border-flood font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs uppercase text-chalk-dim mb-1.5 font-semibold">
                      Preço Antigo / Promoção (R$) <span className="text-chalk-dim font-normal">(Opcional)</span>
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={precoOriginalReais}
                      onChange={(e) => setPrecoOriginalReais(e.target.value)}
                      placeholder="359.00"
                      className="w-full bg-ink border border-border rounded px-3.5 py-2 text-sm text-chalk focus:outline-none focus:border-flood font-mono"
                    />
                  </div>
                </div>

                {/* 5. Tamanhos Disponíveis */}
                <div>
                  <label className="block font-mono text-xs uppercase text-chalk-dim mb-2 font-semibold">
                    Tamanhos Disponíveis para Venda
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {tamanhosBase.map((tam) => {
                      const ativo = tamanhos.includes(tam);
                      return (
                        <button
                          key={tam}
                          type="button"
                          onClick={() => handleToggleTamanho(tam)}
                          className={`px-3 py-1.5 font-mono text-xs font-bold rounded border transition-colors ${
                            ativo
                              ? "bg-flood text-ink border-flood"
                              : "bg-ink border-border text-chalk-dim hover:text-chalk"
                          }`}
                        >
                          {tam}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 6. Upload de Imagens (Frente e Costas) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-border">
                  {/* Foto Frente */}
                  <div>
                    <label className="block font-mono text-xs uppercase text-chalk-dim mb-1.5 font-semibold">
                      Foto da Frente (.jpg)
                    </label>
                    <div className="border border-dashed border-border rounded-lg p-3 text-center bg-ink/60">
                      <input
                        ref={inputFrenteRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setArquivoFrente(e.target.files[0]);
                            setPreviewFrente(URL.createObjectURL(e.target.files[0]));
                          }
                        }}
                        className="hidden"
                        id="input-frente"
                      />
                      <label htmlFor="input-frente" className="cursor-pointer block">
                        {previewFrente ? (
                          <div className="flex flex-col items-center gap-1">
                            <img src={previewFrente} alt="Frente" className="h-28 object-contain rounded border border-border" />
                            <span className="text-[0.65rem] font-mono text-flood underline">Trocar Foto da Frente</span>
                          </div>
                        ) : (
                          <div className="py-3">
                            <span className="text-2xl">📸</span>
                            <p className="text-xs text-chalk font-semibold mt-1">Carregar Foto Frente</p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>

                  {/* Foto Costas */}
                  <div>
                    <label className="block font-mono text-xs uppercase text-chalk-dim mb-1.5 font-semibold">
                      Foto das Costas (.jpg) <span className="text-chalk-dim font-normal">(Opcional)</span>
                    </label>
                    <div className="border border-dashed border-border rounded-lg p-3 text-center bg-ink/60">
                      <input
                        ref={inputCostasRef}
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setArquivoCostas(e.target.files[0]);
                            setPreviewCostas(URL.createObjectURL(e.target.files[0]));
                          }
                        }}
                        className="hidden"
                        id="input-costas"
                      />
                      <label htmlFor="input-costas" className="cursor-pointer block">
                        {previewCostas ? (
                          <div className="flex flex-col items-center gap-1">
                            <img src={previewCostas} alt="Costas" className="h-28 object-contain rounded border border-border" />
                            <span className="text-[0.65rem] font-mono text-flood underline">Trocar Foto das Costas</span>
                          </div>
                        ) : (
                          <div className="py-3">
                            <span className="text-2xl">🔄</span>
                            <p className="text-xs text-chalk font-semibold mt-1">Carregar Foto Costas</p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                </div>

                {/* Botão Submit */}
                <button
                  type="submit"
                  disabled={enviando}
                  className="w-full py-4 px-6 rounded font-mono text-sm uppercase font-bold tracking-wider bg-flood text-ink hover:bg-flood-soft shadow-[0_0_20px_rgba(250,204,21,0.4)] transition-all"
                >
                  {enviando ? "Salvando no Catálogo..." : idEdicao ? "💾 Atualizar Manto" : "💾 Cadastrar Manto no Catálogo"}
                </button>

                {mensagem && (
                  <div
                    className={`p-3 rounded text-sm font-mono ${
                      mensagem.tipo === "sucesso"
                        ? "bg-green-500/20 text-green-300 border border-green-500/40"
                        : "bg-red-500/20 text-red-300 border border-red-500/40"
                    }`}
                  >
                    {mensagem.texto}
                  </div>
                )}
              </form>
            </div>

            {/* Lista de Mantos Realmente Cadastrados */}
            <div className="col-span-12 lg:col-span-5">
              <div className="rounded-lg border border-border bg-surface p-6 shadow-card flex flex-col h-full">
                <div className="flex items-center justify-between mb-4 border-b border-border pb-3">
                  <h2 className="font-display text-display-sm uppercase font-bold text-chalk">
                    Mantos Cadastrados ({produtosCadastrados.length})
                  </h2>
                </div>

                {produtosCadastrados.length === 0 ? (
                  <div className="p-8 text-center bg-ink rounded border border-border text-chalk-dim space-y-2">
                    <p className="text-2xl">👕</p>
                    <p className="text-sm font-semibold">Nenhum manto cadastrado no momento.</p>
                    <p className="text-xs font-mono">Use o formulário ao lado para adicionar os primeiros produtos do seu catálogo!</p>
                  </div>
                ) : (
                  <div className="flex-1 max-h-[720px] overflow-y-auto pr-2 custom-scrollbar space-y-3">
                    {produtosCadastrados.map((p) => {
                      const timeRef = times.find((t) => t.slug === p.timeSlug);
                      return (
                        <div
                          key={p.id}
                          className="flex items-center justify-between p-3 rounded border border-border bg-ink hover:border-chalk/30 transition-all"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="h-12 w-12 rounded bg-surface border border-border p-1 shrink-0 flex items-center justify-center overflow-hidden">
                              {p.imagemFrente ? (
                                <img src={p.imagemFrente} alt={p.nome} className="h-full w-full object-contain" />
                              ) : (
                                <span className="font-mono text-[0.6rem] text-chalk-dim">SEM FOTO</span>
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="text-body-sm font-bold text-chalk truncate">
                                {p.nome}
                              </p>
                              <p className="text-caption font-mono text-flood font-bold">
                                {formatarPreco(p.precoCentavos)}{" "}
                                {p.precoOriginalCentavos && (
                                  <span className="line-through text-chalk-dim font-normal text-[0.7rem] ml-1">
                                    {formatarPreco(p.precoOriginalCentavos)}
                                  </span>
                                )}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <a
                              href={timeRef?.tipo === "clube" ? `/times/${p.timeSlug}` : `/selecoes/${p.timeSlug}`}
                              target="_blank"
                              rel="noreferrer"
                              className="px-2.5 py-1 text-xs font-mono bg-surface border border-border text-chalk-dim hover:text-chalk hover:border-chalk/40 rounded flex items-center gap-1"
                            >
                              👁️ Ver no Site
                            </a>
                            <button
                              type="button"
                              onClick={() => handleEditar(p)}
                              className="px-2.5 py-1 text-xs font-mono bg-surface border border-border text-chalk hover:border-flood hover:text-flood rounded"
                            >
                              Editar
                            </button>
                            <button
                              type="button"
                              onClick={() => handleExcluir(p.id)}
                              className="px-2.5 py-1 text-xs font-mono bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 rounded"
                            >
                              Excluir
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
