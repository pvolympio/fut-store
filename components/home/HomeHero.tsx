"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { times, getEscudoSvg } from "@/mock/times";

const linha = {
  hidden: { y: "110%" },
  show: (i: number) => ({
    y: "0%",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] as const, delay: 0.15 + i * 0.08 },
  }),
};

export function HomeHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yEscudo = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const yTexto = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const opacidade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const escudoDestaque = times.find((t) => t.slug === "brasil")!;

  return (
    <div ref={ref} className="relative overflow-hidden border-b border-border min-h-[92vh] flex items-center">
      {/* Refletor — glow radial que remete ao conceito "túnel de acesso" */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 78% 15%, rgba(255,199,44,0.16) 0%, transparent 60%)",
        }}
      />

      {/* Escudo gigante ao fundo, com parallax leve no scroll */}
      <motion.div
        aria-hidden
        style={{ y: yEscudo }}
        className="pointer-events-none absolute -right-24 md:right-0 top-1/2 -translate-y-1/2 h-[520px] w-[460px] md:h-[760px] md:w-[660px] opacity-[0.08] md:opacity-[0.1]"
        dangerouslySetInnerHTML={{ __html: getEscudoSvg(escudoDestaque) }}
      />

      <Container className="relative py-24 md:py-0">
        <motion.div style={{ y: yTexto, opacity: opacidade }}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-mono text-eyebrow uppercase text-flood mb-6 tracking-widest"
          >
            Paulin Gostosin 🔥 · Coleção Oficial 2026/27
          </motion.p>

          <h1 className="font-display font-black uppercase text-display-2xl text-chalk max-w-4xl">
            {["Seu futebol", "ficou muito mais", "Gostosin."].map((l, i) => (
              <span key={l} className="block overflow-hidden">
                <motion.span
                  custom={i}
                  variants={linha}
                  initial="hidden"
                  animate="show"
                  className={i === 2 ? "block text-flood drop-shadow-[0_0_20px_rgba(250,204,21,0.4)]" : "block"}
                >
                  {l}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-body text-chalk-dim max-w-md mt-8 mb-10"
          >
            Mantos oficiais de {times.length} clubes e seleções lendárias. O estilo supremo do futebol com a garantia de qualidade Paulin Gostosin.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="flex flex-wrap gap-3"
          >
            <Link href="/produtos">
              <Button variant="primary" size="lg">
                Ver catálogo completo
              </Button>
            </Link>
            <Link href="#selecione-seu-time">
              <Button variant="secondary" size="lg">
                Escolher meu time
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </Container>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-chalk-dim"
      >
        <span className="font-mono text-caption uppercase tracking-[0.18em]">Role para explorar</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="h-8 w-px bg-chalk-dim/50"
        />
      </motion.div>
    </div>
  );
}
