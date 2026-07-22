import { MetadataRoute } from "next";
import { times } from "@/mock/times";
import { produtos } from "@/mock/produtos";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  // Rotas estáticas públicas principais
  const rotasEstaticas: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/produtos`,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sobre`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/guia-de-tamanhos`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contato`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/faq`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/trocas-e-devolucoes`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacidade`,
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];

  // Rotas dinâmicas para clubes e seleções
  const rotasTimes: MetadataRoute.Sitemap = times.map((time) => ({
    url: `${baseUrl}/${time.tipo === "clube" ? "times" : "selecoes"}/${time.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Rotas dinâmicas para produtos cadastrados
  const rotasProdutos: MetadataRoute.Sitemap = produtos.map((prod) => ({
    url: `${baseUrl}/produtos/${prod.slug}`,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  return [...rotasEstaticas, ...rotasTimes, ...rotasProdutos];
}
