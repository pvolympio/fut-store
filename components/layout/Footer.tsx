import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { NewsletterForm } from "./NewsletterForm";
import { clubes, selecoes } from "@/mock/navegacao";
import { hrefTime } from "@/lib/utils";

const paginasInstitucionais = [
  { nome: "Sobre o Projeto", href: "/sobre" },
  { nome: "Guia de tamanhos", href: "/guia-de-tamanhos" },
  { nome: "Trocas e devoluções", href: "/trocas-e-devolucoes" },
  { nome: "Perguntas Frequentes (FAQ)", href: "/faq" },
  { nome: "Contato & Suporte", href: "/contato" },
  { nome: "Termos & Privacidade", href: "/privacidade" },
];

const selosDemonstrativos = [
  { titulo: "Simulação de Checkout", desc: "Ambiente seguro de teste para portfólio" },
  { titulo: "Catálogo Interativo", desc: "Busca normalizada e adição rápida" },
  { titulo: "Zero Cobranças Reais", desc: "Projeto 100% demonstrativo" },
  { titulo: "Painel Admin Integrado", desc: "Gestão local de produtos" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-ink-soft grain-overlay">
      <Section spacing="lg" className="border-b border-border">
        <Container>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <p className="font-mono text-eyebrow uppercase text-flood mb-3">
                Newsletter Demonstrativa
              </p>
              <h2 className="font-display font-bold uppercase text-display-md text-chalk max-w-md">
                Lançamentos antes de todo mundo
              </h2>
            </div>
            <NewsletterForm />
          </div>
        </Container>
      </Section>

      <Section spacing="md" className="border-b border-border">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <p className="font-mono text-caption uppercase tracking-[0.08em] text-chalk-dim mb-4">
                Clubes Principais
              </p>
              <ul className="flex flex-col gap-2.5">
                {clubes.slice(0, 5).map((t) => (
                  <li key={t.id}>
                    <Link
                      href={hrefTime(t)}
                      className="text-body-sm text-chalk-dim hover:text-flood transition-colors duration-snap"
                    >
                      {t.apelido}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-mono text-caption uppercase tracking-[0.08em] text-chalk-dim mb-4">
                Seleções
              </p>
              <ul className="flex flex-col gap-2.5">
                {selecoes.slice(0, 5).map((t) => (
                  <li key={t.id}>
                    <Link
                      href={hrefTime(t)}
                      className="text-body-sm text-chalk-dim hover:text-flood transition-colors duration-snap"
                    >
                      {t.apelido}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-mono text-caption uppercase tracking-[0.08em] text-chalk-dim mb-4">
                Informações & Ajuda
              </p>
              <ul className="flex flex-col gap-2.5">
                {paginasInstitucionais.map((item) => (
                  <li key={item.nome}>
                    <Link
                      href={item.href}
                      className="text-body-sm text-chalk-dim hover:text-flood transition-colors duration-snap"
                    >
                      {item.nome}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-mono text-caption uppercase tracking-[0.08em] text-chalk-dim mb-4">
                Sobre o Desenvolvedor
              </p>
              <p className="text-body-sm text-chalk-dim leading-relaxed mb-3">
                Aplicação criada para demonstração de portfólio profissional com Next.js e TypeScript.
              </p>
              <Link
                href="/sobre"
                className="font-mono text-caption uppercase text-flood hover:underline font-bold"
              >
                Saiba mais sobre a arquitetura →
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="sm" className="border-b border-border">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {selosDemonstrativos.map((s) => (
              <div key={s.titulo} className="flex items-start gap-3">
                <span className="h-2 w-2 mt-1.5 rounded-full bg-flood shrink-0" />
                <div>
                  <p className="text-body-sm text-chalk font-semibold">{s.titulo}</p>
                  <p className="text-caption text-chalk-dim">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section spacing="sm">
        <Container>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-display font-black uppercase text-xl text-chalk">
                PAULIN
              </span>
              <span className="rounded bg-gradient-to-r from-flood via-amber-400 to-yellow-300 text-ink font-mono text-[0.6rem] font-black uppercase px-1.5 py-0.5 shadow-sm">
                GOSTOSIN 🔥
              </span>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <p className="font-mono text-caption text-chalk-dim text-center sm:text-left">
                © 2026 Arena Futebol Store · Projeto de Portfólio Demonstrativo
              </p>
              <Link
                href="/admin/camisas"
                className="font-mono text-caption text-flood hover:underline flex items-center gap-1.5 shrink-0 bg-surface px-2.5 py-1 rounded border border-border"
              >
                ⚙️ Gerenciador de Mantos
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </footer>
  );
}
