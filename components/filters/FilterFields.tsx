"use client";

import { CategoriaProduto, categorias, tamanhosBase } from "@/mock/produtos";
import { TimeResumo } from "@/mock/times";
import { FiltrosState } from "@/lib/filtros";
import { cn } from "@/lib/utils";

interface FilterFieldsProps {
  filtros: FiltrosState;
  onChange: (f: FiltrosState) => void;
  temaTime?: boolean;
  /** Só passado no catálogo geral — permite cruzar por time. */
  times?: TimeResumo[];
}

function toggle<T>(lista: T[], valor: T): T[] {
  return lista.includes(valor) ? lista.filter((v) => v !== valor) : [...lista, valor];
}

export function FilterFields({ filtros, onChange, temaTime = false, times }: FilterFieldsProps) {
  const accentBorder = temaTime ? "peer-checked:border-team-primary" : "peer-checked:border-flood";
  const accentBg = temaTime ? "peer-checked:bg-team-primary" : "peer-checked:bg-flood";
  const accentText = temaTime ? "peer-checked:text-team-on-primary" : "peer-checked:text-ink";

  return (
    <div className="flex flex-col gap-8">
      <fieldset>
        <legend className="font-mono text-caption uppercase tracking-[0.08em] text-chalk-dim mb-3">
          Categoria
        </legend>
        <div className="flex flex-col gap-2">
          {categorias.map((c) => (
            <label key={c.valor} className="flex items-center gap-3 cursor-pointer group/label">
              <input
                type="checkbox"
                className="peer sr-only"
                checked={filtros.categorias.includes(c.valor)}
                onChange={() =>
                  onChange({ ...filtros, categorias: toggle(filtros.categorias, c.valor) })
                }
              />
              <span
                className={cn(
                  "h-4 w-4 shrink-0 rounded-sm border border-chalk/30 transition-colors duration-snap",
                  accentBorder,
                  accentBg
                )}
              />
              <span className="text-body-sm text-chalk-dim group-hover/label:text-chalk transition-colors duration-snap">
                {c.label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="font-mono text-caption uppercase tracking-[0.08em] text-chalk-dim mb-3">
          Tamanho
        </legend>
        <div className="flex flex-wrap gap-2">
          {tamanhosBase.map((t) => {
            const ativo = filtros.tamanhos.includes(t);
            return (
              <button
                key={t}
                type="button"
                onClick={() => onChange({ ...filtros, tamanhos: toggle(filtros.tamanhos, t) })}
                className={cn(
                  "h-10 min-w-[2.75rem] px-2 rounded border font-mono text-body-sm transition-colors duration-snap ease-sprint",
                  ativo
                    ? temaTime
                      ? "border-team-primary bg-team-primary text-team-on-primary"
                      : "border-flood bg-flood text-ink"
                    : "border-border text-chalk-dim hover:border-chalk/40 hover:text-chalk"
                )}
              >
                {t}
              </button>
            );
          })}
        </div>
      </fieldset>

      {times && times.length > 0 && (
        <fieldset>
          <legend className="font-mono text-caption uppercase tracking-[0.08em] text-chalk-dim mb-3">
            Time
          </legend>
          <div className="flex flex-col gap-2 max-h-56 overflow-y-auto pr-1">
            {times.map((t) => (
              <label key={t.id} className="flex items-center gap-3 cursor-pointer group/label">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={filtros.timeSlugs.includes(t.slug)}
                  onChange={() =>
                    onChange({ ...filtros, timeSlugs: toggle(filtros.timeSlugs, t.slug) })
                  }
                />
                <span
                  className="h-4 w-4 shrink-0 rounded-sm border border-chalk/30 transition-colors duration-snap peer-checked:border-flood peer-checked:bg-flood"
                />
                <span className="text-body-sm text-chalk-dim group-hover/label:text-chalk transition-colors duration-snap">
                  {t.apelido}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <fieldset className="flex flex-col gap-3">
        <legend className="font-mono text-caption uppercase tracking-[0.08em] text-chalk-dim mb-1">
          Disponibilidade
        </legend>
        <label className="flex items-center gap-3 cursor-pointer group/label">
          <input
            type="checkbox"
            className="peer sr-only"
            checked={filtros.apenasPromocao}
            onChange={() => onChange({ ...filtros, apenasPromocao: !filtros.apenasPromocao })}
          />
          <span className="h-4 w-4 shrink-0 rounded-sm border border-chalk/30 transition-colors duration-snap peer-checked:border-flood peer-checked:bg-flood" />
          <span className="text-body-sm text-chalk-dim group-hover/label:text-chalk transition-colors duration-snap">
            Somente com desconto
          </span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer group/label">
          <input
            type="checkbox"
            className="peer sr-only"
            checked={filtros.apenasEstoqueBaixo}
            onChange={() =>
              onChange({ ...filtros, apenasEstoqueBaixo: !filtros.apenasEstoqueBaixo })
            }
          />
          <span className="h-4 w-4 shrink-0 rounded-sm border border-chalk/30 transition-colors duration-snap peer-checked:border-flood peer-checked:bg-flood" />
          <span className="text-body-sm text-chalk-dim group-hover/label:text-chalk transition-colors duration-snap">
            Últimas unidades
          </span>
        </label>
      </fieldset>
    </div>
  );
}
