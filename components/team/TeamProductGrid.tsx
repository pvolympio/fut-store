import { Produto } from "@/mock/produtos";
import { ProductBrowser } from "@/components/product/ProductBrowser";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export function TeamProductGrid({ produtos }: { produtos: Produto[] }) {
  return (
    <Section id="produtos-grid" spacing="lg" className="scroll-mt-20">
      <Container>
        <p className="font-mono text-eyebrow uppercase text-team-primary mb-3">Coleção</p>
        <h2 className="font-display font-bold uppercase text-display-md text-chalk mb-10">
          Camisas disponíveis
        </h2>
        <ProductBrowser produtos={produtos} temaTime />
      </Container>
    </Section>
  );
}
