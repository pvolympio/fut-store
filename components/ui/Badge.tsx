import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { HTMLAttributes } from "react";

/**
 * Badge — etiqueta de status do produto. Cada variante carrega um
 * significado funcional específico, nunca decorativo.
 */
const badgeVariants = cva(
  "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm font-mono text-caption uppercase tracking-[0.06em] leading-none w-fit",
  {
    variants: {
      variant: {
        novo: "bg-flood text-ink",
        limitada: "bg-ink border border-flood/60 text-flood",
        retro: "bg-surface-overlay text-chalk-dim border border-border",
        esgotando: "bg-danger/15 text-danger border border-danger/40",
      },
    },
    defaultVariants: { variant: "novo" },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

const labels: Record<string, string> = {
  novo: "Novo",
  limitada: "Edição Limitada",
  retro: "Retrô",
  esgotando: "Esgotando",
};

export function Badge({ className, variant, children, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {variant === "esgotando" && (
        <span className="h-1.5 w-1.5 rounded-full bg-danger animate-pulse" />
      )}
      {children ?? labels[variant ?? "novo"]}
    </span>
  );
}
