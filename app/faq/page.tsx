import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export default function FAQPage() {
  const faqs = [
    {
      pergunta: "Os produtos são reais ou o e-commerce é uma demonstração?",
      resposta:
        "Esta aplicação é 100% demonstrativa e criada como peça de portfólio profissional de desenvolvimento de software. Nenhum pagamento real é cobrado e nenhuma camisa física será enviada.",
    },
    {
      pergunta: "Como funciona a simulação de checkout e Pix?",
      resposta:
        "O fluxo de checkout calcula o subtotal, aplica descontos de cupom, calcula fretes (padrão grátis / expresso R$ 25,00) e concede 5% de desconto no Pix. Tudo é executado em tempo real em centavos para evitar divergências.",
    },
    {
      pergunta: "Os dados de produtos criados no Admin ficam salvos?",
      resposta:
        "Sim! Caso esteja rodando localmente, os mantos adicionados ou editados no Gerenciador de Mantos (/admin/camisas) são gravados de forma persistente no arquivo de dados JSON da aplicação.",
    },
    {
      pergunta: "Como foram implementados os filtros e buscas?",
      resposta:
        "A busca conta com normalização Unicode (NFD) para ignorar acentos, caixa alta/baixa e múltiplos espaços, pesquisando simultaneamente em nome, time, apelido, temporada, categoria e país.",
    },
  ];

  return (
    <Section spacing="lg">
      <Container className="max-w-3xl flex flex-col gap-8">
        <div>
          <span className="font-mono text-eyebrow uppercase text-flood mb-2 block">
            Dúvidas Frequentes
          </span>
          <h1 className="font-display font-bold uppercase text-display-lg text-chalk">
            Perguntas Frequentes (FAQ)
          </h1>
          <p className="text-body text-chalk-dim mt-2">
            Entenda como funciona o projeto Arena Futebol Store e suas principais características técnicas.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-border rounded-md p-5 bg-surface flex flex-col gap-2"
            >
              <h3 className="font-display font-bold uppercase text-lg text-chalk">
                {faq.pergunta}
              </h3>
              <p className="text-body-sm text-chalk-dim leading-relaxed">
                {faq.resposta}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
