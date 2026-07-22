import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export default function PrivacidadePage() {
  return (
    <Section spacing="lg">
      <Container className="max-w-3xl flex flex-col gap-8">
        <div>
          <span className="font-mono text-eyebrow uppercase text-flood mb-2 block">
            Termos & Segurança
          </span>
          <h1 className="font-display font-bold uppercase text-display-lg text-chalk">
            Privacidade e Proteção de Dados
          </h1>
          <p className="text-body text-chalk-dim mt-2">
            Entenda como os dados de demonstração são tratados nesta aplicação.
          </p>
        </div>

        <div className="flex flex-col gap-6 text-body-sm text-chalk-dim leading-relaxed">
          <div className="border border-border p-5 rounded-md bg-surface">
            <h3 className="font-display font-bold uppercase text-chalk text-base mb-2">
              Armazenamento estritamente local (localStorage)
            </h3>
            <p>
              Os dados de sacola de compras, cupons aplicados e preferências do usuário são mantidos exclusivamente no navegador do visitante via `localStorage` e não são enviados a servidores externos de terceiros.
            </p>
          </div>

          <div className="border border-border p-5 rounded-md bg-surface">
            <h3 className="font-display font-bold uppercase text-chalk text-base mb-2">
              Sem coleta de dados pessoais sensíveis
            </h3>
            <p>
              Os formulários de checkout e identificação aceitam dados fictícios para fins de teste. Não insira dados bancários reais, cartões de crédito verdadeiros ou senhas pessoais.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
