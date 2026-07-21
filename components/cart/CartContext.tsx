"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
  ReactNode,
} from "react";
import {
  Cupom,
  ItemCarrinho,
  PersonalizacaoItem,
  cuponsValidos,
  montarChaveItem,
} from "@/lib/cart-types";

const STORAGE_KEY = "arena:carrinho:v1";

interface NovoItemInput {
  produtoId: string;
  slug: string;
  nome: string;
  timeNome: string;
  timeSlug: string;
  temporada: string;
  precoUnitarioCentavos: number;
  precoPersonalizacaoCentavos?: number;
  corFrente: string;
  corCostas: string;
  tamanho: string;
  personalizacao?: PersonalizacaoItem | null;
  quantidade?: number;
}

interface CartContextValue {
  itens: ItemCarrinho[];
  quantidade: number;
  ultimoIncremento: number;
  subtotalCentavos: number;
  descontoCentavos: number;
  totalCentavos: number;
  cupom: Cupom | null;
  aberto: boolean;
  abrirCarrinho: () => void;
  fecharCarrinho: () => void;
  adicionarItem: (item: NovoItemInput) => void;
  removerItem: (chave: string) => void;
  atualizarQuantidade: (chave: string, quantidade: number) => void;
  aplicarCupom: (codigo: string) => "aplicado" | "invalido";
  removerCupom: () => void;
  limparCarrinho: () => void;
  hidratado: boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<ItemCarrinho[]>([]);
  const [ultimoIncremento, setUltimoIncremento] = useState(0);
  const [cupom, setCupom] = useState<Cupom | null>(null);
  const [aberto, setAberto] = useState(false);
  const [hidratado, setHidratado] = useState(false);

  // Carrega do localStorage no mount (client-only)
  useEffect(() => {
    try {
      const bruto = window.localStorage.getItem(STORAGE_KEY);
      if (bruto) {
        const salvo = JSON.parse(bruto) as { itens: ItemCarrinho[]; cupom: Cupom | null };
        setItens(salvo.itens ?? []);
        setCupom(salvo.cupom ?? null);
      }
    } catch {
      // localStorage indisponível ou dado corrompido — segue com carrinho vazio
    } finally {
      setHidratado(true);
    }
  }, []);

  // Persiste a cada mudança, após a hidratação inicial
  useEffect(() => {
    if (!hidratado) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ itens, cupom }));
    } catch {
      // silencioso: quota excedida ou storage bloqueado não deve quebrar a UI
    }
  }, [itens, cupom, hidratado]);

  const adicionarItem = useCallback((input: NovoItemInput) => {
    const personalizacao = input.personalizacao ?? null;
    const chave = montarChaveItem(input.produtoId, input.tamanho, personalizacao);
    const incremento = input.quantidade ?? 1;

    setItens((atual) => {
      const existente = atual.find((i) => i.chave === chave);
      if (existente) {
        return atual.map((i) =>
          i.chave === chave ? { ...i, quantidade: i.quantidade + incremento } : i
        );
      }
      const novo: ItemCarrinho = {
        chave,
        produtoId: input.produtoId,
        slug: input.slug,
        nome: input.nome,
        timeNome: input.timeNome,
        timeSlug: input.timeSlug,
        temporada: input.temporada,
        precoUnitarioCentavos: input.precoUnitarioCentavos,
        precoPersonalizacaoCentavos: input.precoPersonalizacaoCentavos ?? 0,
        corFrente: input.corFrente,
        corCostas: input.corCostas,
        tamanho: input.tamanho,
        personalizacao,
        quantidade: incremento,
      };
      return [...atual, novo];
    });
    setUltimoIncremento((n) => n + 1);
    setAberto(true);
  }, []);

  const removerItem = useCallback((chave: string) => {
    setItens((atual) => atual.filter((i) => i.chave !== chave));
  }, []);

  const atualizarQuantidade = useCallback((chave: string, quantidade: number) => {
    setItens((atual) =>
      quantidade <= 0
        ? atual.filter((i) => i.chave !== chave)
        : atual.map((i) => (i.chave === chave ? { ...i, quantidade } : i))
    );
  }, []);

  const aplicarCupom = useCallback((codigoBruto: string): "aplicado" | "invalido" => {
    const codigo = codigoBruto.trim().toUpperCase();
    const encontrado = cuponsValidos.find((c) => c.codigo === codigo);
    if (!encontrado) return "invalido";
    setCupom(encontrado);
    return "aplicado";
  }, []);

  const removerCupom = useCallback(() => setCupom(null), []);

  const limparCarrinho = useCallback(() => {
    setItens([]);
    setCupom(null);
  }, []);

  const quantidade = useMemo(() => itens.reduce((soma, i) => soma + i.quantidade, 0), [itens]);

  const subtotalCentavos = useMemo(
    () =>
      itens.reduce(
        (soma, i) =>
          soma + (i.precoUnitarioCentavos + i.precoPersonalizacaoCentavos) * i.quantidade,
        0
      ),
    [itens]
  );

  const descontoCentavos = useMemo(
    () => (cupom ? Math.round(subtotalCentavos * cupom.percentual) : 0),
    [subtotalCentavos, cupom]
  );

  const totalCentavos = subtotalCentavos - descontoCentavos;

  return (
    <CartContext.Provider
      value={{
        itens,
        quantidade,
        ultimoIncremento,
        subtotalCentavos,
        descontoCentavos,
        totalCentavos,
        cupom,
        aberto,
        abrirCarrinho: () => setAberto(true),
        fecharCarrinho: () => setAberto(false),
        adicionarItem,
        removerItem,
        atualizarQuantidade,
        aplicarCupom,
        removerCupom,
        limparCarrinho,
        hidratado,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart precisa estar dentro de <CartProvider>");
  return ctx;
}
