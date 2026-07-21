import { times } from "./times";

export type CategoriaProduto = "titular" | "visitante" | "terceira" | "retro" | "goleiro";
export type StatusProduto = "novo" | "limitada" | "retro" | "esgotando" | null;

export interface Produto {
  id: string;
  slug: string;
  nome: string;
  timeId: string;
  timeSlug: string;
  timeTipo: "clube" | "selecao";
  categoria: CategoriaProduto;
  temporada: string;
  precoCentavos: number;
  precoOriginalCentavos: number | null;
  status: StatusProduto;
  tamanhosDisponiveis: string[];
  estoqueBaixo: boolean;
  /** Cores do time para simular frente/costas via gradiente ou accent */
  corFrente: string;
  corCostas: string;
  unidadesRestantes: number | null;
  /** Caminhos de fotos reais da camisa (ex: /camisas/brasil-flamengo-titular-1.webp). */
  imagemFrente?: string;
  imagemCostas?: string;
}

const modelos: {
  categoria: CategoriaProduto;
  sufixo: string;
  status: StatusProduto;
  desconto?: boolean;
  temporada?: string;
}[] = [
  { categoria: "titular", sufixo: "Camisa Titular 26/27", status: "novo" },
  { categoria: "titular", sufixo: "Camisa Titular Infantil 26/27", status: "novo" },
  { categoria: "visitante", sufixo: "Camisa Visitante 26/27", status: null },
  { categoria: "visitante", sufixo: "Camisa Visitante Manga Longa", status: null },
  { categoria: "terceira", sufixo: "Camisa Terceiro Uniforme", status: "limitada" },
  { categoria: "terceira", sufixo: "Camisa Edição Comemorativa", status: "limitada" },
  { categoria: "goleiro", sufixo: "Camisa de Goleiro 26/27", status: null },
  {
    categoria: "retro",
    sufixo: "Camisa Retrô Edição Especial",
    status: "retro",
    desconto: true,
    temporada: "1998",
  },
];

function gerarProdutosDoTime(
  timeId: string,
  timeSlug: string,
  timeTipo: "clube" | "selecao",
  apelido: string,
  corPrimaria: string,
  corSecundaria: string,
  index: number
): Produto[] {
  return modelos.map((modelo, i) => {
    const base = 29900 + i * 3200;
    const esgotando = (index + i) % 5 === 0;
    const unidadesRestantes = esgotando ? ((index + i * 3) % 4) + 2 : null;
    const prodSlug = `${timeSlug}-${modelo.categoria}-${i + 1}`;
    return {
      id: `${timeId}-p${i + 1}`,
      slug: prodSlug,
      nome: `${apelido} — ${modelo.sufixo}`,
      timeId,
      timeSlug,
      timeTipo,
      categoria: modelo.categoria,
      temporada: modelo.temporada ?? "2026/27",
      precoCentavos: base,
      precoOriginalCentavos: modelo.desconto ? base + 6000 : null,
      status: esgotando ? "esgotando" : modelo.status,
      tamanhosDisponiveis: esgotando ? ["P", "GG"] : ["PP", "P", "M", "G", "GG", "XG"],
      estoqueBaixo: esgotando,
      corFrente: corPrimaria,
      corCostas: corSecundaria,
      unidadesRestantes,
      imagemFrente: `/camisas/${prodSlug}.jpg`,
      imagemCostas: `/camisas/${prodSlug}-costas.jpg`,
    };
  });
}

export const produtos: Produto[] = times.flatMap((time, index) =>
  gerarProdutosDoTime(
    time.id,
    time.slug,
    time.tipo,
    time.apelido,
    time.cores.primaria,
    time.cores.secundaria,
    index
  )
);

export function getProdutosPorTime(timeSlug: string) {
  return produtos.filter((p) => p.timeSlug === timeSlug);
}

export function getProdutoPorSlug(slug: string) {
  return produtos.find((p) => p.slug === slug);
}

export const categorias: { valor: CategoriaProduto; label: string }[] = [
  { valor: "titular", label: "Titular" },
  { valor: "visitante", label: "Visitante" },
  { valor: "terceira", label: "Terceiro Uniforme" },
  { valor: "goleiro", label: "Goleiro" },
  { valor: "retro", label: "Retrô" },
];

export const tamanhosBase = ["PP", "P", "M", "G", "GG", "XG"];

/** Regra simples de estoque por tamanho: fora de tamanhosDisponiveis = esgotado.
 *  Quando o produto está com estoque geral baixo, os tamanhos que ainda restam
 *  também são sinalizados como "últimas unidades". */
export function situacaoTamanho(
  produto: Produto,
  tamanho: string
): "disponivel" | "poucas-unidades" | "esgotado" {
  if (!produto.tamanhosDisponiveis.includes(tamanho)) return "esgotado";
  if (produto.estoqueBaixo) return "poucas-unidades";
  return "disponivel";
}

export const PRECO_PERSONALIZACAO_CENTAVOS = 2500;

export function formatarPreco(centavos: number) {
  return (centavos / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
