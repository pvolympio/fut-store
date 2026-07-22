import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const camisasBaseDir = path.join(process.cwd(), "public", "camisas");
    const escudosDir = path.join(process.cwd(), "public", "escudos");

    const escudosExistentes = fs.existsSync(escudosDir) ? fs.readdirSync(escudosDir) : [];
    
    // Mapeia arquivos dentro de pastas de times (ex: public/camisas/brasil-flamengo/titular-frente.jpg)
    // bem como arquivos legados na raiz de camisas.
    const camisasExistentes: string[] = [];

    if (fs.existsSync(camisasBaseDir)) {
      const itensCamisas = fs.readdirSync(camisasBaseDir);
      for (const item of itensCamisas) {
        const fullPath = path.join(camisasBaseDir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          // É a pasta de um time! ex: brasil-flamengo
          const subItens = fs.readdirSync(fullPath);
          for (const sub of subItens) {
            camisasExistentes.push(`${item}/${sub}`);
          }
        } else {
          // Arquivo legados na raiz de camisas
          camisasExistentes.push(item);
        }
      }
    }

    return NextResponse.json({
      camisas: camisasExistentes,
      escudos: escudosExistentes,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Erro ao ler arquivos" }, { status: 500 });
  }
}
