import { HomeHero } from "@/components/home/HomeHero";
import { SelectionGrid } from "@/components/home/SelectionGrid";
import { FeaturedClubs } from "@/components/home/FeaturedClubs";
import { BrandStory } from "@/components/home/BrandStory";
import { HorizontalShowcase } from "@/components/home/HorizontalShowcase";

export default function Home() {
  return (
    <main>
      <HomeHero />
      <SelectionGrid />
      <FeaturedClubs />
      <BrandStory />
      <HorizontalShowcase />
    </main>
  );
}
