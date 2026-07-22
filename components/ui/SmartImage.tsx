"use client";

import { useState, ImgHTMLAttributes } from "react";

interface SmartImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> {
  srcBase: string;
  onFallbackFailed?: () => void;
}

/**
 * Componente de Imagem Estrita.
 * - Camisas (/camisas/): Carrega EXCLUSIVAMENTE no formato .jpg
 * - Escudos (/escudos/): Carrega EXCLUSIVAMENTE no formato .svg
 * Suporta parâmetros de busca como ?v=123 sem corromper a extensão.
 */
export function SmartImage({
  srcBase,
  onFallbackFailed,
  alt = "",
  ...props
}: SmartImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return null;
  }

  // Separa o caminho da imagem de eventuais parâmetros de busca (query string like ?v=123)
  const [urlPath, queryString] = srcBase.split("?");
  const hasQuery = queryString ? `?${queryString}` : "";

  let finalPath = urlPath;
  if (!/\.(jpg|jpeg|png|webp|svg)$/i.test(urlPath)) {
    const extensaoEstrita = urlPath.includes("/escudos/") ? ".svg" : ".jpg";
    finalPath = `${urlPath}${extensaoEstrita}`;
  }

  const finalSrc = `${finalPath}${hasQuery}`;

  return (
    <img
      loading="lazy"
      decoding="async"
      {...props}
      src={finalSrc}
      alt={alt}
      onError={() => {
        setFailed(true);
        onFallbackFailed?.();
      }}
    />
  );
}
