import { MetadataRoute } from "next";
import { times } from "@/mock/times";
import { produtos } from "@/mock/produtos";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "http://localhost:3000";

  // Rotas estáticas principais
  const rotasEstaticas: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/produtos`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sobre`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/style-guide`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  // Rotas dinâmicas para todos os 123 times (clubes e seleções)
  const rotasTimes: MetadataRoute.Sitemap = times.map((time) => ({
    url: `${baseUrl}/${time.tipo === "clube" ? "times" : "selecoes"}/${time.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Rotas dinâmicas para produtos cadastrados
  const rotasProdutos: MetadataRoute.Sitemap = produtos.map((prod) => ({
    url: `${baseUrl}/produtos/${prod.slug}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.8,
  }));

  return [...rotasEstaticas, ...rotasTimes, ...rotasProdutos];
}
