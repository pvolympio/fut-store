"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Barra de progresso fina no topo (estilo Linear/YouTube).
 * Como o App Router não expõe eventos nativos de "navegação iniciada",
 * simulamos: ao detectar troca de pathname, disparamos uma barra que
 * avança rápido até ~80% e completa em 100% assim que a nova página
 * termina de montar (próximo tick), reforçando a sensação de app rápido
 * mesmo com dados mockados instantâneos.
 */
function BarraInterna() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [progresso, setProgresso] = useState(0);
  const [visivel, setVisivel] = useState(false);
  const primeiraRenderizacao = useRef(true);

  useEffect(() => {
    if (primeiraRenderizacao.current) {
      primeiraRenderizacao.current = false;
      return;
    }
    setVisivel(true);
    setProgresso(20);

    const t1 = setTimeout(() => setProgresso(72), 60);
    const t2 = setTimeout(() => setProgresso(100), 220);
    const t3 = setTimeout(() => setVisivel(false), 480);
    const t4 = setTimeout(() => setProgresso(0), 620);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  return (
    <AnimatePresence>
      {visivel && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed top-0 left-0 right-0 z-[100] h-[2.5px] bg-transparent"
        >
          <motion.div
            animate={{ width: `${progresso}%` }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="h-full bg-flood shadow-[0_0_8px_1px_rgba(255,199,44,0.6)]"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function RouteLoadingBar() {
  return (
    <Suspense fallback={null}>
      <BarraInterna />
    </Suspense>
  );
}
