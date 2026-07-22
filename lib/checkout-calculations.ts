import { Cupom, ItemCarrinho } from "./cart-types";

export type TipoOpcaoFrete = "padrao" | "expresso";
export type MetodoPagamento = "cartao" | "pix" | "boleto";

export interface OpcaoFrete {
  id: TipoOpcaoFrete;
  nome: string;
  prazo: string;
  precoCentavos: number;
}

export const OPCOES_FRETE: Record<TipoOpcaoFrete, OpcaoFrete> = {
  padrao: {
    id: "padrao",
    nome: "Frete Padrão (Econômico)",
    prazo: "4 a 7 dias úteis",
    precoCentavos: 0, // Grátis
  },
  expresso: {
    id: "expresso",
    nome: "Frete Expresso (Sedex)",
    prazo: "1 a 3 dias úteis",
    precoCentavos: 2500, // R$ 25,00
  },
};

export interface InputCalculoCheckout {
  itens: ItemCarrinho[];
  cupom?: Cupom | null;
  opcaoFrete?: TipoOpcaoFrete;
  metodoPagamento?: MetodoPagamento;
}

export interface ResumoCheckout {
  subtotalCentavos: number;
  descontoCupomCentavos: number;
  subtotalComDescontoCentavos: number;
  freteCentavos: number;
  descontoPixCentavos: number;
  totalCentavos: number;
  quantidadeItens: number;
}

/**
 * Função pura e centralizada para todos os cálculos financeiros do checkout e carrinho.
 * Trabalha estritamente com inteiros (centavos) para evitar erros de ponto flutuante.
 */
export function calcularResumoCheckout(input: InputCalculoCheckout): ResumoCheckout {
  const { itens = [], cupom = null, opcaoFrete = "padrao", metodoPagamento = "cartao" } = input;

  const quantidadeItens = itens.reduce((soma, i) => soma + (i.quantidade || 0), 0);

  const subtotalCentavos = itens.reduce(
    (soma, item) =>
      soma +
      ((item.precoUnitarioCentavos || 0) + (item.precoPersonalizacaoCentavos || 0)) *
        (item.quantidade || 0),
    0
  );

  let descontoCupomCentavos = 0;
  if (cupom && cupom.percentual > 0 && subtotalCentavos > 0) {
    descontoCupomCentavos = Math.round(subtotalCentavos * cupom.percentual);
  }

  const subtotalComDescontoCentavos = Math.max(0, subtotalCentavos - descontoCupomCentavos);

  const freteInfo = OPCOES_FRETE[opcaoFrete] || OPCOES_FRETE.padrao;
  const freteCentavos = subtotalCentavos > 0 ? freteInfo.precoCentavos : 0;

  let descontoPixCentavos = 0;
  if (metodoPagamento === "pix" && subtotalComDescontoCentavos > 0) {
    // 5% de desconto no Pix sobre o valor dos produtos já com cupom aplicado
    descontoPixCentavos = Math.round(subtotalComDescontoCentavos * 0.05);
  }

  const totalCalculado = subtotalComDescontoCentavos + freteCentavos - descontoPixCentavos;
  const totalCentavos = Math.max(0, totalCalculado);

  return {
    subtotalCentavos,
    descontoCupomCentavos,
    subtotalComDescontoCentavos,
    freteCentavos,
    descontoPixCentavos,
    totalCentavos,
    quantidadeItens,
  };
}
