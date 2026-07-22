"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function ContatoPage() {
  const [enviado, setEnviado] = useState(false);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome || !email || !mensagem) return;
    setEnviado(true);
  };

  return (
    <Section spacing="lg">
      <Container className="max-w-2xl flex flex-col gap-8">
        <div>
          <span className="font-mono text-eyebrow uppercase text-flood mb-2 block">
            Fale Conosco
          </span>
          <h1 className="font-display font-bold uppercase text-display-lg text-chalk">
            Contato & Demonstração
          </h1>
          <p className="text-body text-chalk-dim mt-2">
            Este formulário é parte da simulação de portfólio. Envie sua mensagem para testar o feedback interativo.
          </p>
        </div>

        {enviado ? (
          <div className="rounded-md border border-success/40 bg-success/10 p-6 flex flex-col gap-3 text-center">
            <span className="text-2xl">✅</span>
            <h3 className="font-display font-bold text-lg text-chalk uppercase">
              Mensagem Simulada Enviada!
            </h3>
            <p className="text-body-sm text-chalk-dim">
              Obrigado, <strong className="text-chalk">{nome}</strong>. Esta interatividade demonstra a validação e o estado de sucesso do formulário.
            </p>
            <Button variant="secondary" size="sm" className="mt-2 self-center" onClick={() => setEnviado(false)}>
              Enviar outra mensagem
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5 border border-border p-6 rounded-md bg-surface">
            <div>
              <Input
                label="Seu Nome"
                id="nome-contato"
                placeholder="Ex: Carlos Silva"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
            <div>
              <Input
                label="Seu E-mail"
                id="email-contato"
                type="email"
                placeholder="seu.email@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="mensagem" className="block font-mono text-caption uppercase text-chalk-dim mb-1.5">
                Mensagem
              </label>
              <textarea
                id="mensagem"
                rows={4}
                placeholder="Escreva sua dúvida ou mensagem de teste aqui..."
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                required
                className="w-full rounded border border-border bg-surface-raised px-3.5 py-2.5 font-body text-body-sm text-chalk placeholder:text-chalk-dim/50 focus:border-flood focus:outline-none transition-colors"
              />
            </div>

            <Button type="submit" variant="primary" size="lg" className="w-full">
              Enviar Mensagem Demonstrativa
            </Button>
          </form>
        )}
      </Container>
    </Section>
  );
}
