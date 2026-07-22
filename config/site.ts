export const siteConfig = {
  name: "FUTREP",
  shortName: "FUTREP",
  description:
    "Experiência inovadora e demonstrativa de e-commerce de camisas de futebol, desenvolvida para portfólio. Nenhum pagamento real é processado.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://arena-futebol-store.vercel.app",
  ogImage: "/og-default.jpg",
  author: {
    name: "Paulo Victor Olympio",
    role: "Engenharia de Software / Portfólio",
  },
  repository: "https://github.com/pvolympio/fut-store",
  keywords: [
    "FUTREP",
    "camisas de futebol",
    "e-commerce futebol",
    "brasileirao 2026",
    "premier league",
    "la liga",
    "camisas retro",
    "projeto demonstrativo",
    "portfólio next.js",
  ],
  links: {
    github: "https://github.com/pvolympio",
  },
};

export type SiteConfig = typeof siteConfig;
