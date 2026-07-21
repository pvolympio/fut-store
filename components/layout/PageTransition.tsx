"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

/**
 * Transição de página — assinatura "Refletor".
 *
 * Ao trocar de rota: o conteúdo sai com um leve deslize/fade (rápido,
 * "snap"), e simultaneamente um flash fino do accent (--flood) varre a
 * tela de cima para baixo e volta — como um refletor de estádio que
 * acende por um instante entre uma cena e outra. O novo conteúdo entra
 * por baixo, alinhado ao motion "cinema" documentado no style guide.
 *
 * Não usamos um fade genérico: o flash de refletor é o elemento
 * memorável e reforça o conceito "Túnel de Acesso" a cada navegação.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [flashKey, setFlashKey] = useState(0);

  useEffect(() => {
    setFlashKey((k) => k + 1);
  }, [pathname]);

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        <motion.div
          key={flashKey}
          initial={{ scaleY: 0, opacity: 0.9 }}
          animate={{ scaleY: [0, 1, 0], opacity: [0.9, 0.5, 0] }}
          transition={{ duration: 0.6, times: [0, 0.4, 1], ease: [0.16, 1, 0.3, 1] }}
          style={{ originY: 0 }}
          className="pointer-events-none fixed inset-0 z-[95] bg-flood/25"
        />
      </AnimatePresence>
    </>
  );
}
