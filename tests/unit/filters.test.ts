import { describe, it, expect } from "vitest";
import { aplicarFiltros, ordenarProdutos, filtrosVazios } from "@/lib/filtros";
import { Produto } from "@/mock/produtos";

const listaProdutos: Produto[] = [
  {
    id: "prod-1",
    slug: "camisa-a",
    nome: "Camisa A",
    timeId: "t1",
    timeSlug: "t1",
    timeTipo: "clube",
    categoria: "titular",
    temporada: "2026/27",
    precoCentavos: 10000,
    precoOriginalCentavos: 15000, // em promoção
    status: "novo",
    tamanhosDisponiveis: ["P", "M"],
    estoqueBaixo: true,
    corFrente: "#000",
    corCostas: "#fff",
    unidadesRestantes: 2,
  },
  {
    id: "prod-2",
    slug: "camisa-b",
    nome: "Camisa B",
    timeId: "t2",
    timeSlug: "t2",
    timeTipo: "clube",
    categoria: "visitante",
    temporada: "2025/26",
    precoCentavos: 25000,
    precoOriginalCentavos: null,
    status: null,
    tamanhosDisponiveis: ["G", "GG"],
    estoqueBaixo: false,
    corFrente: "#fff",
    corCostas: "#000",
    unidadesRestantes: null,
  },
];

describe("aplicarFiltros e ordenarProdutos", () => {
  it("deve filtrar apenas itens em promoção", () => {
    const res = aplicarFiltros(listaProdutos, { ...filtrosVazios, apenasPromocao: true }, "");
    expect(res).toHaveLength(1);
    expect(res[0].id).toBe("prod-1");
  });

  it("deve filtrar por tamanho", () => {
    const res = aplicarFiltros(listaProdutos, { ...filtrosVazios, tamanhos: ["G"] }, "");
    expect(res).toHaveLength(1);
    expect(res[0].id).toBe("prod-2");
  });

  it("deve ordenar corretamente por menor e maior preço", () => {
    const menor = ordenarProdutos(listaProdutos, "menor-preco");
    expect(menor[0].precoCentavos).toBe(10000);

    const maior = ordenarProdutos(listaProdutos, "maior-preco");
    expect(maior[0].precoCentavos).toBe(25000);
  });

  it("deve ordenar novidades priorizando status 'novo'", () => {
    const novidades = ordenarProdutos(listaProdutos, "novidades");
    expect(novidades[0].status).toBe("novo");
  });
});
