import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Produto } from "@/mock/produtos";

const filePath = path.join(process.cwd(), "src", "data", "produtos.json");

function lerProdutos(): Produto[] {
  if (!fs.existsSync(filePath)) {
    return [];
  }
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw);
  } catch (e) {
    console.error("Erro ao ler produtos.json:", e);
    return [];
  }
}

function salvarProdutos(produtos: Produto[]) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  // Escrita atômica para evitar truncamento ou corrupção do JSON
  const tempPath = `${filePath}.tmp`;
  fs.writeFileSync(tempPath, JSON.stringify(produtos, null, 2), "utf-8");
  fs.renameSync(tempPath, filePath);
}

export async function GET() {
  const produtos = lerProdutos();
  return NextResponse.json({ produtos });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      id,
      slug,
      nome,
      timeId,
      timeSlug,
      timeTipo,
      categoria,
      temporada,
      precoCentavos,
      precoOriginalCentavos,
      status,
      tamanhosDisponiveis,
      estoqueBaixo,
      corFrente,
      corCostas,
      unidadesRestantes,
      imagemFrente,
      imagemCostas,
    } = body;

    // 1. Validação de nome
    if (!nome || typeof nome !== "string" || !nome.trim()) {
      return NextResponse.json(
        { error: "O nome / título do manto é obrigatório." },
        { status: 400 }
      );
    }

    // 2. Validação de time
    if (!timeSlug || typeof timeSlug !== "string") {
      return NextResponse.json(
        { error: "O time é obrigatório." },
        { status: 400 }
      );
    }

    // 3. Validação de preço
    const precoNum = Number(precoCentavos);
    if (isNaN(precoNum) || precoNum <= 0) {
      return NextResponse.json(
        { error: "Informe um preço de venda válido maior que zero." },
        { status: 400 }
      );
    }

    // 4. Validação de tamanhos
    const listaTamanhos = Array.isArray(tamanhosDisponiveis) && tamanhosDisponiveis.length > 0
      ? tamanhosDisponiveis
      : ["P", "M", "G", "GG"];

    const produtos = lerProdutos();

    const novoId = id || `prod-${timeSlug}-${categoria}-${Date.now()}`;
    const novoSlug = slug || `${timeSlug}-${categoria}-${Date.now().toString().slice(-4)}`;

    const produtoItem: Produto = {
      id: novoId,
      slug: novoSlug,
      nome: nome.trim(),
      timeId: timeId || timeSlug,
      timeSlug,
      timeTipo: timeTipo || "clube",
      categoria: categoria || "titular",
      temporada: temporada?.trim() || "2026/27",
      precoCentavos: Math.round(precoNum),
      precoOriginalCentavos: precoOriginalCentavos ? Math.round(Number(precoOriginalCentavos)) : null,
      status: status || null,
      tamanhosDisponiveis: listaTamanhos,
      estoqueBaixo: Boolean(estoqueBaixo),
      corFrente: corFrente || "#000000",
      corCostas: corCostas || "#FFFFFF",
      unidadesRestantes: unidadesRestantes ? Number(unidadesRestantes) : null,
      imagemFrente: imagemFrente || `/camisas/${timeSlug}/${categoria}-frente.jpg`,
      imagemCostas: imagemCostas || `/camisas/${timeSlug}/${categoria}-costas.jpg`,
    };

    const indexExistente = produtos.findIndex((p) => p.id === novoId);

    if (indexExistente >= 0) {
      produtos[indexExistente] = produtoItem;
    } else {
      produtos.unshift(produtoItem);
    }

    salvarProdutos(produtos);

    return NextResponse.json({
      success: true,
      message: "Manto salvo com sucesso no catálogo!",
      produto: produtoItem,
    });
  } catch (error: any) {
    console.error("Erro na API de salvar produto:", error);
    return NextResponse.json(
      { error: error?.message || "Erro interno ao salvar produto." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID do produto é obrigatório." }, { status: 400 });
    }

    let produtos = lerProdutos();
    const tamanhoInicial = produtos.length;
    produtos = produtos.filter((p) => p.id !== id);

    if (produtos.length === tamanhoInicial) {
      return NextResponse.json({ error: "Produto não encontrado para remoção." }, { status: 404 });
    }

    salvarProdutos(produtos);

    return NextResponse.json({ success: true, message: "Manto removido do catálogo com sucesso." });
  } catch (error: any) {
    console.error("Erro na API de remover produto:", error);
    return NextResponse.json(
      { error: error?.message || "Erro interno ao remover produto." },
      { status: 500 }
    );
  }
}
