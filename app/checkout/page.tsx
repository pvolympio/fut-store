"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/components/cart/CartContext";
import { Stepper } from "@/components/checkout/Stepper";
import { StepIdentificacao } from "@/components/checkout/StepIdentificacao";
import { StepEntrega } from "@/components/checkout/StepEntrega";
import { StepPagamento } from "@/components/checkout/StepPagamento";
import { StepConfirmacao } from "@/components/checkout/StepConfirmacao";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { formatarPreco } from "@/mock/produtos";
import { IdentificacaoData, EntregaData, PagamentoData } from "@/lib/checkout-schemas";
import { ItemCarrinho } from "@/lib/cart-types";

interface PedidoConfirmado {
  numero: string;
  itens: ItemCarrinho[];
  totalCentavos: number;
  email: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { itens, subtotalCentavos, descontoCentavos, totalCentavos, cupom, limparCarrinho, hidratado } = useCart();

  const [etapa, setEtapa] = useState(0);
  const [identificacao, setIdentificacao] = useState<Partial<IdentificacaoData>>({});
  const [entrega, setEntrega] = useState<Partial<EntregaData>>({});
  const [pedido, setPedido] = useState<PedidoConfirmado | null>(null);

  const carrinhoVazio = hidratado && itens.length === 0 && !pedido;

  function finalizarPedido(pagamento: PagamentoData) {
    const numero = Math.random().toString(36).slice(2, 8).toUpperCase();
    setPedido({
      numero,
      itens,
      totalCentavos,
      email: identificacao.email ?? "",
    });
    limparCarrinho();
    setEtapa(3);
  }

  if (carrinhoVazio) {
    return (
      <Section spacing="lg">
        <Container className="max-w-lg text-center flex flex-col items-center gap-5 py-16">
          <p className="font-display font-bold uppercase text-display-md text-chalk">
            Sua sacola está vazia
          </p>
          <p className="text-body-sm text-chalk-dim">
            Adicione uma camisa ao carrinho antes de seguir para o checkout.
          </p>
          <Button variant="primary" size="lg" onClick={() => router.push("/produtos")}>
            Ver catálogo
          </Button>
        </Container>
      </Section>
    );
  }

  return (
    <Section spacing="lg">
      <Container className="max-w-4xl">
        <Link
          href="/"
          className="font-display font-black uppercase text-2xl tracking-tight text-chalk mb-8 inline-block"
        >
          Arena<span className="text-flood">.</span>
        </Link>

        <div className="mb-10">
          <Stepper atual={etapa} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_18rem] gap-10">
          <div className="min-w-0">
            <AnimatePresence mode="wait">
              {etapa === 0 && (
                <motion.div key="s0" exit={{ opacity: 0 }}>
                  <StepIdentificacao
                    valoresIniciais={identificacao}
                    onAvancar={(dados) => {
                      setIdentificacao(dados);
                      setEtapa(1);
                    }}
                  />
                </motion.div>
              )}
              {etapa === 1 && (
                <motion.div key="s1" exit={{ opacity: 0 }}>
                  <StepEntrega
                    valoresIniciais={entrega}
                    onAvancar={(dados) => {
                      setEntrega(dados);
                      setEtapa(2);
                    }}
                    onVoltar={() => setEtapa(0)}
                  />
                </motion.div>
              )}
              {etapa === 2 && (
                <motion.div key="s2" exit={{ opacity: 0 }}>
                  <StepPagamento
                    totalCentavos={totalCentavos}
                    onAvancar={finalizarPedido}
                    onVoltar={() => setEtapa(1)}
                  />
                </motion.div>
              )}
              {etapa === 3 && pedido && (
                <motion.div key="s3" exit={{ opacity: 0 }}>
                  <StepConfirmacao
                    numeroPedido={pedido.numero}
                    itens={pedido.itens}
                    totalCentavos={pedido.totalCentavos}
                    emailDestino={pedido.email || "seu e-mail"}
                    onNovaCompra={() => router.push("/produtos")}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {etapa < 3 && (
            <aside className="lg:sticky lg:top-28 h-fit border border-border rounded-md p-5 flex flex-col gap-4">
              <p className="font-mono text-caption uppercase tracking-[0.06em] text-chalk-dim">
                Resumo · {itens.length} {itens.length === 1 ? "item" : "itens"}
              </p>
              <ul className="flex flex-col gap-3 max-h-64 overflow-y-auto pr-1">
                {itens.map((item) => (
                  <li key={item.chave} className="flex items-center gap-3">
                    <div
                      className="h-12 w-10 shrink-0 rounded-sm border border-border"
                      style={{ background: `linear-gradient(155deg, ${item.corFrente}45, var(--surface-raised) 80%)` }}
                      aria-hidden
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-caption text-chalk truncate">{item.nome}</p>
                      <p className="text-caption text-chalk-dim">
                        {item.tamanho} · {item.quantidade}×
                      </p>
                    </div>
                    <span className="font-mono text-caption text-chalk shrink-0">
                      {formatarPreco((item.precoUnitarioCentavos + item.precoPersonalizacaoCentavos) * item.quantidade)}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-1.5 border-t border-border pt-3">
                <div className="flex items-center justify-between text-body-sm text-chalk-dim">
                  <span>Subtotal</span>
                  <span className="font-mono">{formatarPreco(subtotalCentavos)}</span>
                </div>
                {cupom && (
                  <div className="flex items-center justify-between text-body-sm text-success">
                    <span>Cupom {cupom.codigo}</span>
                    <span className="font-mono">−{formatarPreco(descontoCentavos)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between text-body text-chalk font-semibold pt-1">
                  <span>Total</span>
                  <span className="font-mono text-flood">{formatarPreco(totalCentavos)}</span>
                </div>
              </div>
            </aside>
          )}
        </div>
      </Container>
    </Section>
  );
}
