import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const tipo = formData.get("tipo") as "camisa" | "escudo";
    const timeSlug = formData.get("timeSlug") as string;
    const categoria = (formData.get("categoria") as string) || "titular";
    const vista = (formData.get("vista") as string) || "frente";

    if (!file || !timeSlug || !tipo) {
      return NextResponse.json(
        { error: "Arquivo, tipo de envio e time são obrigatórios." },
        { status: 400 }
      );
    }

    // Validação de tipo de arquivo
    const extension = file.name.split(".").pop()?.toLowerCase() || "";
    if (tipo === "camisa" && !["jpg", "jpeg", "png", "webp"].includes(extension)) {
      return NextResponse.json(
        { error: "Fotos de camisas devem ser nos formatos JPG, PNG ou WEBP." },
        { status: 400 }
      );
    }
    if (tipo === "escudo" && extension !== "svg") {
      return NextResponse.json(
        { error: "Escudos de times devem ser estritamente no formato .SVG." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    let targetDir = "";
    let targetFileName = "";
    let publicUrl = "";

    const timestamp = Date.now();

    if (tipo === "escudo") {
      targetDir = path.join(process.cwd(), "public", "escudos");
      targetFileName = `${timeSlug}.svg`;
      publicUrl = `/escudos/${targetFileName}`;
    } else {
      // Pasta exclusiva para o time: public/camisas/{timeSlug}/
      targetDir = path.join(process.cwd(), "public", "camisas", timeSlug);
      
      const sufixoVista = vista === "costas" ? "-costas" : "-frente";
      // Sempre salvar estritamente com a extensão .jpg
      targetFileName = `${categoria}${sufixoVista}.jpg`;
      publicUrl = `/camisas/${timeSlug}/${targetFileName}`;
    }

    // Cria o diretório caso não exista
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const finalPath = path.join(targetDir, targetFileName);
    fs.writeFileSync(finalPath, buffer);

    return NextResponse.json({
      success: true,
      message: `Imagem salva com sucesso!`,
      filename: targetFileName,
      publicUrl: `${publicUrl}?v=${timestamp}`,
      pathSalvo: publicUrl,
    });
  } catch (error: any) {
    console.error("Erro no upload admin:", error);
    return NextResponse.json(
      { error: error?.message || "Erro interno ao salvar arquivo no servidor local." },
      { status: 500 }
    );
  }
}
