"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Time, times, getEscudoSvg } from "@/mock/times";
import { hrefTime } from "@/lib/utils";

const destaques = times.filter((t) =>
  ["brasil-flamengo", "espanha-real-madrid", "alemanha-bayern-munchen", "inglaterra-manchester-united"].includes(t.slug)
);

function TiltCard({ time }: { time: Time }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 220, damping: 22 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), { stiffness: 220, damping: 22 });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function onMouseLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <Link href={hrefTime(time)} className="block [perspective:1200px]">
      <motion.div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative aspect-[3/4] rounded-md border border-border overflow-hidden bg-surface"
      >
        {/* "Foto" 1 — cor primária */}
        <div
          className="absolute inset-0 transition-opacity duration-quick ease-sprint group-hover:opacity-0"
          style={{ background: `linear-gradient(160deg, ${time.cores.primaria}55, var(--surface) 75%)` }}
        />
        {/* "Foto" 2 — cor secundária, revelada no hover */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-quick ease-sprint group-hover:opacity-100"
          style={{ background: `linear-gradient(160deg, ${time.cores.secundaria}55, var(--surface) 75%)` }}
        />

        <div style={{ transform: "translateZ(50px)" }} className="relative h-full flex flex-col justify-between p-6">
          <span className="h-14 w-14 drop-shadow-lg transition-transform duration-quick ease-sprint group-hover:scale-110 flex items-center justify-center overflow-hidden">
            {time.escudoUrl ? (
              <img src={time.escudoUrl} alt={time.apelido} className="h-full w-full object-contain" />
            ) : (
              <span className="h-full w-full block" dangerouslySetInnerHTML={{ __html: getEscudoSvg(time) }} />
            )}
          </span>
          <div>
            <p className="font-mono text-caption uppercase tracking-[0.08em] text-chalk-dim mb-1">
              {time.pais}
            </p>
            <p className="font-display font-bold uppercase text-display-sm text-chalk group-hover:text-flood transition-colors duration-quick">
              {time.apelido}
            </p>
            <div className="flex h-1 w-16 mt-3 rounded-full overflow-hidden">
              <span className="flex-1" style={{ background: time.cores.primaria }} />
              <span className="flex-1" style={{ background: time.cores.secundaria }} />
              <span className="flex-1" style={{ background: time.cores.terciaria }} />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export function FeaturedClubs() {
  return (
    <Section spacing="lg" className="border-b border-border">
      <Container>
        <p className="font-mono text-eyebrow uppercase text-flood mb-3">Times de clube</p>
        <h2 className="font-display font-bold uppercase text-display-md text-chalk mb-10 max-w-xl">
          Os grandes clubes que definem a temporada
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {destaques.map((time) => (
            <TiltCard key={time.id} time={time} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
