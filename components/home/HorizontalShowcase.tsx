"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { formatarPreco, produtos } from "@/mock/produtos";
import { times, getEscudoSvg, getTimePorSlug } from "@/mock/times";
import { cn } from "@/lib/utils";

const destaque = produtos.filter((p) => p.categoria === "titular" && p.status === "novo").slice(0, 8);

export function HorizontalShowcase() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [ativo, setAtivo] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    function onScroll() {
      if (!track) return;
      const cardWidth = track.scrollWidth / destaque.length;
      setAtivo(Math.round(track.scrollLeft / cardWidth));
    }
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  function irPara(i: number) {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = track.scrollWidth / destaque.length;
    track.scrollTo({ left: cardWidth * i, behavior: "smooth" });
  }

  return (
    <Section spacing="lg">
      <Container className="!px-0 sm:!px-6 lg:!px-10">
        <div className="px-5 sm:px-0 flex items-end justify-between mb-8">
          <div>
            <p className="font-mono text-eyebrow uppercase text-flood mb-3">Recém-chegadas</p>
            <h2 className="font-display font-bold uppercase text-display-md text-chalk">
              Lançamentos 26/27
            </h2>
          </div>
          <div className="hidden sm:flex gap-2">
            <button
              onClick={() => irPara(Math.max(0, ativo - 1))}
              aria-label="Anterior"
              className="h-11 w-11 flex items-center justify-center rounded-full border border-border text-chalk hover:border-flood hover:text-flood transition-colors duration-snap ease-sprint"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M10 2L4 8L10 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={() => irPara(Math.min(destaque.length - 1, ativo + 1))}
              aria-label="Próximo"
              className="h-11 w-11 flex items-center justify-center rounded-full border border-border text-chalk hover:border-flood hover:text-flood transition-colors duration-snap ease-sprint"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M6 2L12 8L6 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-5 sm:px-0 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {destaque.map((produto) => {
            const time = getTimePorSlug(produto.timeSlug)!;
            return (
              <Link
                key={produto.id}
                href={`/produtos/${produto.slug}`}
                className="group shrink-0 w-[68vw] xs:w-[52vw] sm:w-[320px] snap-start rounded-md border border-border bg-surface overflow-hidden"
              >
                <div
                  className="relative aspect-[3/4] flex items-end p-4"
                  style={{ background: `linear-gradient(150deg, ${time.cores.primaria}45, var(--surface-raised) 75%)` }}
                >
                  <Badge variant={produto.status ?? "novo"} className="absolute top-3 left-3" />
                  <span
                    className="absolute top-3 right-3 h-8 w-8 opacity-80"
                    dangerouslySetInnerHTML={{ __html: getEscudoSvg(time) }}
                  />
                  <p className="font-mono text-caption text-chalk-dim/50">IMG 3:4</p>
                </div>
                <div className="p-4">
                  <p className="font-mono text-caption uppercase tracking-[0.06em] text-chalk-dim mb-1">
                    {time.apelido}
                  </p>
                  <p className="text-body-sm text-chalk line-clamp-1 mb-2 group-hover:text-flood transition-colors duration-snap">
                    {produto.nome}
                  </p>
                  <span className="font-mono text-data text-flood">{formatarPreco(produto.precoCentavos)}</span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {destaque.map((_, i) => (
            <button
              key={i}
              onClick={() => irPara(i)}
              aria-label={`Ir para item ${i + 1}`}
              className={cn(
                "h-1.5 rounded-full transition-all duration-quick ease-sprint",
                ativo === i ? "w-6 bg-flood" : "w-1.5 bg-chalk-dim/40 hover:bg-chalk-dim"
              )}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
