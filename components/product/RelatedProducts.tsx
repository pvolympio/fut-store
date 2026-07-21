import { Time } from "@/mock/times";
import { getProdutosPorTime } from "@/mock/produtos";
import { ProductCard } from "@/components/product/ProductCard";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { hrefTime } from "@/lib/utils";
import Link from "next/link";

export function RelatedProducts({
  time,
  slugAtual,
  temaTime = false,
}: {
  time: Time;
  slugAtual: string;
  temaTime?: boolean;
}) {
  const outros = getProdutosPorTime(time.slug).filter((p) => p.slug !== slugAtual).slice(0, 4);
  if (outros.length === 0) return null;

  return (
    <Section spacing="lg" className="border-t border-border">
      <Container>
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="font-mono text-eyebrow uppercase text-team-primary mb-3">
              Mais do {time.apelido}
            </p>
            <h2 className="font-display font-bold uppercase text-display-md text-chalk">
              Complete a coleção
            </h2>
          </div>
          <Link
            href={hrefTime(time)}
            className="hidden sm:block font-mono text-caption uppercase tracking-[0.04em] text-team-primary hover:underline underline-offset-2"
          >
            Ver tudo →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {outros.map((produto, i) => (
            <ProductCard key={produto.id} produto={produto} temaTime={temaTime} indice={i} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
