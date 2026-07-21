import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { NewsletterForm } from "./NewsletterForm";
import { clubes, selecoes } from "@/mock/navegacao";
import { hrefTime } from "@/lib/utils";

const redes = [
  { nome: "Instagram", href: "#" },
  { nome: "TikTok", href: "#" },
  { nome: "X", href: "#" },
  { nome: "YouTube", href: "#" },
];

const selos = [
  { titulo: "Compra Protegida", desc: "Pagamento 100% seguro" },
  { titulo: "Produto Original", desc: "Licenciado oficialmente" },
  { titulo: "Troca Fácil", desc: "30 dias para trocar" },
  { titulo: "Envio Rastreado", desc: "Do estoque até sua casa" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-ink-soft grain-overlay">
      <Section spacing="lg" className="border-b border-border">
        <Container>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <div>
              <p className="font-mono text-eyebrow uppercase text-flood mb-3">
                Newsletter
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <p className="font-mono text-caption uppercase tracking-[0.08em] text-chalk-dim mb-4">
                Clubes
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
                Ajuda
              </p>
              <ul className="flex flex-col gap-2.5">
                {["Guia de tamanhos", "Trocas e devoluções", "Rastrear pedido", "Fale conosco"].map(
                  (item) => (
                    <li key={item}>
                      <Link
                        href="#"
                        className="text-body-sm text-chalk-dim hover:text-flood transition-colors duration-snap"
                      >
                        {item}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
            <div>
              <p className="font-mono text-caption uppercase tracking-[0.08em] text-chalk-dim mb-4">
                Siga a Arena
              </p>
              <ul className="flex flex-col gap-2.5">
                {redes.map((r) => (
                  <li key={r.nome}>
                    <Link
                      href={r.href}
                      className="text-body-sm text-chalk-dim hover:text-flood transition-colors duration-snap"
                    >
                      {r.nome}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="sm" className="border-b border-border">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {selos.map((s) => (
              <div key={s.titulo} className="flex items-start gap-3">
                <span className="h-2 w-2 mt-1.5 rounded-full bg-flood shrink-0" />
                <div>
                  <p className="text-body-sm text-chalk">{s.titulo}</p>
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
            <p className="font-mono text-caption text-chalk-dim text-center">
              © 2026 Paulin Gostosin. Mantos oficiais com o mais alto padrão de qualidade do futebol.
            </p>
          </div>
        </Container>
      </Section>
    </footer>
  );
}
