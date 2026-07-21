"use client";

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
  return (
    <AnimatePresence>
      {aberto && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-0 right-0 top-full border-b border-border bg-ink-soft/98 backdrop-blur-md shadow-rise"
        >
          <div className="container mx-auto max-w-[1440px] px-5 sm:px-6 lg:px-10 py-10">
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-12 md:col-span-3">
                <p className="font-mono text-eyebrow uppercase text-flood mb-2">
                  {titulo}
                </p>
                <p className="text-body-sm text-chalk-dim max-w-[220px]">
                  {descricao}
                </p>
              </div>
              <div className="col-span-12 md:col-span-9 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {itens.map((time) => (
                  <Link
                    key={time.id}
                    href={hrefTime(time)}
                    className="group flex items-center gap-3 rounded p-3 border border-transparent hover:border-border hover:bg-surface transition-colors duration-snap ease-sprint"
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
                    <span className="flex flex-col">
                      <span className="text-body-sm text-chalk group-hover:text-flood transition-colors duration-snap">
                        {time.apelido}
                      </span>
                      <span className="flex gap-1 mt-1">
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
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
