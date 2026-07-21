"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const itens = [
  {
    titulo: "Material e caimento",
    corpo:
      "Tecido em poliéster reciclado de alta performance, com tecnologia de secagem rápida e escudo bordado — nunca estampado. Corte atlético, levemente justo.",
  },
  {
    titulo: "Envio e trocas",
    corpo:
      "Envio rastreado para todo o Brasil. Trocas gratuitas em até 30 dias, desde que a camisa não tenha sido personalizada com nome e número.",
  },
  {
    titulo: "Como cuidar",
    corpo:
      "Lavar à mão ou em ciclo delicado, água fria. Não usar alvejante. Secar à sombra e passar a ferro pelo avesso, evitando o escudo bordado.",
  },
];

export function ProductDetails({ temaTime = false }: { temaTime?: boolean }) {
  const [aberto, setAberto] = useState<number | null>(0);

  return (
    <div className="border-t border-border">
      {itens.map((item, i) => {
        const expandido = aberto === i;
        return (
          <div key={item.titulo} className="border-b border-border">
            <button
              onClick={() => setAberto(expandido ? null : i)}
              className="w-full flex items-center justify-between py-5 text-left"
            >
              <span className="font-display font-bold uppercase text-display-sm text-chalk">
                {item.titulo}
              </span>
              <motion.span
                animate={{ rotate: expandido ? 45 : 0 }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className={cn("text-2xl leading-none", temaTime ? "text-team-primary" : "text-flood")}
              >
                +
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {expandido && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="text-body-sm text-chalk-dim pb-5 max-w-xl">{item.corpo}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
