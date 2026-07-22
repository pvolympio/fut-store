import { z } from "zod";

export const productSchema = z.object({
  id: z.string().optional(),
  slug: z.string().optional(),
  nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres."),
  timeSlug: z.string().min(1, "Selecione um time válido."),
  categoria: z.enum(["titular", "visitante", "terceira", "retro", "goleiro"]),
  temporada: z.string().min(2, "Informe a temporada."),
  precoReais: z.string().refine((val) => {
    const num = parseFloat(val.replace(",", "."));
    return !isNaN(num) && num > 0;
  }, "Informe um preço de venda válido maior que zero."),
  precoOriginalReais: z.string().optional(),
  status: z.enum(["novo", "limitada", "retro", "esgotando"]).nullable(),
  tamanhos: z.array(z.string()).min(1, "Selecione pelo menos um tamanho."),
});

export type ProductFormData = z.infer<typeof productSchema>;
