"use client";

import { useState } from "react";

import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { times, getEscudoSvg } from "@/mock/times";
import { SmartImage } from "@/components/ui/SmartImage";
import { hrefTime } from "@/lib/utils";

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

export function SelectionGrid() {
  return (
    <Section id="selecione-seu-time" spacing="lg" className="border-b border-border scroll-mt-24">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <p className="font-mono text-eyebrow uppercase text-flood mb-3">Prévia do tema dinâmico</p>
            <h2 className="font-display font-bold uppercase text-display-md text-chalk">
              Escolha sua seleção
            </h2>
          </div>
          <p className="text-body-sm text-chalk-dim max-w-sm">
            Passe o mouse sobre um escudo — a Arena inteira se adapta às cores daquele time assim
            que você entra na página.
          </p>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 md:gap-4">
          {times.map((time, i) => (
            <motion.div
              key={time.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: (i % 6) * 0.05 }}
            >
              <Link
                href={hrefTime(time)}
                className="group relative flex flex-col items-center justify-center gap-3 aspect-square rounded-md border border-border p-4 overflow-hidden transition-[border-color,transform] duration-quick ease-sprint hover:-translate-y-1"
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
                <span className="relative font-mono text-[0.65rem] md:text-caption uppercase tracking-[0.04em] text-chalk-dim text-center group-hover:text-chalk transition-colors duration-quick">
                  {time.apelido}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
