import { times } from "./times";
import produtosSalvosRaw from "@/src/data/produtos.json";

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
  corFrente: string;
  corCostas: string;
  unidadesRestantes: number | null;
  imagemFrente?: string;
  imagemCostas?: string;
}

// Lista principal de produtos cadastrados
export const produtos: Produto[] = produtosSalvosRaw as Produto[];

export function getProdutosPorTime(timeSlug: string): Produto[] {
  return produtos.filter((p) => p.timeSlug === timeSlug);
}

export function getProdutoPorSlug(slug: string): Produto | undefined {
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

/** Regra de estoque por tamanho */
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
