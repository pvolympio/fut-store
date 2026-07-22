import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import type { Metadata } from "next";
import { ProductBrowser } from "@/components/product/ProductBrowser";
import { produtos } from "@/mock/produtos";
import { times, timesResumo } from "@/mock/times";

export const metadata: Metadata = {
  title: "Catálogo Completo — FUTREP",
  description:
    "Todas as camisas de clubes e seleções da FUTREP em um só lugar, com busca, filtro e ordenação.",
};

export default function CatalogoPage() {
  return (
    <main>
      <Section spacing="lg" className="border-b border-border">
        <Container>
          <p className="font-mono text-eyebrow uppercase text-flood mb-3">Catálogo</p>
          <h1 className="font-display font-black uppercase text-display-lg text-chalk mb-4 max-w-2xl">
            Todas as camisas, todos os times
          </h1>
          <p className="text-body text-chalk-dim max-w-lg">
            {produtos.length} produtos de {times.length} clubes e seleções — busque pelo nome,
            cruze filtros de categoria e tamanho, ou ordene por preço.
          </p>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container>
          <ProductBrowser produtos={produtos} mostrarBusca times={timesResumo} />
        </Container>
      </Section>
    </main>
  );
}
