/**
 * Sistema de tema dinâmico — cálculo de contraste.
 * Dado o hex de uma cor de time, decide se o texto sobre ela deve ser
 * "chalk" (quase branco) ou "ink" (quase preto), usando luminância relativa
 * (WCAG 2.x) para garantir contraste mínimo legível.
 */

const INK = "#0A0B0D";
const CHALK = "#F5F5F0";

function hexParaRgb(hex: string): { r: number; g: number; b: number } {
  const limpo = hex.replace("#", "");
  const full =
    limpo.length === 3
      ? limpo
          .split("")
          .map((c) => c + c)
          .join("")
      : limpo;
  const int = parseInt(full, 16);
  return {
    r: (int >> 16) & 255,
    g: (int >> 8) & 255,
    b: int & 255,
  };
}

function canalLinear(c: number): number {
  const s = c / 255;
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

/** Luminância relativa (0 = preto, 1 = branco), fórmula WCAG. */
export function luminanciaRelativa(hex: string): number {
  const { r, g, b } = hexParaRgb(hex);
  return (
    0.2126 * canalLinear(r) + 0.7152 * canalLinear(g) + 0.0722 * canalLinear(b)
  );
}

/** Razão de contraste WCAG entre duas luminâncias (1:1 a 21:1). */
export function razaoDeContraste(l1: number, l2: number): number {
  const [claro, escuro] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (claro + 0.05) / (escuro + 0.05);
}

/**
 * Retorna a cor de texto (ink ou chalk) que maximiza o contraste sobre
 * o hex informado. Times com cores muito claras (branco, amarelo) recebem
 * texto ink; cores escuras recebem chalk.
 */
export function corDeTextoIdeal(hexFundo: string): string {
  const luminancia = luminanciaRelativa(hexFundo);
  const contrasteComInk = razaoDeContraste(luminancia, luminanciaRelativa(INK));
  const contrasteComChalk = razaoDeContraste(luminancia, luminanciaRelativa(CHALK));
  return contrasteComInk >= contrasteComChalk ? INK : CHALK;
}

export interface CoresTime {
  primaria: string;
  secundaria: string;
  terciaria: string;
}

export interface TemaTime {
  primaria: string;
  secundaria: string;
  terciaria: string;
  onPrimaria: string;
  onSecundaria: string;
  onTerciaria: string;
}

/** Gera o conjunto completo de variáveis de tema para um time. */
export function gerarTemaTime(cores: CoresTime): TemaTime {
  return {
    primaria: cores.primaria,
    secundaria: cores.secundaria,
    terciaria: cores.terciaria,
    onPrimaria: corDeTextoIdeal(cores.primaria),
    onSecundaria: corDeTextoIdeal(cores.secundaria),
    onTerciaria: corDeTextoIdeal(cores.terciaria),
  };
}

/** Converte o tema em um objeto de CSS custom properties, pronto para `style`. */
export function temaParaCssVars(tema: TemaTime): Record<string, string> {
  return {
    "--team-primary": tema.primaria,
    "--team-secondary": tema.secundaria,
    "--team-tertiary": tema.terciaria,
    "--team-on-primary": tema.onPrimaria,
    "--team-on-secondary": tema.onSecundaria,
    "--team-on-tertiary": tema.onTerciaria,
  };
}
