"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "./CartContext";
import { Button } from "@/components/ui/Button";
import { formatarPreco } from "@/mock/produtos";
import { hrefTime } from "@/lib/utils";
import { times } from "@/mock/times";
import { cn } from "@/lib/utils";

const timesSugeridos = times.slice(0, 3);

export function CartDrawer() {
  const {
    aberto,
    fecharCarrinho,
    itens,
    subtotalCentavos,
    descontoCentavos,
    totalCentavos,
    cupom,
    aplicarCupom,
    removerCupom,
    atualizarQuantidade,
    removerItem,
    hidratado,
  } = useCart();

  const router = useRouter();
  const [codigoCupom, setCodigoCupom] = useState("");
  const [feedbackCupom, setFeedbackCupom] = useState<"aplicado" | "invalido" | null>(null);
  const painelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") fecharCarrinho();
    }
    if (aberto) {
      document.addEventListener("keydown", onKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [aberto, fecharCarrinho]);

  function handleAplicarCupom() {
    if (!codigoCupom.trim()) return;
    const resultado = aplicarCupom(codigoCupom);
    setFeedbackCupom(resultado);
  }

  if (!hidratado) return null;

  return (
    <AnimatePresence>
      {aberto && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={fecharCarrinho}
            className="fixed inset-0 z-[90] bg-ink/70 backdrop-blur-sm"
            aria-hidden
          />
          <motion.div
            key="painel"
            ref={painelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Carrinho de compras"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 z-[95] h-dvh w-full sm:w-[26rem] bg-ink-soft border-l border-border flex flex-col"
          >
            <div className="flex items-center justify-between h-16 md:h-20 px-5 border-b border-border shrink-0">
              <h2 className="font-display font-bold uppercase text-display-sm text-chalk">
                Sacola {itens.length > 0 && <span className="text-flood">· {itens.length}</span>}
              </h2>
              <button
                onClick={fecharCarrinho}
                aria-label="Fechar carrinho"
                className="h-11 w-11 flex items-center justify-center rounded-full text-chalk-dim hover:text-chalk hover:bg-surface-raised transition-colors duration-snap ease-sprint"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M1 1L15 15M15 1L1 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {itens.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center gap-6 px-8 overflow-y-auto">
                <div className="h-14 w-14 rounded-full flex items-center justify-center border border-flood/50">
                  <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M5 7H15L14.3 17.2C14.25 17.9 13.66 18.5 12.95 18.5H7.05C6.34 18.5 5.75 17.9 5.7 17.2L5 7Z"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      className="text-chalk-dim"
                    />
                    <path d="M7 7V5.5C7 3.6 8.34 2 10 2C11.66 2 13 3.6 13 5.5V7" stroke="currentColor" strokeWidth="1.4" className="text-chalk-dim" />
                  </svg>
                </div>
                <div>
                  <p className="font-display font-bold uppercase text-display-sm text-chalk mb-2">
                    Sua sacola está vazia
                  </p>
                  <p className="text-body-sm text-chalk-dim max-w-xs">
                    Que tal começar por um dos times mais procurados da Arena?
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-3 w-full">
                  {timesSugeridos.map((time) => (
                    <Link
                      key={time.id}
                      href={hrefTime(time)}
                      onClick={fecharCarrinho}
                      className="group flex flex-col items-center gap-2"
                    >
                      <span
                        className="h-16 w-16 rounded-full border border-border flex items-center justify-center font-display font-black text-body-sm transition-colors duration-snap ease-sprint group-hover:border-flood/60"
                        style={{
                          background: `linear-gradient(155deg, ${time.cores.primaria}45, var(--surface-raised) 80%)`,
                          color: time.cores.terciaria,
                        }}
                      >
                        {time.apelido.slice(0, 2).toUpperCase()}
                      </span>
                      <span className="text-caption text-chalk-dim group-hover:text-chalk text-center leading-tight">
                        {time.apelido}
                      </span>
                    </Link>
                  ))}
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    fecharCarrinho();
                    router.push("/produtos");
                  }}
                >
                  Ver catálogo completo
                </Button>
              </div>
            ) : (
              <>
                <ul className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
                  {itens.map((item) => (
                    <motion.li
                      key={item.chave}
                      layout
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 16, height: 0, marginBottom: 0, paddingTop: 0, paddingBottom: 0 }}
                      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                      className="flex gap-3 border-b border-border pb-4 last:border-b-0"
                    >
                      <div
                        className="h-20 w-16 shrink-0 rounded-sm border border-border flex items-center justify-center overflow-hidden"
                        style={{
                          background: `linear-gradient(155deg, ${item.corFrente}45, var(--surface-raised) 80%)`,
                        }}
                        aria-hidden
                      >
                        <span className="font-mono text-[9px] text-chalk-dim/60">{item.tamanho}</span>
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col gap-1">
                        <p className="font-mono text-caption uppercase tracking-[0.05em] text-chalk-dim truncate">
                          {item.timeNome} · {item.temporada}
                        </p>
                        <p className="text-body-sm text-chalk line-clamp-2 leading-snug">{item.nome}</p>
                        <p className="text-caption text-chalk-dim">
                          Tam. {item.tamanho}
                          {item.personalizacao && (item.personalizacao.nome || item.personalizacao.numero) && (
                            <> · {item.personalizacao.nome} {item.personalizacao.numero}</>
                          )}
                        </p>

                        <div className="flex items-center justify-between mt-1.5">
                          <div className="flex items-center border border-border rounded h-8">
                            <button
                              onClick={() => atualizarQuantidade(item.chave, item.quantidade - 1)}
                              aria-label={`Diminuir quantidade de ${item.nome}`}
                              className="w-7 h-full flex items-center justify-center text-chalk-dim hover:text-chalk"
                            >
                              −
                            </button>
                            <span className="w-6 text-center font-mono text-caption text-chalk">
                              {item.quantidade}
                            </span>
                            <button
                              onClick={() => atualizarQuantidade(item.chave, item.quantidade + 1)}
                              aria-label={`Aumentar quantidade de ${item.nome}`}
                              className="w-7 h-full flex items-center justify-center text-chalk-dim hover:text-chalk"
                            >
                              +
                            </button>
                          </div>
                          <span className="font-mono text-data text-chalk">
                            {formatarPreco(
                              (item.precoUnitarioCentavos + item.precoPersonalizacaoCentavos) * item.quantidade
                            )}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => removerItem(item.chave)}
                        aria-label={`Remover ${item.nome} da sacola`}
                        className="self-start text-chalk-dim hover:text-danger transition-colors duration-snap ease-sprint"
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                        </svg>
                      </button>
                    </motion.li>
                  ))}
                </ul>

                <div className="border-t border-border p-5 flex flex-col gap-4 shrink-0">
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      <input
                        value={codigoCupom}
                        onChange={(e) => {
                          setCodigoCupom(e.target.value.toUpperCase());
                          setFeedbackCupom(null);
                        }}
                        placeholder="Cupom de desconto"
                        aria-label="Código de cupom"
                        className="h-10 flex-1 rounded bg-surface border border-border px-3 text-body-sm text-chalk uppercase placeholder:normal-case placeholder:text-chalk-dim/60 focus-visible:outline-none focus-visible:border-flood focus-visible:ring-1 focus-visible:ring-flood"
                      />
                      <Button variant="secondary" size="sm" onClick={handleAplicarCupom} className="shrink-0">
                        Aplicar
                      </Button>
                    </div>
                    <AnimatePresence mode="wait">
                      {feedbackCupom === "aplicado" && cupom && (
                        <motion.p
                          key="ok"
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-caption text-success flex items-center gap-1.5"
                        >
                          ✓ Cupom {cupom.codigo} aplicado — {cupom.descricao}
                          <button
                            onClick={() => {
                              removerCupom();
                              setFeedbackCupom(null);
                              setCodigoCupom("");
                            }}
                            className="underline underline-offset-2 hover:text-chalk ml-1"
                          >
                            remover
                          </button>
                        </motion.p>
                      )}
                      {feedbackCupom === "invalido" && (
                        <motion.p
                          key="erro"
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="text-caption text-danger"
                        >
                          Cupom inválido. Tente ARENA10 ou TUNEL20.
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-body-sm text-chalk-dim">
                      <span>Subtotal</span>
                      <span className="font-mono">{formatarPreco(subtotalCentavos)}</span>
                    </div>
                    {descontoCentavos > 0 && (
                      <div className="flex items-center justify-between text-body-sm text-success">
                        <span>Desconto</span>
                        <span className="font-mono">−{formatarPreco(descontoCentavos)}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between text-body text-chalk font-semibold pt-1">
                      <span>Total</span>
                      <span className="font-mono text-flood">{formatarPreco(totalCentavos)}</span>
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    onClick={() => {
                      fecharCarrinho();
                      router.push("/checkout");
                    }}
                  >
                    Finalizar compra
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
