"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/Button";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [enviado, setEnviado] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setEnviado(true);
  }

  if (enviado) {
    return (
      <p className="font-mono text-body-sm text-flood">
        Inscrição confirmada — fique de olho no seu e-mail.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="seu@email.com"
        className="h-12 flex-1 rounded bg-surface border border-border px-4 text-body text-chalk placeholder:text-chalk-dim/60 transition-colors duration-snap ease-sprint hover:border-chalk/40 focus-visible:outline-none focus-visible:border-flood focus-visible:ring-1 focus-visible:ring-flood"
      />
      <Button type="submit" variant="primary">
        Inscrever
      </Button>
    </form>
  );
}
