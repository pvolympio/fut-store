"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, type HTMLMotionProps } from "framer-motion";
import { forwardRef } from "react";

/**
 * Botão — linguagem de motion "Snap & Surge":
 * hover/active respondem em 150–220ms com easing "sprint" (saída rápida,
 * chegada macia). Nada de escala exagerada — 0.98 no active é suficiente
 * para dar peso físico sem parecer brinquedo.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-body font-semibold uppercase tracking-[0.04em] text-body-sm transition-colors duration-quick ease-sprint rounded disabled:pointer-events-none disabled:opacity-40 select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-flood text-ink hover:bg-flood-soft active:bg-flood shadow-flood",
        secondary:
          "bg-transparent text-chalk border border-chalk/30 hover:border-chalk hover:bg-chalk/5 active:bg-chalk/10",
        ghost:
          "bg-transparent text-chalk-dim hover:text-chalk hover:bg-surface-raised active:bg-surface-overlay",
        danger:
          "bg-transparent text-danger border border-danger/40 hover:bg-danger/10",
      },
      size: {
        sm: "h-9 px-4 text-caption",
        md: "h-12 px-6",
        lg: "h-14 px-8 text-body",
        icon: "h-11 w-11 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends Omit<HTMLMotionProps<"button">, "size">,
    VariantProps<typeof buttonVariants> {}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.98 }}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
