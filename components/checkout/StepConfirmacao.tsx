"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { formatarPreco } from "@/mock/produtos";
import { ItemCarrinho } from "@/lib/cart-types";

interface StepConfirmacaoProps {
  numeroPedido: string;
  itens: ItemCarrinho[];
  totalCentavos: number;
  emailDestino: string;
  onNovaCompra: () => void;
}

export function StepConfirmacao({
  numeroPedido,
  itens,
  totalCentavos,
  emailDestino,
  onNovaCompra,
}: StepConfirmacaoProps) {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    let cancelado = false;
    import("canvas-confetti").then(({ default: confetti }) => {
      if (cancelado) return;
      const cores = ["#ffc72c", "#ffe08a", "#f5f5f0"];
      confetti({
        particleCount: 90,
        spread: 75,
        startVelocity: 38,
        gravity: 1.1,
        scalar: 0.85,
        origin: { y: 0.3 },
        colors: cores,
      });
      setTimeout(() => {
        if (!cancelado) {
          confetti({ particleCount: 50, spread: 100, origin: { y: 0.25 }, colors: cores, scalar: 0.7 });
        }
      }, 250);
    });

    return () => {
      cancelado = true;
    };
  }, []);

  return (
    <div className="flex flex-col items-center text-center gap-6 py-4">
      <motion.div
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="h-20 w-20 rounded-full bg-flood flex items-center justify-center"
      >
        <motion.svg
          width="34"
          height="34"
          viewBox="0 0 34 34"
          fill="none"
          initial="hidden"
          animate="visible"
        >
          <motion.path
            d="M8 18L14 24L26 10"
            stroke="var(--ink)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            variants={{
              hidden: { pathLength: 0 },
              visible: { pathLength: 1, transition: { duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] } },
            }}
          />
        </motion.svg>
      </motion.div>

      <div>
        <p className="font-display font-bold uppercase text-display-md text-chalk mb-2">Pedido confirmado</p>
        <p className="text-body-sm text-chalk-dim max-w-sm">
          Enviamos os detalhes para <span className="text-chalk">{emailDestino}</span>. Seu pedido{" "}
          <span className="font-mono text-flood">#{numeroPedido}</span> já está sendo preparado no túnel.
        </p>
      </div>

      <div className="w-full max-w-md border border-border rounded-md p-5 text-left">
        <p className="font-mono text-caption uppercase tracking-[0.06em] text-chalk-dim mb-4">
          Resumo do pedido
        </p>
        <ul className="flex flex-col gap-3 mb-4">
          {itens.map((item) => (
            <li key={item.chave} className="flex items-center justify-between gap-3 text-body-sm">
              <span className="text-chalk-dim truncate">
                {item.quantidade}× {item.nome}
                {item.personalizacao?.numero && ` (${item.personalizacao.numero})`}
              </span>
              <span className="font-mono text-chalk shrink-0">
                {formatarPreco((item.precoUnitarioCentavos + item.precoPersonalizacaoCentavos) * item.quantidade)}
              </span>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between border-t border-border pt-3 font-semibold">
          <span className="text-chalk">Total pago</span>
          <span className="font-mono text-flood">{formatarPreco(totalCentavos)}</span>
        </div>
      </div>

      <Button variant="secondary" size="lg" onClick={onNovaCompra}>
        Continuar comprando
      </Button>
    </div>
  );
}
