import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Time } from "@/mock/times";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Rota canônica de um time: clubes vivem em /times/:slug, seleções em /selecoes/:slug. */
export function hrefTime(time: Pick<Time, "tipo" | "slug">) {
  return time.tipo === "clube" ? `/times/${time.slug}` : `/selecoes/${time.slug}`;
}
