import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export default function TrocasEDevolucoesPage() {
  return (
    <Section spacing="lg">
      <Container className="max-w-3xl flex flex-col gap-8">
        <div>
          <span className="font-mono text-eyebrow uppercase text-flood mb-2 block">
            Políticas Demonstrativas
          </span>
          <h1 className="font-display font-bold uppercase text-display-lg text-chalk">
            Trocas e Devoluções
          </h1>
          <p className="text-body text-chalk-dim mt-2">
            Esta página descreve o fluxo simulado de trocas e devoluções para a demonstração de e-commerce.
          </p>
        </div>

        <div className="flex flex-col gap-6 text-body-sm text-chalk-dim leading-relaxed">
          <div className="border border-border p-5 rounded-md bg-surface">
            <h3 className="font-display font-bold uppercase text-chalk text-base mb-2">
              1. Simulação do Prazo de Troca
            </h3>
            <p>
              Em um e-commerce real, os clientes possuem 30 dias corridos após o recebimento para solicitar a troca do produto sem custo adicional. No FUTREP, este fluxo é demonstrado com seletores de tamanhos direto na sacola e no cartão.
            </p>
          </div>

          <div className="border border-border p-5 rounded-md bg-surface">
            <h3 className="font-display font-bold uppercase text-chalk text-base mb-2">
              2. Condições dos Mantos
            </h3>
            <p>
              Em uma loja de produção, o produto deve ser devolvido sem marcas de uso, com etiquetas originais e na embalagem do fabricante.
            </p>
          </div>

          <div className="border border-border p-5 rounded-md bg-surface">
            <h3 className="font-display font-bold uppercase text-chalk text-base mb-2">
              3. Isenção de Operação Real
            </h3>
            <p className="text-chalk font-semibold">
              Reiteramos que nenhuma transação financeira ocorre nesta aplicação e nenhuma logística de devolução será iniciada.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
