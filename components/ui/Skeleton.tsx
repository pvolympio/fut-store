import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

/**
 * Skeleton — placeholder de carregamento. Usa um shimmer sutil e lento
 * (1.6s) para não competir com a linguagem "Snap & Surge" das interações,
 * que é rápida e responde a ações do usuário — carregamento é passivo.
 */
export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded bg-surface-raised",
        "before:absolute before:inset-0 before:-translate-x-full",
        "before:bg-gradient-to-r before:from-transparent before:via-white/[0.06] before:to-transparent",
        "before:animate-[shimmer_1.6s_ease-in-out_infinite]",
        className
      )}
      {...props}
    />
  );
}

export function SkeletonProductCard() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="aspect-[3/4] w-full" />
      <Skeleton className="h-3 w-2/3" />
      <Skeleton className="h-3 w-1/3" />
    </div>
  );
}
