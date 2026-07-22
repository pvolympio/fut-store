"use client";

import { useState } from "react";
import { times, Time, getEscudoSvg } from "@/mock/times";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";

interface TeamSelectorProps {
  timeSelecionado: Time;
  onSelecionarTime: (time: Time) => void;
}

export function TeamSelector({ timeSelecionado, onSelecionarTime }: TeamSelectorProps) {
  const [busca, setBusca] = useState("");
  const [paisFiltro, setPaisFiltro] = useState("Todos");

  const timesFiltrados = times.filter((t) => {
    const atendeBusca =
      t.nome.toLowerCase().includes(busca.toLowerCase()) ||
      t.apelido.toLowerCase().includes(busca.toLowerCase());
    const atendePais =
      paisFiltro === "Todos" || t.pais.toLowerCase() === paisFiltro.toLowerCase();
    return atendeBusca && atendePais;
  });

  return (
    <div className="space-y-4 rounded-md border border-border bg-surface-raised p-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <h3 className="font-mono text-caption uppercase font-bold text-chalk flex items-center gap-2">
          <span>⚽</span> Selecionar Clube / Seleção:
        </h3>
        <span className="font-mono text-caption text-flood font-bold">
          {timeSelecionado.apelido} ({timeSelecionado.pais})
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input
          label="Buscar time..."
          id="busca-time"
          placeholder="Ex: Flamengo, Real Madrid, Brasil"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <Select
          label="Filtrar País"
          id="pais-filtro"
          value={paisFiltro}
          onChange={(e) => setPaisFiltro(e.target.value)}
        >
          <option value="Todos">Todos os Países</option>
          <option value="Brasil">Brasil</option>
          <option value="Inglaterra">Inglaterra</option>
          <option value="Espanha">Espanha</option>
          <option value="Itália">Itália</option>
          <option value="Alemanha">Alemanha</option>
          <option value="França">França</option>
          <option value="Argentina">Argentina</option>
        </Select>
      </div>

      <div className="max-h-48 overflow-y-auto pr-1 grid grid-cols-2 sm:grid-cols-3 gap-2 border border-border rounded p-2 bg-surface">
        {timesFiltrados.map((t) => {
          const selecionado = t.slug === timeSelecionado.slug;
          return (
            <button
              type="button"
              key={t.id}
              onClick={() => onSelecionarTime(t)}
              className={`flex items-center gap-2 text-left p-2 rounded transition-colors ${
                selecionado
                  ? "bg-flood/20 border border-flood text-flood font-bold"
                  : "hover:bg-surface-raised border border-transparent text-chalk-dim hover:text-chalk"
              }`}
            >
              <div
                className="h-6 w-6 shrink-0"
                dangerouslySetInnerHTML={{ __html: getEscudoSvg(t) }}
              />
              <span className="text-caption truncate font-mono">{t.apelido}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
