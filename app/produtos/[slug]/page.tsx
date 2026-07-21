import { notFound } from "next/navigation";
import { produtos, getProdutoPorSlug } from "@/mock/produtos";
import { getTimePorSlug } from "@/mock/times";
import { TeamThemeProvider } from "@/components/theme/TeamThemeProvider";
import { ProductExperience } from "@/components/product/ProductExperience";
import { ProductDetails } from "@/components/product/ProductDetails";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { hrefTime } from "@/lib/utils";

export function generateStaticParams() {
  return produtos.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const produto = getProdutoPorSlug(params.slug);
  if (!produto) return {};
  return {
    title: `${produto.nome} | Arena`,
    description: `${produto.nome} — temporada ${produto.temporada}. Escudo bordado, tecido de alta performance, personalização com nome e número disponível.`,
  };
}

export default function ProdutoPage({ params }: { params: { slug: string } }) {
  const produto = getProdutoPorSlug(params.slug);
  if (!produto) notFound();

  const time = getTimePorSlug(produto.timeSlug);
  if (!time) notFound();

  return (
    <TeamThemeProvider time={time}>
      <main>
        <Section spacing="lg">
          <Container>
            <Breadcrumb
              temaTime
              itens={[
                { label: "Arena", href: "/" },
                { label: time.tipo === "clube" ? "Clubes" : "Seleções", href: hrefTime(time) },
                { label: time.apelido, href: hrefTime(time) },
                { label: produto.nome },
              ]}
            />
            <ProductExperience produto={produto} temaTime />
            <div className="mt-16">
              <ProductDetails temaTime />
            </div>
          </Container>
        </Section>

        <RelatedProducts time={time} slugAtual={produto.slug} temaTime />
      </main>
    </TeamThemeProvider>
  );
}
