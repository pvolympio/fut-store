import { times } from "@/mock/times";

export const clubes = times.filter((t) => t.tipo === "clube");
export const selecoes = times.filter((t) => t.tipo === "selecao");
