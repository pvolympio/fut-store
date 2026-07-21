import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Checkbox } from "@/components/ui/Checkbox";
import { Skeleton, SkeletonProductCard } from "@/components/ui/Skeleton";
import { times, getEscudoSvg } from "@/mock/times";
import { produtos, formatarPreco } from "@/mock/produtos";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-eyebrow uppercase text-flood mb-3">{children}</p>
  );
}

function SwatchCard({
  nome,
  varName,
  hex,
  texto = "chalk",
}: {
  nome: string;
  varName: string;
  hex: string;
  texto?: "chalk" | "ink";
}) {
  return (
    <div className="flex flex-col rounded-md overflow-hidden border border-border">
      <div
        className="h-24 w-full flex items-end p-3"
        style={{ background: hex }}
      >
        <span
          className={`font-mono text-caption ${
            texto === "ink" ? "text-ink" : "text-chalk"
          }`}
        >
          {hex}
        </span>
      </div>
      <div className="bg-surface px-3 py-2.5">
        <p className="text-body-sm font-semibold text-chalk">{nome}</p>
        <p className="font-mono text-caption text-chalk-dim">{varName}</p>
      </div>
    </div>
  );
}

export default function StyleGuidePage() {
  const timesAmostra = times.slice(0, 4);
  const produtosAmostra = produtos.slice(0, 4);

  return (
    <main className="grain-overlay">
      {/* HERO */}
      <Section spacing="xl" className="border-b border-border relative overflow-hidden">
        <Container>
          <Eyebrow>Design System — Etapa 1 / 5</Eyebrow>
          <h1 className="font-display font-black uppercase text-display-2xl text-chalk">
            Túnel de
            <br />
            <span className="text-flood">Acesso</span>
          </h1>
          <p className="mt-6 max-w-xl text-body text-chalk-dim">
            Referência viva do design system da Arena. Tokens, componentes e
            comportamento de motion documentados lado a lado — a base sobre a
            qual todo o e-commerce será construído.
          </p>
        </Container>
      </Section>

      {/* CONCEITO */}
      <Section className="border-b border-border">
        <Container>
          <Eyebrow>01 · Conceito Visual</Eyebrow>
          <h2 className="font-display font-bold uppercase text-display-md text-chalk mb-4">
            O instante antes da entrada em campo
          </h2>
          <p className="max-w-2xl text-body text-chalk-dim">
            O concreto escuro do túnel do vestiário, o eco da torcida e o
            estouro repentino de luz dos refletores de sódio ao pisar no
            gramado à noite. A interface vive nesse contraste: fundo quase
            preto, tipografia de placar e um único acento de luz — o
            &ldquo;flood&rdquo; — que marca exatamente o que importa em cada
            tela: preço, disponibilidade, chamada para ação.
          </p>
        </Container>
      </Section>

      {/* CORES */}
      <Section className="border-b border-border">
        <Container>
          <Eyebrow>02 · Paleta de Cores</Eyebrow>
          <h2 className="font-display font-bold uppercase text-display-md text-chalk mb-8">
            Base + Assinatura
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <SwatchCard nome="Ink (fundo)" varName="--ink" hex="#0A0B0D" />
            <SwatchCard nome="Surface" varName="--surface" hex="#17181C" />
            <SwatchCard nome="Chalk (texto)" varName="--chalk" hex="#F5F5F0" texto="ink" />
            <SwatchCard nome="Flood (assinatura)" varName="--flood" hex="#FFC72C" texto="ink" />
            <SwatchCard nome="Chalk Dim" varName="--chalk-dim" hex="#A6A7AD" texto="ink" />
            <SwatchCard nome="Border" varName="--border" hex="#2B2C32" />
            <SwatchCard nome="Success" varName="--success" hex="#3BA55D" />
            <SwatchCard nome="Danger" varName="--danger" hex="#E5484D" />
          </div>
          <p className="mt-6 text-body-sm text-chalk-dim max-w-2xl">
            <strong className="text-chalk">--team-primary/secondary/tertiary</strong>{" "}
            já existem como variáveis reservadas para a Etapa 2, quando cada
            página de time sobrescreverá o accent global pela cor do escudo.
          </p>
        </Container>
      </Section>

      {/* TIPOGRAFIA */}
      <Section className="border-b border-border">
        <Container>
          <Eyebrow>03 · Tipografia</Eyebrow>
          <h2 className="font-display font-bold uppercase text-display-md text-chalk mb-2">
            Placar + Editorial
          </h2>
          <p className="text-body-sm text-chalk-dim mb-10 max-w-2xl">
            Big Shoulders Display (condensada, inspirada em sinalização de
            estádio) para títulos · Archivo (geométrica) para texto corrido ·
            IBM Plex Mono para preços, tamanhos e dados — o registro de
            &ldquo;placar&rdquo;.
          </p>
          <div className="flex flex-col gap-6 border-t border-border pt-8">
            {[
              { label: "display-2xl", cls: "text-display-2xl", sample: "GOL" },
              { label: "display-xl", cls: "text-display-xl", sample: "Camisa Titular" },
              { label: "display-lg", cls: "text-display-lg", sample: "Edição Limitada" },
              { label: "display-md", cls: "text-display-md", sample: "Nova Coleção 26/27" },
            ].map((t) => (
              <div key={t.label} className="flex items-baseline gap-6 border-b border-border pb-6">
                <span className="w-32 shrink-0 font-mono text-caption text-chalk-dim">
                  {t.label}
                </span>
                <span className={`font-display font-bold uppercase text-chalk ${t.cls}`}>
                  {t.sample}
                </span>
              </div>
            ))}
            <div className="flex items-baseline gap-6">
              <span className="w-32 shrink-0 font-mono text-caption text-chalk-dim">body</span>
              <span className="text-body text-chalk max-w-lg">
                Texto corrido em Archivo — usado em descrições de produto,
                textos institucionais e conteúdo de apoio em geral.
              </span>
            </div>
            <div className="flex items-baseline gap-6">
              <span className="w-32 shrink-0 font-mono text-caption text-chalk-dim">data</span>
              <span className="font-mono text-data text-flood">
                {formatarPreco(37900)} · TAM. G · EST. 12
              </span>
            </div>
          </div>
        </Container>
      </Section>

      {/* GRID / ESPAÇAMENTO */}
      <Section className="border-b border-border">
        <Container>
          <Eyebrow>04 · Grid, Espaçamento e Breakpoints</Eyebrow>
          <h2 className="font-display font-bold uppercase text-display-md text-chalk mb-6">
            Ritmo vertical de 8px
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {["xs 400", "sm 480", "md 768", "lg 1024", "xl 1280", "2xl 1536"].map((b) => (
              <div key={b} className="border border-border rounded p-4">
                <span className="font-mono text-data text-chalk">{b}px</span>
              </div>
            ))}
          </div>
          <p className="text-body-sm text-chalk-dim max-w-2xl">
            Container centralizado com largura máxima de 1440px e padding
            fluido (1.25rem no mobile até 3rem em telas xl). Seções usam a
            escala <code className="font-mono text-flood">sm/md/lg/xl</code> de
            padding vertical — nunca margin ad-hoc.
          </p>
        </Container>
      </Section>

      {/* MOTION */}
      <Section className="border-b border-border">
        <Container>
          <Eyebrow>05 · Linguagem de Motion — &ldquo;Snap &amp; Surge&rdquo;</Eyebrow>
          <h2 className="font-display font-bold uppercase text-display-md text-chalk mb-6">
            Rápido no toque, cinematográfico na entrada
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="border border-border rounded p-5">
              <p className="font-mono text-caption text-flood mb-2">snap · 150ms</p>
              <p className="text-body-sm text-chalk-dim">
                Micro-interações: hover de botão, checkbox, foco de input.
                Easing sprint — resposta imediata.
              </p>
            </div>
            <div className="border border-border rounded p-5">
              <p className="font-mono text-caption text-flood mb-2">quick · 220ms</p>
              <p className="text-body-sm text-chalk-dim">
                Transições de estado: troca de cor, abertura de dropdown,
                troca de badge.
              </p>
            </div>
            <div className="border border-border rounded p-5">
              <p className="font-mono text-caption text-flood mb-2">cinema · 700ms</p>
              <p className="text-body-sm text-chalk-dim">
                Momentos de entrada: hero, troca de tema por time
                (&ldquo;flood-on&rdquo;), revelação de galeria de produto.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* BOTÕES */}
      <Section className="border-b border-border">
        <Container>
          <Eyebrow>06 · Botões</Eyebrow>
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <Button variant="primary">Adicionar à sacola</Button>
            <Button variant="secondary">Ver detalhes</Button>
            <Button variant="ghost">Cancelar</Button>
            <Button variant="danger">Remover</Button>
            <Button variant="primary" disabled>
              Esgotado
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary" size="sm">
              Pequeno
            </Button>
            <Button variant="primary" size="md">
              Médio
            </Button>
            <Button variant="primary" size="lg">
              Grande
            </Button>
            <Button variant="secondary" size="icon" aria-label="Favoritar">
              ♥
            </Button>
          </div>
        </Container>
      </Section>

      {/* BADGES */}
      <Section className="border-b border-border">
        <Container>
          <Eyebrow>07 · Badges</Eyebrow>
          <div className="flex flex-wrap gap-3">
            <Badge variant="novo" />
            <Badge variant="limitada" />
            <Badge variant="retro" />
            <Badge variant="esgotando" />
          </div>
        </Container>
      </Section>

      {/* FORMULÁRIOS */}
      <Section className="border-b border-border">
        <Container>
          <Eyebrow>08 · Inputs, Selects e Checkboxes</Eyebrow>
          <div className="grid md:grid-cols-3 gap-8 max-w-3xl">
            <Input label="Buscar time" placeholder="Ex: Brasil, Estrela Real..." />
            <Select label="Tamanho" defaultValue="M">
              {["PP", "P", "M", "G", "GG", "XG"].map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </Select>
            <div className="flex flex-col gap-3 justify-center">
              <Checkbox label="Apenas com estoque" defaultChecked />
              <Checkbox label="Edição limitada" />
              <Checkbox label="Retrô" disabled />
            </div>
          </div>
        </Container>
      </Section>

      {/* SKELETONS */}
      <Section className="border-b border-border">
        <Container>
          <Eyebrow>09 · Skeleton Loaders</Eyebrow>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <SkeletonProductCard />
            <SkeletonProductCard />
            <Skeleton className="h-40 w-full" />
            <div className="flex flex-col gap-3 justify-center">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        </Container>
      </Section>

      {/* AMOSTRA DE DADOS MOCKADOS */}
      <Section spacing="lg">
        <Container>
          <Eyebrow>10 · Times e Produtos (dados mockados)</Eyebrow>
          <h2 className="font-display font-bold uppercase text-display-md text-chalk mb-8">
            Amostra do mock
          </h2>

          <p className="font-mono text-caption uppercase tracking-[0.08em] text-chalk-dim mb-4">
            Escudos (placeholder SVG)
          </p>
          <div className="grid grid-cols-4 md:grid-cols-6 gap-4 mb-12">
            {timesAmostra.map((time) => (
              <div
                key={time.id}
                className="flex flex-col items-center gap-2 border border-border rounded p-4"
              >
                <div
                  className="h-16 w-16"
                  dangerouslySetInnerHTML={{ __html: getEscudoSvg(time) }}
                />
                <span className="text-caption text-chalk-dim text-center">
                  {time.apelido}
                </span>
              </div>
            ))}
          </div>

          <p className="font-mono text-caption uppercase tracking-[0.08em] text-chalk-dim mb-4">
            Cartão de produto
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {produtosAmostra.map((produto) => (
              <div
                key={produto.id}
                className="group flex flex-col rounded-md overflow-hidden border border-border bg-surface transition-colors duration-quick ease-sprint hover:border-flood/50"
              >
                <div className="relative aspect-[3/4] bg-surface-raised flex items-center justify-center">
                  {produto.status && (
                    <Badge
                      variant={produto.status}
                      className="absolute top-3 left-3"
                    />
                  )}
                  <span className="font-mono text-caption text-chalk-dim/50">
                    IMG 3:4
                  </span>
                </div>
                <div className="p-3 flex flex-col gap-1">
                  <p className="text-body-sm text-chalk line-clamp-2">
                    {produto.nome}
                  </p>
                  <div className="flex items-center gap-2 font-mono text-data">
                    <span className="text-flood">
                      {formatarPreco(produto.precoCentavos)}
                    </span>
                    {produto.precoOriginalCentavos && (
                      <span className="text-chalk-dim line-through">
                        {formatarPreco(produto.precoOriginalCentavos)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
