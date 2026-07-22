"use client";

import { motion } from "framer-motion";

interface StadiumAtmosphereProps {
  corPrimaria?: string;
  corSecundaria?: string;
  intensidade?: "baixa" | "media" | "alta";
  className?: string;
}

export function StadiumAtmosphere({
  corPrimaria,
  corSecundaria,
  intensidade = "alta",
  className = "",
}: StadiumAtmosphereProps) {
  // Se não passar cor explícita, usa as variáveis CSS do tema do time ou o amarelo neon default
  const primary = corPrimaria || "var(--team-primary, #FACC15)";
  const secondary = corSecundaria || "var(--team-secondary, #E31E24)";

  const opacityMultiplier = intensidade === "alta" ? 0.35 : intensidade === "media" ? 0.22 : 0.12;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none z-0 ${className}`}
    >
      {/* 1. Holofote Superior Esquerdo (Top-Left Stadium Spotlight) */}
      <motion.div
        animate={{
          scale: [1, 1.12, 1],
          opacity: [opacityMultiplier, opacityMultiplier * 1.25, opacityMultiplier],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-32 -left-32 w-[550px] h-[550px] rounded-full blur-[110px]"
        style={{
          background: `radial-gradient(circle, ${primary} 0%, transparent 70%)`,
        }}
      />

      {/* 2. Holofote Superior Direito (Top-Right Stadium Spotlight) */}
      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [opacityMultiplier * 0.9, opacityMultiplier * 1.2, opacityMultiplier * 0.9],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute -top-32 -right-32 w-[550px] h-[550px] rounded-full blur-[110px]"
        style={{
          background: `radial-gradient(circle, ${secondary} 0%, transparent 70%)`,
        }}
      />

      {/* 3. Feixe Central de Holofote do Campo (Central Beam Cone) */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[450px] blur-[90px] opacity-25"
        style={{
          background: `conic-gradient(from 180deg at 50% 0%, ${primary} 0deg, ${secondary} 90deg, transparent 180deg, ${primary} 270deg)`,
        }}
      />

      {/* 4. Iluminação de Rodapé / Chão de Estádio (Floor Ambient Glow) */}
      <motion.div
        animate={{
          opacity: [opacityMultiplier * 0.6, opacityMultiplier * 0.9, opacityMultiplier * 0.6],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full blur-[120px]"
        style={{
          background: `radial-gradient(ellipse at 50% 100%, ${primary} 0%, ${secondary} 50%, transparent 80%)`,
        }}
      />

      {/* 5. Partículas / Poeira de Holofote do Estádio (Floating Dust Motes) */}
      <div className="absolute inset-0 opacity-40 mix-blend-overlay">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              x: `${15 + i * 15}%`,
              y: "90%",
              opacity: 0.2,
              scale: 0.8,
            }}
            animate={{
              y: ["90%", "10%"],
              opacity: [0.1, 0.6, 0.1],
              scale: [0.8, 1.4, 0.8],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.5,
            }}
            className="absolute w-2 h-2 rounded-full blur-[1px]"
            style={{
              background: i % 2 === 0 ? primary : secondary,
              boxShadow: `0 0 12px 2px ${i % 2 === 0 ? primary : secondary}`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
