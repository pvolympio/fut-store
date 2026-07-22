"use client";

import { useState, useEffect, useCallback } from "react";
import { Produto } from "@/mock/produtos";

export function useProducts() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const carregarProdutos = useCallback(async () => {
    setCarregando(true);
    setErro(null);
    try {
      const res = await fetch("/api/admin/produtos");
      const data = await res.json();
      if (data.produtos) {
        setProdutos(data.produtos);
      } else {
        setProdutos([]);
      }
    } catch (err) {
      console.error("Erro ao carregar produtos:", err);
      setErro("Falha ao carregar catálogo de produtos.");
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregarProdutos();
  }, [carregarProdutos]);

  const excluirProduto = async (id: string): Promise<boolean> => {
    try {
      const res = await fetch(`/api/admin/produtos?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        await carregarProdutos();
        return true;
      }
      return false;
    } catch (err) {
      console.error("Erro ao excluir produto:", err);
      return false;
    }
  };

  return {
    produtos,
    carregando,
    erro,
    carregarProdutos,
    excluirProduto,
  };
}
