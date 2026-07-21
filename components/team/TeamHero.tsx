"use client";

import { useState } from "react";
import { Time, getEscudoSvg } from "@/mock/times";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { SmartImage } from "@/components/ui/SmartImage";

export function TeamHero({ time }: { time: Time }) {
  const [erroEscudo, setErroEscudo] = useState(false);
  const scrollToProducts = () => {
    const el = document.getElementById("produtos-grid");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 500, behavior: "smooth" });
    }
  };

  return (
    <div
      className="relative overflow-hidden border-b border-border py-16 md:py-24"
      style={{
        background: `radial-gradient(circle at 80% 20%, ${time.cores.primaria}25 0%, transparent 50%), radial-gradient(circle at 10% 80%, ${time.cores.secundaria}15 0%, transparent 45%), var(--ink)`,
      }}
    >
      {/* Grade decorativa de fundo */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(var(--chalk) 1px, transparent 1px), linear-gradient(90deg, var(--chalk) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Watermark do escudo / fundo */}
      {time.escudoUrl ? (
        <img
          src={time.escudoUrl}
          alt=""
          aria-hidden
          className="pointer-events-none absolute -right-16 md:-right-4 top-1/2 -translate-y-1/2 h-[500px] w-[500px] md:h-[750px] md:w-[750px] lg:h-[850px] lg:w-[850px] opacity-[0.12] blur-[1px] object-contain select-none transition-all duration-700"
        />
      ) : (
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 md:-right-4 top-1/2 -translate-y-1/2 h-[550px] w-[500px] md:h-[800px] md:w-[750px] opacity-[0.10] select-none"
          dangerouslySetInnerHTML={{ __html: getEscudoSvg(time) }}
        />
      )}

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Coluna de texto */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Pill / Tag superior */}
            <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 backdrop-blur-md px-4 py-2 mb-6 shadow-sm">
              <span
                className="h-3 w-3 rounded-full animate-pulse shadow-[0_0_10px_var(--team-primary)]"
                style={{ backgroundColor: time.cores.primaria }}
              />
              <span className="font-mono text-body-sm font-semibold uppercase tracking-wider text-chalk">
                {time.tipo === "clube" ? "Clube Oficial" : "Seleção Nacional"} · {time.pais}
              </span>
            </div>

            {/* Título Principal */}
            <h1 className="font-display font-black uppercase text-display-2xl md:text-display-3xl lg:text-[4rem] xl:text-[4.5rem] text-chalk leading-[0.95] tracking-tight mb-4 drop-shadow-lg">
              {time.nome}
            </h1>

            {/* Subtítulo / Apelido */}
            <p className="font-mono text-body font-bold uppercase text-team-primary tracking-widest mb-6">
              Coleção Oficial & Edições Retrô — {time.apelido}
            </p>

            {/* Barra Tricolor da Identidade do Time */}
            <div className="flex items-center gap-3 mb-8">
              <div className="flex h-3 w-48 rounded-full overflow-hidden border border-white/20 shadow-inner">
                <span className="flex-1" style={{ background: time.cores.primaria }} />
                <span className="flex-1" style={{ background: time.cores.secundaria }} />
                <span className="flex-1" style={{ background: time.cores.terciaria }} />
              </div>
              <span className="font-mono text-caption text-chalk-dim uppercase tracking-wider font-semibold">
                Cores do Manto
              </span>
            </div>

            <p className="text-body-lg text-chalk-dim max-w-xl mb-8 leading-relaxed text-base md:text-lg">
              Mantos oficiais do {time.apelido}, da titular da temporada às relíquias retrô. Tecido de alta tecnologia, bordados de precisão e envio rastreado para todo o Brasil.
            </p>

            {/* Destaques / Benefícios */}
            <div className="grid grid-cols-3 gap-4 w-full max-w-xl mb-10 border border-white/10 bg-white/[0.02] backdrop-blur-sm rounded-xl p-4 md:p-5">
              <div>
                <span className="block font-mono text-body-sm text-team-primary font-black uppercase">100% OFICIAL</span>
                <span className="text-caption text-chalk-dim">Tecido Authentic</span>
              </div>
              <div>
                <span className="block font-mono text-body-sm text-team-primary font-black uppercase">ESCUDO BORDADO</span>
                <span className="text-caption text-chalk-dim">Acabamento Premium</span>
              </div>
              <div>
                <span className="block font-mono text-body-sm text-team-primary font-black uppercase">ENVIO RÁPIDO</span>
                <span className="text-caption text-chalk-dim">Com Rastreio</span>
              </div>
            </div>

            {/* Botão de Ação */}
            <Button
              onClick={scrollToProducts}
              variant="primary"
              size="lg"
              className="bg-team-primary text-team-on-primary hover:bg-team-primary/85 shadow-rise hover:scale-105 transition-all duration-quick font-bold text-body-sm px-8 py-4 flex items-center gap-2"
            >
              Ver Coleção Completa
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </Button>
          </div>

          {/* Coluna Direita — Card do Escudo com Glow 3D Expandido */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative group w-full max-w-[420px] lg:max-w-[460px] aspect-square rounded-3xl border border-white/20 bg-white/[0.06] backdrop-blur-2xl p-10 md:p-12 flex flex-col items-center justify-center shadow-[0_30px_70px_rgba(0,0,0,0.8)] overflow-hidden"
            >
              {/* Glow de Fundo das Cores */}
              <div
                className="absolute inset-0 opacity-50 group-hover:opacity-75 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 50% 45%, ${time.cores.primaria}88 0%, ${time.cores.secundaria}33 55%, transparent 80%)`,
                }}
              />

              {/* Imagem ou SVG do Escudo em Tamanho Grande */}
              <div className="relative z-10 w-52 h-52 sm:w-60 sm:h-60 md:w-64 md:h-64 lg:w-72 lg:h-72 flex items-center justify-center filter drop-shadow-[0_16px_32px_rgba(0,0,0,0.7)] group-hover:scale-110 transition-transform duration-500">
                {!erroEscudo ? (
                  <SmartImage
                    srcBase={`/escudos/${time.slug}`}
                    alt={`Escudo oficial ${time.nome}`}
                    className="w-full h-full object-contain"
                    onFallbackFailed={() => setErroEscudo(true)}
                  />
                ) : (
                  <div
                    className="w-full h-full"
                    dangerouslySetInnerHTML={{ __html: getEscudoSvg(time) }}
                  />
                )}
              </div>

              {/* Tag com Nome do Time no Card */}
              <div className="relative z-10 mt-8 px-6 py-2 rounded-full bg-ink/90 border border-white/15 backdrop-blur-md shadow-lg">
                <span className="font-mono text-body-sm text-chalk uppercase font-bold tracking-wider">
                  {time.apelido}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </div>
  );
}
