"use client";

import { motion } from "framer-motion";

interface CardPreviewProps {
  numero: string;
  nome: string;
  validade: string;
  cvv: string;
  focoCvv: boolean;
}

function agruparNumero(numero: string) {
  const digitos = numero.replace(/\D/g, "");
  const grupos = digitos.padEnd(16, "•").match(/.{1,4}/g) ?? [];
  return grupos.join("  ");
}

export function CardPreview({ numero, nome, validade, cvv, focoCvv }: CardPreviewProps) {
  return (
    <div className="[perspective:1200px] w-full max-w-sm mx-auto lg:mx-0">
      <motion.div
        animate={{ rotateY: focoCvv ? 180 : 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative aspect-[1.586/1] w-full [transform-style:preserve-3d]"
      >
        {/* Frente */}
        <div
          className="absolute inset-0 rounded-lg p-5 flex flex-col justify-between text-chalk shadow-rise [backface-visibility:hidden]"
          style={{
            background:
              "linear-gradient(135deg, var(--surface-overlay) 0%, var(--ink-soft) 55%, var(--ink) 100%)",
            border: "1px solid var(--border)",
          }}
        >
          <div className="flex items-start justify-between">
            <span className="h-8 w-11 rounded-sm bg-gradient-to-br from-flood-soft to-flood opacity-90" aria-hidden />
            <span className="font-display font-black uppercase text-body-sm tracking-tight">
              FUTREP<span className="text-flood">.</span>
            </span>
          </div>

          <div className="font-mono text-lg sm:text-xl tracking-[0.12em]">
            {agruparNumero(numero)}
          </div>

          <div className="flex items-end justify-between">
            <div className="min-w-0">
              <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-chalk-dim">Titular</p>
              <p className="font-mono text-caption uppercase truncate max-w-[10rem]">
                {nome || "NOME NO CARTÃO"}
              </p>
            </div>
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-chalk-dim">Val.</p>
              <p className="font-mono text-caption">{validade || "MM/AA"}</p>
            </div>
          </div>
        </div>

        {/* Verso */}
        <div
          className="absolute inset-0 rounded-lg flex flex-col text-chalk shadow-rise [backface-visibility:hidden] [transform:rotateY(180deg)]"
          style={{
            background:
              "linear-gradient(135deg, var(--surface-overlay) 0%, var(--ink-soft) 55%, var(--ink) 100%)",
            border: "1px solid var(--border)",
          }}
        >
          <div className="h-10 bg-ink mt-5" aria-hidden />
          <div className="flex justify-end px-5 mt-4">
            <div className="bg-chalk/90 text-ink font-mono text-body-sm px-3 py-1.5 rounded-sm tracking-widest">
              {cvv ? cvv.padEnd(3, "•") : "•••"}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
