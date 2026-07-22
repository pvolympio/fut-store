import { CategoriaProduto, Produto } from "@/mock/produtos";
import { produtoCorrespondeBusca } from "./search";

export type Ordenacao = "relevancia" | "menor-preco" | "maior-preco" | "novidades";

export interface FiltrosState {
  categorias: CategoriaProduto[];
  tamanhos: string[];
  apenasPromocao: boolean;
  apenasEstoqueBaixo: boolean;
  /** Usado só no catálogo geral, para cruzar times. */
  timeSlugs: string[];
}

export const filtrosVazios: FiltrosState = {
  categorias: [],
  tamanhos: [],
  apenasPromocao: false,
  apenasEstoqueBaixo: false,
  timeSlugs: [],
};

export function contarFiltrosAtivos(f: FiltrosState) {
  return (
    f.categorias.length +
    f.tamanhos.length +
    f.timeSlugs.length +
    (f.apenasPromocao ? 1 : 0) +
    (f.apenasEstoqueBaixo ? 1 : 0)
  );
}

export function aplicarFiltros(produtos: Produto[], f: FiltrosState, busca: string): Produto[] {
  return produtos.filter((p) => {
    if (f.categorias.length && !f.categorias.includes(p.categoria)) return false;
    if (f.tamanhos.length && !p.tamanhosDisponiveis.some((t) => f.tamanhos.includes(t))) return false;
    if (f.apenasPromocao && !p.precoOriginalCentavos) return false;
    if (f.apenasEstoqueBaixo && !p.estoqueBaixo) return false;
    if (f.timeSlugs.length && !f.timeSlugs.includes(p.timeSlug)) return false;
    if (busca && !produtoCorrespondeBusca(p, busca)) return false;
    return true;
  });
}

function extrairTimestampId(p: Produto): number {
  const match = p.id.match(/\d+$/);
  if (match) return parseInt(match[0], 10);
  return 0;
}

export function ordenarProdutos(produtos: Produto[], ordenacao: Ordenacao): Produto[] {
  const copia = [...produtos];
  switch (ordenacao) {
    case "menor-preco":
      return copia.sort((a, b) => a.precoCentavos - b.precoCentavos);
    case "maior-preco":
      return copia.sort((a, b) => b.precoCentavos - a.precoCentavos);
    case "novidades":
      return copia.sort((a, b) => {
        // Produtos com status 'novo' primeiro
        const pesoNovoA = a.status === "novo" ? 1 : 0;
        const pesoNovoB = b.status === "novo" ? 1 : 0;
        if (pesoNovoB !== pesoNovoA) return pesoNovoB - pesoNovoA;
        // Depois por timestamp do ID (mais recente primeiro)
        const tsA = extrairTimestampId(a);
        const tsB = extrairTimestampId(b);
        if (tsA !== tsB) return tsB - tsA;
        // Caso os timestamps sejam 0, ordenar por temporada
        return b.temporada.localeCompare(a.temporada);
      });
    default:
      return copia;
  }
}

export const opcoesOrdenacao: { valor: Ordenacao; label: string }[] = [
  { valor: "relevancia", label: "Relevância" },
  { valor: "novidades", label: "Novidades primeiro" },
  { valor: "menor-preco", label: "Menor preço" },
  { valor: "maior-preco", label: "Maior preço" },
];
