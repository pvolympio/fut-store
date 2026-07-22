import { describe, it, expect } from "vitest";
import { normalizarTexto, produtoCorrespondeBusca } from "@/lib/search";
import { Produto } from "@/mock/produtos";

describe("normalizarTexto", () => {
  it("deve converter para minúsculas, remover acentos e espaços múltiplos", () => {
    expect(normalizarTexto("  Seleção   Brasileira!  ")).toBe("selecao brasileira!");
    expect(normalizarTexto("São Paulo F.C.")).toBe("sao paulo f.c.");
  });
});

describe("produtoCorrespondeBusca", () => {
  const produtoMock: Produto = {
    id: "prod-brasil-fluminense-terceira-7348",
    slug: "brasil-fluminense-terceira-7348",
    nome: "Fluminense — Retro 2012",
    timeId: "brasil-fluminense",
    timeSlug: "brasil-fluminense",
    timeTipo: "clube",
    categoria: "terceira",
    temporada: "2012/2013",
    precoCentavos: 29900,
    precoOriginalCentavos: null,
    status: "retro",
    tamanhosDisponiveis: ["P", "M", "G"],
    estoqueBaixo: false,
    corFrente: "#7A1C2C",
    corCostas: "#006437",
    unidadesRestantes: null,
  };

  it("deve encontrar produto ignorando acentos e maiúsculas", () => {
    expect(produtoCorrespondeBusca(produtoMock, "fluminense")).toBe(true);
    expect(produtoCorrespondeBusca(produtoMock, "FLUMINENSE")).toBe(true);
    expect(produtoCorrespondeBusca(produtoMock, "retro")).toBe(true);
  });

  it("deve encontrar produto por busca parcial de temporada ou categoria", () => {
    expect(produtoCorrespondeBusca(produtoMock, "2012")).toBe(true);
    expect(produtoCorrespondeBusca(produtoMock, "terceira")).toBe(true);
  });

  it("deve retornar falso quando o termo não corresponder", () => {
    expect(produtoCorrespondeBusca(produtoMock, "Flamengo")).toBe(false);
  });
});
