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
 * Se o arquivo não existir, ativa imediatamente o fallback (sem tentar outros formatos).
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

  // Determina a extensão estrita
  let finalSrc = srcBase;
  if (!/\.(jpg|jpeg|png|webp|svg)$/i.test(srcBase)) {
    const extensaoEstrita = srcBase.includes("/escudos/") ? ".svg" : ".jpg";
    finalSrc = `${srcBase}${extensaoEstrita}`;
  }

  return (
    <img
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
