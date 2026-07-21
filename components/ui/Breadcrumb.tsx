import Link from "next/link";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export function Breadcrumb({
  itens,
  temaTime = false,
}: {
  itens: BreadcrumbItem[];
  temaTime?: boolean;
}) {
  return (
    <nav aria-label="Trilha de navegação" className="mb-8">
      <ol className="flex flex-wrap items-center gap-2 font-mono text-caption uppercase tracking-[0.04em] text-chalk-dim">
        {itens.map((item, i) => (
          <li key={item.label} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden className="text-chalk-dim/40">/</span>}
            {item.href ? (
              <Link
                href={item.href}
                className={cn(
                  "transition-colors duration-snap",
                  temaTime ? "hover:text-team-primary" : "hover:text-flood"
                )}
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-chalk">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
