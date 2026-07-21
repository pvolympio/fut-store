import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

/**
 * Container — largura máxima editorial (1440px) com margens fluidas.
 * Mobile-first: padding cresce por breakpoint via config do container no Tailwind.
 */
export function Container({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("container mx-auto max-w-[1440px]", className)}
      {...props}
    />
  );
}
