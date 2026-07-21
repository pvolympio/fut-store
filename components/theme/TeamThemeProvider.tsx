import { CSSProperties, ReactNode } from "react";
import { Time } from "@/mock/times";
import { gerarTemaTime, temaParaCssVars } from "@/lib/theme";
import { cn } from "@/lib/utils";

interface TeamThemeProviderProps {
  time: Time;
  children: ReactNode;
  className?: string;
}

/**
 * TeamThemeProvider — Server Component.
 *
 * Calcula o tema do time (cores + contraste) no servidor e injeta as
 * CSS custom properties via atributo `style` no HTML já renderizado.
 * Como isso acontece antes do primeiro paint no cliente, não há flicker
 * de "cor errada por um instante" — a página já chega do servidor com
 * as cores certas do time.
 *
 * `data-team={slug}` fica disponível para qualquer CSS ou seletor
 * adicional que precise reagir ao time atual.
 */
export function TeamThemeProvider({
  time,
  children,
  className,
}: TeamThemeProviderProps) {
  const tema = gerarTemaTime(time.cores);
  const vars = temaParaCssVars(tema) as CSSProperties;

  return (
    <div data-team={time.slug} style={vars} className={cn("relative", className)}>
      {children}
    </div>
  );
}
