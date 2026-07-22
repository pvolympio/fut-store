import { describe, it, expect } from "vitest";
import { calcularResumoCheckout, OPCOES_FRETE } from "@/lib/checkout-calculations";
import { ItemCarrinho, Cupom } from "@/lib/cart-types";

const mockItem: ItemCarrinho = {
  chave: "item-1",
  produtoId: "prod-1",
  slug: "camisa-flamengo",
  nome: "Flamengo — Titular 2026",
  timeNome: "Flamengo",
  timeSlug: "brasil-flamengo",
  temporada: "2026/27",
  precoUnitarioCentavos: 10000, // R$ 100,00
  precoPersonalizacaoCentavos: 0,
  corFrente: "#E31E24",
  corCostas: "#000000",
  tamanho: "M",
  personalizacao: null,
  quantidade: 2, // Total R$ 200,00 (20000 centavos)
};

const cupomDezPorCento: Cupom = {
  codigo: "HEXA10",
  percentual: 0.10,
  descricao: "10% de desconto de teste",
};

describe("calcularResumoCheckout", () => {
  it("deve calcular corretamente uma compra sem desconto e com frete padrão grátis", () => {
    const res = calcularResumoCheckout({
      itens: [mockItem],
      opcaoFrete: "padrao",
      metodoPagamento: "cartao",
    });

    expect(res.subtotalCentavos).toBe(20000);
    expect(res.descontoCupomCentavos).toBe(0);
    expect(res.freteCentavos).toBe(0);
    expect(res.descontoPixCentavos).toBe(0);
    expect(res.totalCentavos).toBe(20000);
  });

  it("deve aplicar desconto de cupom corretamente", () => {
    const res = calcularResumoCheckout({
      itens: [mockItem],
      cupom: cupomDezPorCento,
      opcaoFrete: "padrao",
      metodoPagamento: "cartao",
    });

    expect(res.subtotalCentavos).toBe(20000);
    expect(res.descontoCupomCentavos).toBe(2000); // 10% de 20000
    expect(res.subtotalComDescontoCentavos).toBe(18000);
    expect(res.totalCentavos).toBe(18000);
  });

  it("deve somar o valor do frete expresso ao total", () => {
    const res = calcularResumoCheckout({
      itens: [mockItem],
      opcaoFrete: "expresso",
      metodoPagamento: "cartao",
    });

    expect(res.subtotalCentavos).toBe(20000);
    expect(res.freteCentavos).toBe(OPCOES_FRETE.expresso.precoCentavos); // 2500 centavos (R$ 25,00)
    expect(res.totalCentavos).toBe(22500);
  });

  it("deve aplicar 5% de desconto para pagamento via Pix", () => {
    const res = calcularResumoCheckout({
      itens: [mockItem],
      metodoPagamento: "pix",
    });

    // Subtotal 20000 centavos, Pix 5% = 1000 centavos
    expect(res.descontoPixCentavos).toBe(1000);
    expect(res.totalCentavos).toBe(19000);
  });

  it("deve combinar cupom e desconto Pix corretamente", () => {
    const res = calcularResumoCheckout({
      itens: [mockItem],
      cupom: cupomDezPorCento,
      opcaoFrete: "expresso",
      metodoPagamento: "pix",
    });

    // Subtotal: 20000
    // Cupom (10%): -2000 -> Subtotal com desconto: 18000
    // Frete Expresso: +2500
    // Pix 5% sobre R$ 180 (18000 centavos): -900
    // Total: 18000 + 2500 - 900 = 19600 centavos
    expect(res.subtotalCentavos).toBe(20000);
    expect(res.descontoCupomCentavos).toBe(2000);
    expect(res.freteCentavos).toBe(2500);
    expect(res.descontoPixCentavos).toBe(900);
    expect(res.totalCentavos).toBe(19600);
  });

  it("deve realizar arredondamento consistente em centavos", () => {
    const itemImpar: ItemCarrinho = {
      ...mockItem,
      precoUnitarioCentavos: 1533, // R$ 15,33
      quantidade: 1,
    };
    const res = calcularResumoCheckout({
      itens: [itemImpar],
      cupom: cupomDezPorCento, // 10% de 1533 = 153.3 -> 153
    });

    expect(res.subtotalCentavos).toBe(1533);
    expect(res.descontoCupomCentavos).toBe(153);
    expect(res.totalCentavos).toBe(1380);
  });

  it("deve garantir piso total mínimo de zero para evitar valores negativos", () => {
    const cupomSuper: Cupom = {
      codigo: "SUPER100",
      percentual: 1.5, // 150% desconto hipotético
      descricao: "Desconto total hipotético",
    };
    const res = calcularResumoCheckout({
      itens: [mockItem],
      cupom: cupomSuper,
    });

    expect(res.totalCentavos).toBe(0);
  });
});
