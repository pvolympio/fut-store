export type TipoTime = "clube" | "selecao";

export interface Time {
  id: string;
  slug: string;
  nome: string;
  apelido: string;
  tipo: TipoTime;
  pais: string;
  cores: {
    primaria: string;
    secundaria: string;
    terciaria: string;
  };
  /** Caminho opcional da imagem de escudo oficial (ex: /escudos/brasil-flamengo.svg). */
  escudoUrl?: string;
  /** Placeholder de escudo — SVG inline simples (monograma), usado quando não houver imagem. */
  escudo: string;
}

/** Gera um SVG placeholder de escudo com as iniciais e cores do time. */
function gerarEscudoPlaceholder(iniciais: string, primaria: string, secundaria: string) {
  return `<svg viewBox="0 0 64 72" xmlns="http://www.w3.org/2000/svg">
    <path d="M32 0L62 10V34C62 54 48 66 32 72C16 66 2 54 2 34V10L32 0Z" fill="${primaria}"/>
    <path d="M32 6L56 14V34C56 50 44 60 32 65C20 60 8 50 8 34V14L32 6Z" fill="${secundaria}" opacity="0.15"/>
    <text x="32" y="42" font-family="sans-serif" font-weight="800" font-size="20" fill="${secundaria}" text-anchor="middle">${iniciais}</text>
  </svg>`;
}

const baseTimes = [
  // ---------- CLUBES ----------
  // BRASIL
  {
    id: "brasil-flamengo",
    slug: "brasil-flamengo",
    nome: "Clube de Regatas do Flamengo",
    apelido: "Flamengo",
    tipo: "clube",
    pais: "Brasil",
    cores: { primaria: "#E31E24", secundaria: "#000000", terciaria: "#FFFFFF" },
    escudo: () => gerarEscudoPlaceholder("FLA", "#E31E24", "#000000"),
  },
  {
    id: "brasil-corinthians",
    slug: "brasil-corinthians",
    nome: "Sport Club Corinthians Paulista",
    apelido: "Corinthians",
    tipo: "clube",
    pais: "Brasil",
    cores: { primaria: "#FFFFFF", secundaria: "#000000", terciaria: "#C0C0C0" },
    escudo: () => gerarEscudoPlaceholder("COR", "#FFFFFF", "#000000"),
  },
  {
    id: "brasil-sao-paulo",
    slug: "brasil-sao-paulo",
    nome: "São Paulo Futebol Clube",
    apelido: "São Paulo",
    tipo: "clube",
    pais: "Brasil",
    cores: { primaria: "#FFFFFF", secundaria: "#E31E24", terciaria: "#000000" },
    escudo: () => gerarEscudoPlaceholder("SAO", "#FFFFFF", "#E31E24"),
  },
  {
    id: "brasil-palmeiras",
    slug: "brasil-palmeiras",
    nome: "Sociedade Esportiva Palmeiras",
    apelido: "Palmeiras",
    tipo: "clube",
    pais: "Brasil",
    cores: { primaria: "#006437", secundaria: "#FFFFFF", terciaria: "#8B0000" },
    escudo: () => gerarEscudoPlaceholder("PAL", "#006437", "#FFFFFF"),
  },
  {
    id: "brasil-vasco-da-gama",
    slug: "brasil-vasco-da-gama",
    nome: "Club de Regatas Vasco da Gama",
    apelido: "Vasco",
    tipo: "clube",
    pais: "Brasil",
    cores: { primaria: "#000000", secundaria: "#FFFFFF", terciaria: "#E31E24" },
    escudo: () => gerarEscudoPlaceholder("VAS", "#000000", "#FFFFFF"),
  },
  {
    id: "brasil-gremio",
    slug: "brasil-gremio",
    nome: "Grêmio Foot-Ball Porto Alegrense",
    apelido: "Grêmio",
    tipo: "clube",
    pais: "Brasil",
    cores: { primaria: "#0D80BF", secundaria: "#000000", terciaria: "#FFFFFF" },
    escudo: () => gerarEscudoPlaceholder("GRE", "#0D80BF", "#000000"),
  },
  {
    id: "brasil-cruzeiro",
    slug: "brasil-cruzeiro",
    nome: "Cruzeiro Esporte Clube",
    apelido: "Cruzeiro",
    tipo: "clube",
    pais: "Brasil",
    cores: { primaria: "#0033A0", secundaria: "#FFFFFF", terciaria: "#002060" },
    escudo: () => gerarEscudoPlaceholder("CRU", "#0033A0", "#FFFFFF"),
  },
  {
    id: "brasil-santos",
    slug: "brasil-santos",
    nome: "Santos Futebol Clube",
    apelido: "Santos",
    tipo: "clube",
    pais: "Brasil",
    cores: { primaria: "#FFFFFF", secundaria: "#000000", terciaria: "#C0C0C0" },
    escudo: () => gerarEscudoPlaceholder("SAN", "#FFFFFF", "#000000"),
  },
  {
    id: "brasil-atletico-mineiro",
    slug: "brasil-atletico-mineiro",
    nome: "Clube Atlético Mineiro",
    apelido: "Galo",
    tipo: "clube",
    pais: "Brasil",
    cores: { primaria: "#000000", secundaria: "#FFFFFF", terciaria: "#808080" },
    escudo: () => gerarEscudoPlaceholder("CAM", "#000000", "#FFFFFF"),
  },
  {
    id: "brasil-internacional",
    slug: "brasil-internacional",
    nome: "Sport Club Internacional",
    apelido: "Inter",
    tipo: "clube",
    pais: "Brasil",
    cores: { primaria: "#E31E24", secundaria: "#FFFFFF", terciaria: "#B30000" },
    escudo: () => gerarEscudoPlaceholder("INT", "#E31E24", "#FFFFFF"),
  },

  // INGLATERRA
  {
    id: "inglaterra-manchester-united",
    slug: "inglaterra-manchester-united",
    nome: "Manchester United Football Club",
    apelido: "Manchester United",
    tipo: "clube",
    pais: "Inglaterra",
    cores: { primaria: "#DA020E", secundaria: "#FFFFFF", terciaria: "#000000" },
    escudo: () => gerarEscudoPlaceholder("MUN", "#DA020E", "#FFFFFF"),
  },
  {
    id: "inglaterra-liverpool",
    slug: "inglaterra-liverpool",
    nome: "Liverpool Football Club",
    apelido: "Liverpool",
    tipo: "clube",
    pais: "Inglaterra",
    cores: { primaria: "#C8102E", secundaria: "#FFFFFF", terciaria: "#00B2A9" },
    escudo: () => gerarEscudoPlaceholder("LIV", "#C8102E", "#FFFFFF"),
  },
  {
    id: "inglaterra-arsenal",
    slug: "inglaterra-arsenal",
    nome: "Arsenal Football Club",
    apelido: "Arsenal",
    tipo: "clube",
    pais: "Inglaterra",
    cores: { primaria: "#EF0107", secundaria: "#FFFFFF", terciaria: "#063672" },
    escudo: () => gerarEscudoPlaceholder("ARS", "#EF0107", "#FFFFFF"),
  },
  {
    id: "inglaterra-chelsea",
    slug: "inglaterra-chelsea",
    nome: "Chelsea Football Club",
    apelido: "Chelsea",
    tipo: "clube",
    pais: "Inglaterra",
    cores: { primaria: "#034694", secundaria: "#FFFFFF", terciaria: "#DBA111" },
    escudo: () => gerarEscudoPlaceholder("CHE", "#034694", "#FFFFFF"),
  },
  {
    id: "inglaterra-manchester-city",
    slug: "inglaterra-manchester-city",
    nome: "Manchester City Football Club",
    apelido: "Manchester City",
    tipo: "clube",
    pais: "Inglaterra",
    cores: { primaria: "#6CABDD", secundaria: "#FFFFFF", terciaria: "#1C2C5B" },
    escudo: () => gerarEscudoPlaceholder("MCI", "#6CABDD", "#FFFFFF"),
  },
  {
    id: "inglaterra-tottenham-hotspur",
    slug: "inglaterra-tottenham-hotspur",
    nome: "Tottenham Hotspur Football Club",
    apelido: "Tottenham",
    tipo: "clube",
    pais: "Inglaterra",
    cores: { primaria: "#FFFFFF", secundaria: "#131F53", terciaria: "#A7A5A6" },
    escudo: () => gerarEscudoPlaceholder("TOT", "#FFFFFF", "#131F53"),
  },
  {
    id: "inglaterra-newcastle-united",
    slug: "inglaterra-newcastle-united",
    nome: "Newcastle United Football Club",
    apelido: "Newcastle",
    tipo: "clube",
    pais: "Inglaterra",
    cores: { primaria: "#241F20", secundaria: "#FFFFFF", terciaria: "#F1BE48" },
    escudo: () => gerarEscudoPlaceholder("NEW", "#241F20", "#FFFFFF"),
  },
  {
    id: "inglaterra-aston-villa",
    slug: "inglaterra-aston-villa",
    nome: "Aston Villa Football Club",
    apelido: "Aston Villa",
    tipo: "clube",
    pais: "Inglaterra",
    cores: { primaria: "#670E36", secundaria: "#95BFE6", terciaria: "#FEE12B" },
    escudo: () => gerarEscudoPlaceholder("AVL", "#670E36", "#95BFE6"),
  },
  {
    id: "inglaterra-everton",
    slug: "inglaterra-everton",
    nome: "Everton Football Club",
    apelido: "Everton",
    tipo: "clube",
    pais: "Inglaterra",
    cores: { primaria: "#003399", secundaria: "#FFFFFF", terciaria: "#002060" },
    escudo: () => gerarEscudoPlaceholder("EVE", "#003399", "#FFFFFF"),
  },
  {
    id: "inglaterra-west-ham-united",
    slug: "inglaterra-west-ham-united",
    nome: "West Ham United Football Club",
    apelido: "West Ham",
    tipo: "clube",
    pais: "Inglaterra",
    cores: { primaria: "#7A263A", secundaria: "#1BB1E7", terciaria: "#F3AF00" },
    escudo: () => gerarEscudoPlaceholder("WHU", "#7A263A", "#1BB1E7"),
  },

  // ESPANHA
  {
    id: "espanha-real-madrid",
    slug: "espanha-real-madrid",
    nome: "Real Madrid Club de Fútbol",
    apelido: "Real Madrid",
    tipo: "clube",
    pais: "Espanha",
    cores: { primaria: "#FFFFFF", secundaria: "#FEBE10", terciaria: "#00529F" },
    escudo: () => gerarEscudoPlaceholder("RMA", "#FFFFFF", "#FEBE10"),
  },
  {
    id: "espanha-fc-barcelona",
    slug: "espanha-fc-barcelona",
    nome: "Futbol Club Barcelona",
    apelido: "Barcelona",
    tipo: "clube",
    pais: "Espanha",
    cores: { primaria: "#004D98", secundaria: "#A50044", terciaria: "#EDBB00" },
    escudo: () => gerarEscudoPlaceholder("BAR", "#004D98", "#A50044"),
  },
  {
    id: "espanha-atletico-de-madrid",
    slug: "espanha-atletico-de-madrid",
    nome: "Club Atlético de Madrid",
    apelido: "Atlético de Madrid",
    tipo: "clube",
    pais: "Espanha",
    cores: { primaria: "#CB3524", secundaria: "#FFFFFF", terciaria: "#272E61" },
    escudo: () => gerarEscudoPlaceholder("ATM", "#CB3524", "#FFFFFF"),
  },
  {
    id: "espanha-athletic-club",
    slug: "espanha-athletic-club",
    nome: "Athletic Club",
    apelido: "Athletic Bilbao",
    tipo: "clube",
    pais: "Espanha",
    cores: { primaria: "#EE2523", secundaria: "#FFFFFF", terciaria: "#000000" },
    escudo: () => gerarEscudoPlaceholder("ATH", "#EE2523", "#FFFFFF"),
  },
  {
    id: "espanha-valencia-cf",
    slug: "espanha-valencia-cf",
    nome: "Valencia Club de Fútbol",
    apelido: "Valencia",
    tipo: "clube",
    pais: "Espanha",
    cores: { primaria: "#FFFFFF", secundaria: "#000000", terciaria: "#FF7E00" },
    escudo: () => gerarEscudoPlaceholder("VAL", "#FFFFFF", "#000000"),
  },
  {
    id: "espanha-sevilla-fc",
    slug: "espanha-sevilla-fc",
    nome: "Sevilla Fútbol Club",
    apelido: "Sevilla",
    tipo: "clube",
    pais: "Espanha",
    cores: { primaria: "#FFFFFF", secundaria: "#D4002D", terciaria: "#000000" },
    escudo: () => gerarEscudoPlaceholder("SEV", "#FFFFFF", "#D4002D"),
  },
  {
    id: "espanha-real-betis",
    slug: "espanha-real-betis",
    nome: "Real Betis Balompié",
    apelido: "Real Betis",
    tipo: "clube",
    pais: "Espanha",
    cores: { primaria: "#00AB63", secundaria: "#FFFFFF", terciaria: "#000000" },
    escudo: () => gerarEscudoPlaceholder("BET", "#00AB63", "#FFFFFF"),
  },
  {
    id: "espanha-real-sociedad",
    slug: "espanha-real-sociedad",
    nome: "Real Sociedad de Fútbol",
    apelido: "Real Sociedad",
    tipo: "clube",
    pais: "Espanha",
    cores: { primaria: "#0067B1", secundaria: "#FFFFFF", terciaria: "#003B6D" },
    escudo: () => gerarEscudoPlaceholder("RSO", "#0067B1", "#FFFFFF"),
  },
  {
    id: "espanha-villarreal-cf",
    slug: "espanha-villarreal-cf",
    nome: "Villarreal Club de Fútbol",
    apelido: "Villarreal",
    tipo: "clube",
    pais: "Espanha",
    cores: { primaria: "#FFE600", secundaria: "#00519E", terciaria: "#FFFFFF" },
    escudo: () => gerarEscudoPlaceholder("VIL", "#FFE600", "#00519E"),
  },
  {
    id: "espanha-rcd-espanyol",
    slug: "espanha-rcd-espanyol",
    nome: "Reial Club Deportiu Espanyol de Barcelona",
    apelido: "Espanyol",
    tipo: "clube",
    pais: "Espanha",
    cores: { primaria: "#0072CE", secundaria: "#FFFFFF", terciaria: "#D0103A" },
    escudo: () => gerarEscudoPlaceholder("ESP", "#0072CE", "#FFFFFF"),
  },

  // ALEMANHA
  {
    id: "alemanha-bayern-munchen",
    slug: "alemanha-bayern-munchen",
    nome: "Fußball-Club Bayern München e. V.",
    apelido: "Bayern de Munique",
    tipo: "clube",
    pais: "Alemanha",
    cores: { primaria: "#DC052D", secundaria: "#FFFFFF", terciaria: "#0066B2" },
    escudo: () => gerarEscudoPlaceholder("BAY", "#DC052D", "#FFFFFF"),
  },
  {
    id: "alemanha-borussia-dortmund",
    slug: "alemanha-borussia-dortmund",
    nome: "Ballspielverein Borussia 09 e. V. Dortmund",
    apelido: "Borussia Dortmund",
    tipo: "clube",
    pais: "Alemanha",
    cores: { primaria: "#FDE100", secundaria: "#000000", terciaria: "#FFFFFF" },
    escudo: () => gerarEscudoPlaceholder("BVB", "#FDE100", "#000000"),
  },
  {
    id: "alemanha-schalke-04",
    slug: "alemanha-schalke-04",
    nome: "Fußballclub Gelsenkirchen-Schalke 04 e. V.",
    apelido: "Schalke 04",
    tipo: "clube",
    pais: "Alemanha",
    cores: { primaria: "#004D9D", secundaria: "#FFFFFF", terciaria: "#002B5B" },
    escudo: () => gerarEscudoPlaceholder("S04", "#004D9D", "#FFFFFF"),
  },
  {
    id: "alemanha-hamburger-sv",
    slug: "alemanha-hamburger-sv",
    nome: "Hamburger Sport-Verein e. V.",
    apelido: "Hamburg",
    tipo: "clube",
    pais: "Alemanha",
    cores: { primaria: "#005CA9", secundaria: "#FFFFFF", terciaria: "#ED1C24" },
    escudo: () => gerarEscudoPlaceholder("HSV", "#005CA9", "#FFFFFF"),
  },
  {
    id: "alemanha-vfb-stuttgart",
    slug: "alemanha-vfb-stuttgart",
    nome: "Verein für Bewegungsspiele Stuttgart 1893 e. V.",
    apelido: "Stuttgart",
    tipo: "clube",
    pais: "Alemanha",
    cores: { primaria: "#FFFFFF", secundaria: "#E32219", terciaria: "#000000" },
    escudo: () => gerarEscudoPlaceholder("VFB", "#FFFFFF", "#E32219"),
  },
  {
    id: "alemanha-borussia-monchengladbach",
    slug: "alemanha-borussia-monchengladbach",
    nome: "Borussia VfL 1900 e. V. Mönchengladbach",
    apelido: "Gladbach",
    tipo: "clube",
    pais: "Alemanha",
    cores: { primaria: "#FFFFFF", secundaria: "#000000", terciaria: "#009933" },
    escudo: () => gerarEscudoPlaceholder("BMG", "#FFFFFF", "#000000"),
  },
  {
    id: "alemanha-eintracht-frankfurt",
    slug: "alemanha-eintracht-frankfurt",
    nome: "Eintracht Frankfurt e. V.",
    apelido: "Eintracht Frankfurt",
    tipo: "clube",
    pais: "Alemanha",
    cores: { primaria: "#E1000F", secundaria: "#000000", terciaria: "#FFFFFF" },
    escudo: () => gerarEscudoPlaceholder("SGE", "#E1000F", "#000000"),
  },
  {
    id: "alemanha-werder-bremen",
    slug: "alemanha-werder-bremen",
    nome: "Sportverein Werder Bremen von 1899 e. V.",
    apelido: "Werder Bremen",
    tipo: "clube",
    pais: "Alemanha",
    cores: { primaria: "#138C44", secundaria: "#FFFFFF", terciaria: "#005628" },
    escudo: () => gerarEscudoPlaceholder("SVW", "#138C44", "#FFFFFF"),
  },
  {
    id: "alemanha-bayer-leverkusen",
    slug: "alemanha-bayer-leverkusen",
    nome: "Bayer 04 Leverkusen Fußball GmbH",
    apelido: "Bayer Leverkusen",
    tipo: "clube",
    pais: "Alemanha",
    cores: { primaria: "#E32219", secundaria: "#000000", terciaria: "#F39200" },
    escudo: () => gerarEscudoPlaceholder("B04", "#E32219", "#000000"),
  },
  {
    id: "alemanha-1-fc-koln",
    slug: "alemanha-1-fc-koln",
    nome: "1. Fußball-Club Köln 01/07 e. V.",
    apelido: "Colônia",
    tipo: "clube",
    pais: "Alemanha",
    cores: { primaria: "#ED1C24", secundaria: "#FFFFFF", terciaria: "#000000" },
    escudo: () => gerarEscudoPlaceholder("KOE", "#ED1C24", "#FFFFFF"),
  },

  // ---------- SELEÇÕES ----------
  {
    id: "selecao-01",
    slug: "brasil",
    nome: "Seleção Brasileira",
    apelido: "Brasil",
    tipo: "selecao",
    pais: "Brasil",
    cores: { primaria: "#FFDF00", secundaria: "#009C3B", terciaria: "#002776" },
    escudoUrl: "/escudos/brasil.svg",
    escudo: () => gerarEscudoPlaceholder("BR", "#FFDF00", "#009C3B"),
  },
  {
    id: "selecao-02",
    slug: "argentina",
    nome: "Seleção Argentina",
    apelido: "Argentina",
    tipo: "selecao",
    pais: "Argentina",
    cores: { primaria: "#75AADB", secundaria: "#FFFFFF", terciaria: "#FCBF49" },
    escudoUrl: "/escudos/argentina.svg",
    escudo: () => gerarEscudoPlaceholder("AR", "#75AADB", "#FFFFFF"),
  },
  {
    id: "selecao-03",
    slug: "franca",
    nome: "Seleção Francesa",
    apelido: "França",
    tipo: "selecao",
    pais: "França",
    cores: { primaria: "#0055A4", secundaria: "#FFFFFF", terciaria: "#EF4135" },
    escudoUrl: "/escudos/franca.svg",
    escudo: () => gerarEscudoPlaceholder("FR", "#0055A4", "#FFFFFF"),
  },
  {
    id: "selecao-04",
    slug: "alemanha",
    nome: "Seleção Alemã",
    apelido: "Alemanha",
    tipo: "selecao",
    pais: "Alemanha",
    cores: { primaria: "#0A0B0D", secundaria: "#FFFFFF", terciaria: "#DD0000" },
    escudoUrl: "/escudos/alemanha.svg",
    escudo: () => gerarEscudoPlaceholder("DE", "#0A0B0D", "#FFFFFF"),
  },
  {
    id: "selecao-05",
    slug: "portugal",
    nome: "Seleção Portuguesa",
    apelido: "Portugal",
    tipo: "selecao",
    pais: "Portugal",
    cores: { primaria: "#C8102E", secundaria: "#006600", terciaria: "#F5F5F0" },
    escudoUrl: "/escudos/portugal.svg",
    escudo: () => gerarEscudoPlaceholder("PT", "#C8102E", "#006600"),
  },
  {
    id: "selecao-06",
    slug: "inglaterra",
    nome: "Seleção Inglesa",
    apelido: "Inglaterra",
    tipo: "selecao",
    pais: "Inglaterra",
    cores: { primaria: "#FFFFFF", secundaria: "#CE1124", terciaria: "#0A0B0D" },
    escudoUrl: "/escudos/inglaterra.svg",
    escudo: () => gerarEscudoPlaceholder("EN", "#FFFFFF", "#CE1124"),
  },
  {
    id: "selecao-07",
    slug: "espanha",
    nome: "Seleção Espanhola",
    apelido: "Espanha",
    tipo: "selecao",
    pais: "Espanha",
    cores: { primaria: "#AA1529", secundaria: "#F1BF00", terciaria: "#000000" },
    escudoUrl: "/escudos/espanha.svg",
    escudo: () => gerarEscudoPlaceholder("ES", "#AA1529", "#F1BF00"),
  },
];

export const times: Time[] = baseTimes.map((t) => {
  const escudoSvg = typeof (t as any).escudo === "function" ? (t as any).escudo() : t.escudo;
  return {
    ...t,
    escudo: escudoSvg,
    escudoUrl: t.escudoUrl ?? `/escudos/${t.slug}.svg`,
  };
});

export function getEscudoSvg(time: Time): string {
  return typeof (time as any).escudo === "function" ? (time as any).escudo() : time.escudo;
}

export function getTimePorSlug(slug: string) {
  return times.find((t) => t.slug === slug);
}

/**
 * Versão "resumida" e serializável do time — sem a função `escudo`.
 * Necessária sempre que um Server Component precisa passar a lista de times
 * como prop para um Client Component (ex.: filtro por time no catálogo),
 * já que funções não podem atravessar a fronteira server → client.
 */
export interface TimeResumo {
  id: string;
  slug: string;
  nome: string;
  apelido: string;
  tipo: TipoTime;
}

export function paraResumo(time: Time): TimeResumo {
  const { id, slug, nome, apelido, tipo } = time;
  return { id, slug, nome, apelido, tipo };
}

export const timesResumo: TimeResumo[] = times.map(paraResumo);
