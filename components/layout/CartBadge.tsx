"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/components/cart/CartContext";

export function CartBadge() {
  const { quantidade, ultimoIncremento, abrirCarrinho } = useCart();

  return (
    <button
      onClick={abrirCarrinho}
      aria-label={`Abrir sacola com ${quantidade} ${quantidade === 1 ? "item" : "itens"}`}
      className="relative h-11 w-11 flex items-center justify-center rounded-full text-chalk hover:bg-surface-raised transition-colors duration-snap ease-sprint"
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path
          d="M5 7H15L14.3 17.2C14.25 17.9 13.66 18.5 12.95 18.5H7.05C6.34 18.5 5.75 17.9 5.7 17.2L5 7Z"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <path d="M7 7V5.5C7 3.6 8.34 2 10 2C11.66 2 13 3.6 13 5.5V7" stroke="currentColor" strokeWidth="1.4" />
      </svg>
      <AnimatePresence>
        {quantidade > 0 && (
          <motion.span
            key={ultimoIncremento}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 500, damping: 18 }}
            className="absolute -top-0.5 -right-0.5 h-[18px] min-w-[18px] px-1 rounded-full bg-flood text-ink font-mono text-[10px] font-bold flex items-center justify-center leading-none"
          >
            {quantidade}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
