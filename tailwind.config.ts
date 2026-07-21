import type { Config } from "tailwindcss";

/**
 * DESIGN SYSTEM — "TÚNEL DE ACESSO" (Arena Noturna)
 * Todos os valores de cor vivem como CSS variables em app/globals.css.
 * Isso é proposital: na ETAPA 2, as variáveis --team-* serão sobrescritas
 * dinamicamente por time (via atributo data-team no <html> ou inline style
 * no layout da página do time), permitindo re-tematização instantânea
 * sem recompilar o Tailwind.
 */
const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./mock/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.25rem",
        sm: "1.5rem",
        lg: "2.5rem",
        xl: "3rem",
      },
    },
    screens: {
      xs: "400px",
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        // Base neutra — "concreto do túnel"
        ink: {
          DEFAULT: "var(--ink)",
          soft: "var(--ink-soft)",
        },
        surface: {
          DEFAULT: "var(--surface)",
          raised: "var(--surface-raised)",
          overlay: "var(--surface-overlay)",
        },
        chalk: {
          DEFAULT: "var(--chalk)",
          dim: "var(--chalk-dim)",
        },
        // Accent de assinatura — "reflexo do refletor"
        flood: {
          DEFAULT: "var(--flood)",
          soft: "var(--flood-soft)",
        },
        // Estados semânticos (uso disciplinado, nunca decorativo)
        success: "var(--success)",
        danger: "var(--danger)",
        // Tema dinâmico por time (ativado na Etapa 2)
        team: {
          primary: "var(--team-primary)",
          secondary: "var(--team-secondary)",
          tertiary: "var(--team-tertiary)",
          "on-primary": "var(--team-on-primary)",
          "on-secondary": "var(--team-on-secondary)",
          "on-tertiary": "var(--team-on-tertiary)",
        },
        border: "var(--border)",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        // Escala editorial/estádio — passos grandes e deliberados no topo
        "display-2xl": ["clamp(3.5rem, 9vw, 8.5rem)", { lineHeight: "0.88", letterSpacing: "-0.01em" }],
        "display-xl": ["clamp(2.75rem, 6.5vw, 5.5rem)", { lineHeight: "0.9", letterSpacing: "-0.01em" }],
        "display-lg": ["clamp(2.25rem, 4.5vw, 3.75rem)", { lineHeight: "0.94", letterSpacing: "-0.005em" }],
        "display-md": ["clamp(1.75rem, 3vw, 2.5rem)", { lineHeight: "0.98" }],
        "display-sm": ["1.5rem", { lineHeight: "1.05" }],
        eyebrow: ["0.8125rem", { lineHeight: "1", letterSpacing: "0.18em" }],
        body: ["1rem", { lineHeight: "1.6" }],
        "body-sm": ["0.875rem", { lineHeight: "1.55" }],
        caption: ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.02em" }],
        data: ["0.875rem", { lineHeight: "1.3", letterSpacing: "0.01em" }],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
      },
      borderRadius: {
        none: "0px",
        sm: "2px",
        DEFAULT: "4px",
        md: "6px",
        lg: "10px",
        pill: "999px",
      },
      boxShadow: {
        flood: "0 0 0 1px var(--border), 0 8px 30px -10px rgba(255, 199, 44, 0.35)",
        rise: "0 1px 0 rgba(255,255,255,0.04) inset, 0 12px 40px -18px rgba(0,0,0,0.6)",
        hairline: "0 0 0 1px var(--border)",
      },
      transitionTimingFunction: {
        sprint: "cubic-bezier(0.16, 1, 0.3, 1)",
        surge: "cubic-bezier(0.22, 0.61, 0.36, 1)",
      },
      transitionDuration: {
        snap: "150ms",
        quick: "220ms",
        cinema: "700ms",
      },
      keyframes: {
        "flood-on": {
          "0%": { opacity: "0", filter: "brightness(0.4)" },
          "60%": { opacity: "1", filter: "brightness(1.15)" },
          "100%": { opacity: "1", filter: "brightness(1)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "flood-on": "flood-on 700ms cubic-bezier(0.16,1,0.3,1) both",
        shimmer: "shimmer 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
