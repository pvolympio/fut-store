import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { siteConfig } from "@/config/site";
import Link from "next/link";

export default function SobrePage() {
  return (
    <Section spacing="lg">
      <Container className="max-w-3xl flex flex-col gap-8">
        <div>
          <span className="font-mono text-eyebrow uppercase text-flood mb-2 block">
            Portfólio & Engenharia
          </span>
          <h1 className="font-display font-bold uppercase text-display-lg text-chalk">
            Sobre o Projeto FUTREP
          </h1>
          <p className="text-body text-chalk-dim mt-3 leading-relaxed">
            O **FUTREP** é uma plataforma e-commerce conceitual desenvolvida especificamente para demonstração técnica de portfólio. Ele simula toda a jornada de um e-commerce moderno de mantos esportivos com alto padrão visual, performance e acessibilidade.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-b border-border py-8">
          <div className="flex flex-col gap-2">
            <h3 className="font-mono text-caption uppercase text-flood font-bold">
              🛠️ Arquitetura Técnica
            </h3>
            <p className="text-body-sm text-chalk-dim leading-relaxed">
              Construído com Next.js (App Router), React 18, TypeScript estrito, Tailwind CSS e Framer Motion. Apresenta cálculo em centavos, busca normalizada de texto e simulação completa do checkout.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-mono text-caption uppercase text-flood font-bold">
              🎯 Foco em UX & Acessibilidade
            </h3>
            <p className="text-body-sm text-chalk-dim leading-relaxed">
              Design responsivo refinado, gerenciamento de foco por teclado, leitores de tela com suporte ARIA completo e respeitando as preferências de redução de movimento dos usuários.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-4 bg-surface p-6 rounded-md border border-border">
          <h2 className="font-display font-bold uppercase text-xl text-chalk">
            Natureza Demonstrativa
          </h2>
          <p className="text-body-sm text-chalk-dim leading-relaxed">
            Este projeto não possui fins comerciais, não realiza cobranças reais de cartão/Pix e não efetua envios físicos. Todos os pedidos gerados na aplicação são salvos localmente e servem para demonstrar a reatividade dos componentes de interface e regras de negócio.
          </p>
          <div className="flex items-center gap-4 mt-2">
            <Link
              href="/produtos"
              className="font-mono text-caption text-ink font-bold uppercase bg-flood hover:bg-flood-hover px-4 py-2.5 rounded transition-colors"
            >
              Explorar Catálogo
            </Link>
            <Link
              href="/admin/camisas"
              className="font-mono text-caption text-chalk hover:text-flood uppercase border border-border px-4 py-2.5 rounded transition-colors"
            >
              Abrir Painel Admin
            </Link>
          </div>
        </div>
      </Container>
    </Section>
  );
}
