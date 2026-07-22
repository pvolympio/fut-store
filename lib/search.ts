import { Produto } from "@/mock/produtos";
import { times } from "@/mock/times";

/**
 * Normaliza um texto para buscas insensíveis a maiúsculas, acentos e espaços múltiplos.
 * Exemplo: "Seleção Brasileira" -> "selecao brasileira"
 */
export function normalizarTexto(texto: string): string {
  if (!texto) return "";
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Verifica se um produto corresponde ao termo pesquisado buscando em múltiplos campos:
 * - Nome do produto
 * - Nome do time / seleção
 * - Apelido do time
 * - Temporada
 * - Categoria
 * - País do time
 * - Código ou SKU / ID / Slug
 * - Tags do produto
 */
export function produtoCorrespondeBusca(produto: Produto, busca: string): boolean {
  const termoNorm = normalizarTexto(busca);
  if (!termoNorm) return true;

  const timeRelacionado = times.find((t) => t.slug === produto.timeSlug || t.id === produto.timeId);

  const camposParaBuscar = [
    produto.nome,
    produto.temporada,
    produto.categoria,
    produto.id,
    produto.slug,
    produto.timeSlug,
    timeRelacionado?.nome ?? "",
    timeRelacionado?.apelido ?? "",
    timeRelacionado?.pais ?? "",
    timeRelacionado?.tipo ?? "",
  ];

  const textoConsolidado = normalizarTexto(camposParaBuscar.join(" "));

  // Permite busca por partes dividindo o termo por espaços
  const termosFiltro = termoNorm.split(" ").filter(Boolean);
  return termosFiltro.every((t) => textoConsolidado.includes(t));
}
