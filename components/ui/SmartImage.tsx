"use client";

import { useState } from "react";
import Image from "next/image";

interface SmartImageProps {
  srcBase: string;
  alt: string;
  fallbackSrc?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
  onFallbackFailed?: () => void;
}

const FALLBACK_PLACEHOLDER = "/og-default.jpg";

/**
 * Componente de Imagem otimizado usando next/image.
 * - Camisas (/camisas/): Formato .jpg — usa next/image com otimização.
 * - Escudos (/escudos/): Formato .svg — usa <img> nativo (next/image não otimiza SVGs).
 * Suporta parâmetros de busca como ?v=123 sem corromper a extensão.
 * Fallback resiliente: exibe imagem padrão em caso de erro, sem loops infinitos.
 */
export function SmartImage({
  srcBase,
  alt,
  fallbackSrc,
  fill,
  width,
  height,
  sizes,
  priority = false,
  className = "",
  onFallbackFailed,
}: SmartImageProps) {
  const [hasError, setHasError] = useState(false);
  const [useFallback, setUseFallback] = useState(false);

  // Separa o caminho da imagem de eventuais query strings (?v=123)
  const [urlPath, queryString] = srcBase.split("?");
  const query = queryString ? `?${queryString}` : "";

  let finalPath = urlPath;
  if (!/\.(jpg|jpeg|png|webp|svg)$/i.test(urlPath)) {
    const extensao = urlPath.includes("/escudos/") ? ".svg" : ".jpg";
    finalPath = `${urlPath}${extensao}`;
  }

  const finalSrc = `${finalPath}${query}`;
  const isSvg = /\.svg$/i.test(finalPath);

  // Se ambos falharam (imagem original + fallback), não renderiza nada
  if (hasError) {
    return null;
  }

  const currentSrc = useFallback ? (fallbackSrc || FALLBACK_PLACEHOLDER) : finalSrc;

  const handleError = () => {
    if (useFallback) {
      // Fallback também falhou — para aqui para evitar loop infinito
      setHasError(true);
      onFallbackFailed?.();
    } else {
      // Primeira falha: tenta fallback
      setUseFallback(true);
    }
  };

  // SVGs não se beneficiam da otimização do next/image — usar <img> nativo
  if (isSvg) {
    return (
      <img
        src={currentSrc}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={className}
        onError={handleError}
      />
    );
  }

  // Para imagens raster, usar next/image com otimização
  if (fill) {
    return (
      <Image
        src={currentSrc}
        alt={alt}
        fill
        sizes={sizes || "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
        priority={priority}
        className={className}
        onError={handleError}
      />
    );
  }

  return (
    <Image
      src={currentSrc}
      alt={alt}
      width={width || 400}
      height={height || 533}
      sizes={sizes || "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"}
      priority={priority}
      className={className}
      onError={handleError}
    />
  );
}
