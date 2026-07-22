"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Time, getEscudoSvg } from "@/mock/times";
import { hrefTime } from "@/lib/utils";

interface MegaMenuProps {
  aberto: boolean;
  titulo: string;
  descricao: string;
  itens: Time[];
}

export function MegaMenu({ aberto, titulo, descricao, itens }: MegaMenuProps) {
  const [paisFiltro, setPaisFiltro] = useState<string>("Todos");

  // Lista de países únicos presentes nos itens
  const paisesDisponiveis = Array.from(new Set(itens.map((i) => i.pais)));

  const itensFiltrados =
    paisFiltro === "Todos"
      ? itens
      : itens.filter((t) => t.pais.toLowerCase() === paisFiltro.toLowerCase());

  return (
    <AnimatePresence>
      {aberto && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-0 right-0 top-full border-b border-border bg-ink-soft/98 backdrop-blur-md shadow-rise z-50"
        >
          <div className="container mx-auto max-w-[1440px] px-5 sm:px-6 lg:px-10 py-8">
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-12 md:col-span-3 flex flex-col justify-between">
                <div>
                  <p className="font-mono text-eyebrow uppercase text-flood mb-2">
                    {titulo}
                  </p>
                  <p className="text-body-sm text-chalk-dim max-w-[240px] mb-6">
                    {descricao}
                  </p>
                </div>

                {/* Abas de filtro por País (se houver mais de 1 país) */}
                {paisesDisponiveis.length > 1 && (
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border">
                    <button
                      onClick={() => setPaisFiltro("Todos")}
                      className={`px-3 py-1 text-xs font-mono uppercase rounded transition-colors ${
                        paisFiltro === "Todos"
                          ? "bg-flood text-ink font-bold"
                          : "bg-surface text-chalk-dim hover:text-chalk"
                      }`}
                    >
                      Todos ({itens.length})
                    </button>
                    {paisesDisponiveis.map((p) => {
                      const count = itens.filter((t) => t.pais === p).length;
                      return (
                        <button
                          key={p}
                          onClick={() => setPaisFiltro(p)}
                          className={`px-3 py-1 text-xs font-mono uppercase rounded transition-colors ${
                            paisFiltro === p
                              ? "bg-flood text-ink font-bold"
                              : "bg-surface text-chalk-dim hover:text-chalk"
                          }`}
                        >
                          {p} ({count})
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="col-span-12 md:col-span-9 max-h-[420px] overflow-y-auto pr-2 custom-scrollbar">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {itensFiltrados.map((time) => (
                    <Link
                      key={time.id}
                      href={hrefTime(time)}
                      className="group flex items-center gap-3 rounded p-2.5 border border-transparent hover:border-border hover:bg-surface transition-colors duration-snap ease-sprint"
                    >
                      <span
                        className="h-9 w-9 shrink-0 rounded-sm p-1 flex items-center justify-center overflow-hidden"
                        style={{ background: time.cores.primaria }}
                      >
                        {time.escudoUrl ? (
                          <img
                            src={time.escudoUrl}
                            alt={time.apelido}
                            className="h-full w-full object-contain"
                          />
                        ) : (
                          <span
                            className="h-full w-full block"
                            dangerouslySetInnerHTML={{ __html: getEscudoSvg(time) }}
                          />
                        )}
                      </span>
                      <span className="flex flex-col min-w-0">
                        <span className="text-body-sm font-semibold text-chalk group-hover:text-flood transition-colors duration-snap truncate">
                          {time.apelido}
                        </span>
                        <span className="flex items-center gap-1.5 mt-0.5">
                          <span className="font-mono text-[0.65rem] text-chalk-dim/70 uppercase">
                            {time.pais}
                          </span>
                          <span className="flex gap-1">
                            {[time.cores.primaria, time.cores.secundaria, time.cores.terciaria].map(
                              (c, i) => (
                                <span
                                  key={i}
                                  className="h-1.5 w-1.5 rounded-full border border-white/10"
                                  style={{ background: c }}
                                />
                              )
                            )}
                          </span>
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
