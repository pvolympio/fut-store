export interface PersonalizacaoItem {
  nome: string;
  numero: string;
}

/** Uma linha do carrinho: produto + variação (tamanho/personalização) escolhida. */
export interface ItemCarrinho {
  /** Chave estável = produtoId + tamanho + personalização, usada para agrupar duplicatas. */
  chave: string;
  produtoId: string;
  slug: string;
  nome: string;
  timeNome: string;
  timeSlug: string;
  temporada: string;
  precoUnitarioCentavos: number;
  precoPersonalizacaoCentavos: number;
  corFrente: string;
  corCostas: string;
  tamanho: string;
  personalizacao: PersonalizacaoItem | null;
  quantidade: number;
}

export interface Cupom {
  codigo: string;
  descricao: string;
  /** Percentual de 0 a 1 aplicado sobre o subtotal. */
  percentual: number;
}

export const cuponsValidos: Cupom[] = [
  { codigo: "ARENA10", descricao: "10% off no pedido", percentual: 0.1 },
  { codigo: "TUNEL20", descricao: "20% off no pedido", percentual: 0.2 },
];

export function montarChaveItem(
  produtoId: string,
  tamanho: string,
  personalizacao: PersonalizacaoItem | null
) {
  return personalizacao
    ? `${produtoId}__${tamanho}__${personalizacao.nome}-${personalizacao.numero}`
    : `${produtoId}__${tamanho}`;
}
