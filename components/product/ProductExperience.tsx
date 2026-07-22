"use client";

import { useMemo, useState } from "react";
import { useCart } from "@/components/cart/CartContext";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import {
  formatarPreco,
  PRECO_PERSONALIZACAO_CENTAVOS,
  Produto,
  situacaoTamanho,
  tamanhosBase,
} from "@/mock/produtos";
import { corDeTextoIdeal } from "@/lib/theme";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

import { SmartImage } from "@/components/ui/SmartImage";

export function ProductExperience({ produto, temaTime = false }: { produto: Produto; temaTime?: boolean }) {
  const { adicionarItem } = useCart();
  const [view, setView] = useState<"frente" | "costas">("frente");
  const [tamanho, setTamanho] = useState<string | null>(null);
  const [quantidade, setQuantidade] = useState(1);
  const [personalizar, setPersonalizar] = useState(false);
  const [nome, setNome] = useState("");
  const [numero, setNumero] = useState("");
  const [adicionado, setAdicionado] = useState(false);

  const accentText = temaTime ? "text-team-primary" : "text-flood";
  const accentBg = temaTime ? "bg-team-primary text-team-on-primary" : "bg-flood text-ink";
  const accentBorder = temaTime ? "border-team-primary" : "border-flood";

  const corTextoPersonalizacao = corDeTextoIdeal(produto.corCostas);
  const precoTotalUnitario = produto.precoCentavos + (personalizar ? PRECO_PERSONALIZACAO_CENTAVOS : 0);
  const precoTotal = precoTotalUnitario * quantidade;

  const tamanhosInfo = useMemo(
    () => tamanhosBase.map((t) => ({ tamanho: t, situacao: situacaoTamanho(produto, t) })),
    [produto]
  );

  function handleAdicionar() {
    if (!tamanho) return;
    adicionarItem({
      produtoId: produto.id,
      slug: produto.slug,
      nome: produto.nome,
      timeNome: produto.nome.split(" — ")[0],
      timeSlug: produto.timeSlug,
      temporada: produto.temporada,
      precoUnitarioCentavos: produto.precoCentavos,
      precoPersonalizacaoCentavos: personalizar ? PRECO_PERSONALIZACAO_CENTAVOS : 0,
      corFrente: produto.corFrente,
      corCostas: produto.corCostas,
      tamanho,
      personalizacao: personalizar && (nome || numero) ? { nome, numero } : null,
      quantidade,
    });
    setAdicionado(true);
    setTimeout(() => setAdicionado(false), 2200);
  }

  const [erroFrente, setErroFrente] = useState(false);
  const [erroCostas, setErroCostas] = useState(false);

  const imgAtual = view === "frente" ? produto.imagemFrente : produto.imagemCostas;
  const erroAtual = view === "frente" ? erroFrente : erroCostas;
  const setErroAtual = view === "frente" ? setErroFrente : setErroCostas;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16">
      {/* Galeria */}
      <div className="flex flex-col gap-4">
        <div className="relative aspect-[4/5] rounded-md border border-border bg-surface overflow-hidden">
          {produto.status && <Badge variant={produto.status} className="absolute top-4 left-4 z-10" />}

          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex items-center justify-center"
              style={{
                background: `linear-gradient(155deg, ${
                  view === "frente" ? produto.corFrente : produto.corCostas
                }45, var(--surface-raised) 75%)`,
              }}
            >
              {!erroAtual && (
                <SmartImage
                  key={view}
                  srcBase={
                    view === "frente"
                      ? (produto.imagemFrente || `/camisas/${produto.timeSlug}/${produto.categoria}-frente.jpg`)
                      : (produto.imagemCostas || `/camisas/${produto.timeSlug}/${produto.categoria}-costas.jpg`)
                  }
                  alt=""
                  onFallbackFailed={() => setErroAtual(true)}
                  className="absolute inset-0 w-full h-full object-cover z-[1]"
                />
              )}
              <span className="font-mono text-caption text-chalk-dim/50">
                {view === "frente" ? "FRENTE · 4:5" : "COSTAS · 4:5"}
              </span>

              {view === "costas" && personalizar && (nome || numero) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-1 pt-6 z-10 pointer-events-none"
                >
                  {nome && (
                    <span
                      className="font-display font-black uppercase tracking-wide text-2xl md:text-3xl drop-shadow-md"
                      style={{ color: corTextoPersonalizacao }}
                    >
                      {nome}
                    </span>
                  )}
                  {numero && (
                    <span
                      className="font-display font-black text-6xl md:text-8xl leading-none mt-1 drop-shadow-md"
                      style={{ color: corTextoPersonalizacao }}
                    >
                      {numero}
                    </span>
                  )}
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex gap-3">
          {(["frente", "costas"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={cn(
                "flex-1 h-16 rounded-sm border transition-colors duration-snap ease-sprint flex items-center justify-center font-mono text-caption uppercase tracking-[0.06em]",
                view === v
                  ? cn(accentBorder, accentText)
                  : "border-border text-chalk-dim hover:border-chalk/40 hover:text-chalk"
              )}
              style={{
                background: `linear-gradient(155deg, ${
                  v === "frente" ? produto.corFrente : produto.corCostas
                }30, var(--surface-raised) 80%)`,
              }}
            >
              {v === "frente" ? "Frente" : "Costas"}
            </button>
          ))}
        </div>
      </div>

      {/* Painel de compra */}
      <div className="flex flex-col">
        <p className="font-mono text-caption uppercase tracking-[0.06em] text-chalk-dim mb-2">
          {produto.temporada}
        </p>
        <h1 className="font-display font-bold uppercase text-display-md text-chalk mb-4">
          {produto.nome}
        </h1>

        <div className="flex items-center gap-3 font-mono text-display-sm mb-8">
          <span className={accentText}>{formatarPreco(produto.precoCentavos)}</span>
          {produto.precoOriginalCentavos && (
            <span className="text-chalk-dim line-through text-body">
              {formatarPreco(produto.precoOriginalCentavos)}
            </span>
          )}
        </div>

        {/* Tamanhos */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <p className="font-mono text-caption uppercase tracking-[0.08em] text-chalk-dim">
              Tamanho {tamanho && <span className="text-chalk">— {tamanho}</span>}
            </p>
            <button className="font-mono text-caption text-chalk-dim hover:text-chalk underline underline-offset-2">
              Guia de tamanhos
            </button>
          </div>
          <div className="grid grid-cols-6 gap-2">
            {tamanhosInfo.map(({ tamanho: t, situacao }) => {
              const esgotado = situacao === "esgotado";
              const ativo = tamanho === t;
              return (
                <button
                  key={t}
                  disabled={esgotado}
                  onClick={() => setTamanho(t)}
                  className={cn(
                    "relative h-12 rounded border font-mono text-body-sm transition-colors duration-snap ease-sprint",
                    esgotado
                      ? "border-border text-chalk-dim/30 line-through cursor-not-allowed"
                      : ativo
                      ? cn(accentBorder, accentBg)
                      : "border-border text-chalk hover:border-chalk/40"
                  )}
                >
                  {t}
                  {situacao === "poucas-unidades" && !esgotado && (
                    <span
                      aria-hidden
                      className={cn(
                        "absolute -top-1 -right-1 h-2 w-2 rounded-full",
                        ativo ? "bg-danger" : "bg-danger animate-pulse"
                      )}
                    />
                  )}
                </button>
              );
            })}
          </div>
          {produto.estoqueBaixo && (
            <p className="text-caption text-danger mt-2">
              Só restam {produto.unidadesRestantes} unidades nos tamanhos disponíveis.
            </p>
          )}
        </div>

        {/* Personalização */}
        <div className="mb-8 rounded-md border border-border p-5">
          <label className="flex items-center justify-between cursor-pointer">
            <span className="flex flex-col">
              <span className="text-body-sm text-chalk">Personalizar com nome e número</span>
              <span className="text-caption text-chalk-dim">
                + {formatarPreco(PRECO_PERSONALIZACAO_CENTAVOS)} · bordado nas costas
              </span>
            </span>
            <input
              type="checkbox"
              className="sr-only peer"
              checked={personalizar}
              onChange={() => setPersonalizar((v) => !v)}
            />
            <span
              onClick={() => setPersonalizar((v) => !v)}
              className={cn(
                "relative h-7 w-12 shrink-0 rounded-pill border transition-colors duration-quick ease-sprint",
                personalizar ? cn(accentBorder, accentBg) : "border-chalk/30 bg-surface-raised"
              )}
            >
              <span
                className={cn(
                  "absolute top-0.5 h-5 w-5 rounded-full bg-chalk transition-transform duration-quick ease-sprint",
                  personalizar ? "translate-x-[1.375rem]" : "translate-x-0.5"
                )}
              />
            </span>
          </label>

          <AnimatePresence>
            {personalizar && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-2 gap-3 pt-5">
                  <label className="flex flex-col gap-1.5">
                    <span className="font-mono text-caption uppercase tracking-[0.06em] text-chalk-dim">
                      Nome
                    </span>
                    <input
                      value={nome}
                      maxLength={12}
                      onChange={(e) => setNome(e.target.value.toUpperCase().replace(/[^A-ZÀ-Ú ]/g, ""))}
                      placeholder="EX: SILVA"
                      className="h-11 rounded bg-surface border border-border px-3 text-body-sm text-chalk uppercase focus-visible:outline-none focus-visible:border-flood focus-visible:ring-1 focus-visible:ring-flood"
                    />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="font-mono text-caption uppercase tracking-[0.06em] text-chalk-dim">
                      Número
                    </span>
                    <input
                      value={numero}
                      inputMode="numeric"
                      maxLength={2}
                      onChange={(e) => setNumero(e.target.value.replace(/[^0-9]/g, "").slice(0, 2))}
                      placeholder="EX: 10"
                      className="h-11 rounded bg-surface border border-border px-3 text-body-sm text-chalk focus-visible:outline-none focus-visible:border-flood focus-visible:ring-1 focus-visible:ring-flood"
                    />
                  </label>
                </div>
                <p className="text-caption text-chalk-dim mt-2">
                  Veja o resultado na aba &ldquo;Costas&rdquo; da galeria acima.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Quantidade + adicionar */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center border border-border rounded h-12">
            <button
              onClick={() => setQuantidade((q) => Math.max(1, q - 1))}
              className="w-11 h-full flex items-center justify-center text-chalk-dim hover:text-chalk"
              aria-label="Diminuir quantidade"
            >
              −
            </button>
            <span className="w-8 text-center font-mono text-body-sm text-chalk">{quantidade}</span>
            <button
              onClick={() => setQuantidade((q) => Math.min(9, q + 1))}
              className="w-11 h-full flex items-center justify-center text-chalk-dim hover:text-chalk"
              aria-label="Aumentar quantidade"
            >
              +
            </button>
          </div>
          <Button
            variant="primary"
            size="lg"
            disabled={!tamanho}
            onClick={handleAdicionar}
            className={cn("flex-1", temaTime && "bg-team-primary text-team-on-primary hover:bg-team-primary/85")}
          >
            {!tamanho ? "Escolha um tamanho" : adicionado ? "Adicionado ✓" : `Adicionar · ${formatarPreco(precoTotal)}`}
          </Button>
        </div>
        {!tamanho && (
          <p className="text-caption text-chalk-dim">Selecione um tamanho para liberar a compra.</p>
        )}
      </div>
    </div>
  );
}
