"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export function BrandStory() {
  return (
    <Section spacing="xl" className="border-b border-border relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 50% 60% at 10% 100%, rgba(255,199,44,0.08), transparent 60%)",
        }}
      />
      <Container className="relative">
        <div className="grid grid-cols-12 gap-y-10">
          <motion.p
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-12 md:col-span-3 font-mono text-eyebrow uppercase text-flood"
          >
            Manifesto
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-12 md:col-span-9 md:col-start-4 font-display font-black uppercase text-display-xl text-chalk leading-[0.92]"
          >
            Existe um segundo antes
            <br />
            <span className="text-flood">do túnel virar campo.</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-12 md:col-span-5 md:col-start-4 mt-10 md:mt-16"
          >
            <p className="text-body text-chalk-dim">
              É nesse segundo que a FUTREP vive. O concreto ainda ecoa passos, mas o refletor já
              queima lá fora. Cada camisa que sai daqui carrega esse instante — a torcida ainda de
              pé, o hino ainda no ar, a cor do escudo prestes a tomar o gramado inteiro.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="col-span-12 md:col-span-4 md:col-start-9 mt-6 md:mt-16 flex flex-col gap-6 md:pl-8 md:border-l border-border"
          >
            <div>
              <p className="font-display font-bold text-display-sm text-chalk mb-1">Tecido de jogo</p>
              <p className="text-body-sm text-chalk-dim">
                Mesma performance usada em campo, sem meio-termo com o replica de arquibancada.
              </p>
            </div>
            <div>
              <p className="font-display font-bold text-display-sm text-chalk mb-1">Escudo bordado</p>
              <p className="text-body-sm text-chalk-dim">
                Nunca estampado — cada emblema é costurado fio a fio, como manda a tradição.
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
