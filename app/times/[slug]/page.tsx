import { notFound } from "next/navigation";
import { times, getTimePorSlug } from "@/mock/times";
import { getProdutosPorTime } from "@/mock/produtos";
import { TeamThemeProvider } from "@/components/theme/TeamThemeProvider";
import { TeamHero } from "@/components/team/TeamHero";
import { TeamProductGrid } from "@/components/team/TeamProductGrid";

const clubes = times.filter((t) => t.tipo === "clube");

export const revalidate = 0;
export const dynamic = "force-dynamic";

export function generateMetadata({ params }: { params: { slug: string } }) {
  const time = getTimePorSlug(params.slug);
  if (!time) return {};
  return {
    title: `${time.apelido} — Camisas Oficiais | Arena`,
    description: `Camisas oficiais do ${time.nome}: titular, visitante, terceiro uniforme e retrô.`,
  };
}

export default function TeamPage({ params }: { params: { slug: string } }) {
  const time = getTimePorSlug(params.slug);
  if (!time || time.tipo !== "clube") notFound();

  const produtos = getProdutosPorTime(time.slug);

  return (
    <TeamThemeProvider time={time}>
      <main>
        <TeamHero time={time} />
        <TeamProductGrid produtos={produtos} />
      </main>
    </TeamThemeProvider>
  );
}
