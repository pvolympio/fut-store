import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

type SectionProps = HTMLAttributes<HTMLElement> & {
  /** Ritmo vertical padrão do design system — nunca improvisar valores fora daqui. */
  spacing?: "sm" | "md" | "lg" | "xl";
  as?: "section" | "div" | "header" | "footer";
};

const spacingMap: Record<NonNullable<SectionProps["spacing"]>, string> = {
  sm: "py-10 md:py-14",
  md: "py-14 md:py-22",
  lg: "py-18 md:py-30",
  xl: "py-22 md:py-[9rem]",
};

/**
 * Section — unidade de ritmo vertical. Toda separação entre blocos de página
 * passa por aqui, nunca por margin ad-hoc em componentes de conteúdo.
 */
export function Section({
  className,
  spacing = "md",
  as: Tag = "section",
  ...props
}: SectionProps) {
  return (
    <Tag className={cn(spacingMap[spacing], className)} {...props} />
  );
}
