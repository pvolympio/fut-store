export const siteConfig = {
  name: "Arena Futebol Store",
  shortName: "Arena Store",
  description:
    "Experiência demonstrativa de alta performance para catálogo e checkout de camisas de futebol oficiais.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://arena-futebol-store.vercel.app",
  ogImage: "/og-default.jpg",
  author: {
    name: "Desenvolvedor Full Stack",
    role: "Engenharia de Software / Portfólio",
  },
  keywords: [
    "camisas de futebol",
    "mantos oficiais",
    "e-commerce futebol",
    "brasileirao 2026",
    "premier league",
    "la liga",
    "camisas retro",
    "projeto demonstrativo",
    "portfólio next.js",
  ],
  links: {
    github: "https://github.com",
    portfolio: "https://portfolio-demonstrativo.dev",
  },
};

export type SiteConfig = typeof siteConfig;
