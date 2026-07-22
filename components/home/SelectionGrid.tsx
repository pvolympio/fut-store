"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { times, getEscudoSvg } from "@/mock/times";
import { SmartImage } from "@/components/ui/SmartImage";
import { hrefTime } from "@/lib/utils";

import { StadiumAtmosphere } from "@/components/theme/StadiumAtmosphere";

function TeamCrestIcon({ time }: { time: any }) {
  const [erro, setErro] = useState(false);

  if (erro) {
    return (
      <span
        className="h-full w-full block"
        dangerouslySetInnerHTML={{ __html: getEscudoSvg(time) }}
      />
    );
  }

  return (
    <SmartImage
      srcBase={`/escudos/${time.slug}`}
      alt={time.apelido}
      className="h-full w-full object-contain filter drop-shadow-sm"
      onFallbackFailed={() => setErro(true)}
    />
  );
}

const categoriasGrid = [
  { id: "destaques", label: "Destaques" },
  { id: "Brasil", label: "Brasil (Série A)" },
  { id: "Inglaterra", label: "Inglaterra (Premier League)" },
  { id: "Espanha", label: "Espanha (La Liga)" },
  { id: "Itália", label: "Itália (Serie A)" },
  { id: "Alemanha", label: "Alemanha (Bundesliga)" },
  { id: "França", label: "França (Ligue 1)" },
  { id: "selecao", label: "Seleções" },
];

export function SelectionGrid() {
  const [abaAtiva, setAbaAtiva] = useState("destaques");
  const [timeHovered, setTimeHovered] = useState<any>(null);

  const timesFiltrados = times.filter((t) => {
    if (abaAtiva === "destaques") {
      // Exibe os clubes mais populares de cada liga + seleções
      const popularesSlugs = [
        "brasil-flamengo", "brasil-corinthians", "brasil-palmeiras", "brasil-sao-paulo", "brasil-santos", "brasil-vasco-da-gama", "brasil-gremio", "brasil-cruzeiro",
        "inglaterra-arsenal", "inglaterra-chelsea", "inglaterra-liverpool", "inglaterra-manchester-city", "inglaterra-manchester-united", "inglaterra-tottenham",
        "espanha-real-madrid", "espanha-barcelona", "espanha-atletico-de-madrid",
        "italia-inter-de-milao", "italia-milan", "italia-juventus",
        "alemanha-bayern-de-munique", "alemanha-borussia-dortmund", "alemanha-bayer-leverkusen",
        "franca-psg", "franca-marseille",
        "brasil", "argentina", "franca", "alemanha", "portugal", "inglaterra", "espanha"
      ];
      return popularesSlugs.includes(t.slug);
    }
    if (abaAtiva === "selecao") {
      return t.tipo === "selecao";
    }
    return t.pais.toLowerCase() === abaAtiva.toLowerCase() && t.tipo === "clube";
  });

  return (
    <Section id="selecione-seu-time" spacing="lg" className="relative border-b border-border scroll-mt-24 overflow-hidden">
      {/* Holofotes neon animados do estádio (reagem ao mouse) */}
      <StadiumAtmosphere
        corPrimaria={timeHovered?.cores?.primaria}
        corSecundaria={timeHovered?.cores?.secundaria}
        intensidade="media"
      />

      <Container className="relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <p className="font-mono text-eyebrow uppercase text-flood mb-2">Catálogo Oficial 2026/27</p>
            <h2 className="font-display font-bold uppercase text-display-md text-chalk">
              Escolha seu Clube ou Seleção
            </h2>
          </div>
          <p className="text-body-sm text-chalk-dim max-w-sm">
            Navegue pelos {times.length} times oficiais da Temporada 2026/27 (Brasileirão Série A e Top 5 da Europa).
          </p>
        </div>

        {/* Abas de ligas / países */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 custom-scrollbar">
          {categoriasGrid.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setAbaAtiva(cat.id)}
              className={`px-4 py-2 text-xs font-mono uppercase tracking-wider rounded-full shrink-0 transition-all duration-200 ${
                abaAtiva === cat.id
                  ? "bg-flood text-ink font-bold shadow-[0_0_15px_rgba(250,204,21,0.3)]"
                  : "bg-surface border border-border text-chalk-dim hover:text-chalk hover:border-chalk/40"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid de Times */}
        <motion.div
          key={abaAtiva}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 md:gap-4"
        >
          <AnimatePresence mode="popLayout">
            {timesFiltrados.map((time, i) => (
              <motion.div
                key={time.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25, delay: Math.min(i, 16) * 0.02 }}
                onMouseEnter={() => setTimeHovered(time)}
                onMouseLeave={() => setTimeHovered(null)}
              >
                <Link
                  href={hrefTime(time)}
                  className="group relative flex flex-col items-center justify-center gap-2.5 aspect-square rounded-md border border-border p-3 overflow-hidden transition-[border-color,transform] duration-quick ease-sprint hover:-translate-y-1 hover:border-chalk/40"
                  style={{ ["--hover-color" as string]: time.cores.primaria }}
                >
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-quick ease-sprint"
                    style={{
                      background: `radial-gradient(ellipse at 50% 30%, ${time.cores.primaria}35 0%, transparent 70%)`,
                    }}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 rounded-md border opacity-0 group-hover:opacity-100 transition-opacity duration-quick ease-sprint"
                    style={{ borderColor: time.cores.primaria }}
                  />
                  <span className="relative h-10 w-10 md:h-12 md:w-12 transition-transform duration-quick ease-sprint group-hover:scale-110 flex items-center justify-center overflow-hidden">
                    <TeamCrestIcon time={time} />
                  </span>
                  <span className="relative font-mono text-[0.65rem] md:text-caption uppercase tracking-[0.04em] text-chalk-dim text-center group-hover:text-chalk transition-colors duration-quick line-clamp-1">
                    {time.apelido}
                  </span>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </Section>
  );
}
