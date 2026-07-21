import { z } from "zod";

export const identificacaoSchema = z.object({
  nomeCompleto: z
    .string()
    .trim()
    .min(3, "Informe seu nome completo")
    .regex(/^[A-Za-zÀ-ú\s]+$/, "Use apenas letras"),
  email: z.string().trim().email("E-mail inválido"),
  cpf: z
    .string()
    .trim()
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF no formato 000.000.000-00"),
  telefone: z
    .string()
    .trim()
    .regex(/^\(\d{2}\)\s?\d{4,5}-\d{4}$/, "Telefone no formato (11) 91234-5678"),
});
export type IdentificacaoData = z.infer<typeof identificacaoSchema>;

export const entregaSchema = z.object({
  cep: z.string().trim().regex(/^\d{5}-?\d{3}$/, "CEP no formato 00000-000"),
  endereco: z.string().trim().min(3, "Informe o endereço"),
  numero: z.string().trim().min(1, "Informe o número"),
  complemento: z.string().trim().optional(),
  bairro: z.string().trim().min(2, "Informe o bairro"),
  cidade: z.string().trim().min(2, "Informe a cidade"),
  estado: z.string().trim().length(2, "UF com 2 letras (ex: SP)"),
  metodoEntrega: z.enum(["padrao", "expressa"]),
});
export type EntregaData = z.infer<typeof entregaSchema>;

const cartaoBaseSchema = z.object({
  metodo: z.literal("cartao"),
  numeroCartao: z
    .string()
    .trim()
    .regex(/^(\d{4}\s){3}\d{4}$/, "Número do cartão com 16 dígitos"),
  nomeImpresso: z
    .string()
    .trim()
    .min(3, "Informe o nome impresso no cartão")
    .regex(/^[A-Za-zÀ-ú\s]+$/, "Use apenas letras"),
  validade: z
    .string()
    .trim()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Validade no formato MM/AA"),
  cvv: z.string().trim().regex(/^\d{3,4}$/, "CVV inválido"),
  parcelas: z.coerce.number().min(1).max(12),
});

const pixSchema = z.object({ metodo: z.literal("pix") });
const boletoSchema = z.object({ metodo: z.literal("boleto") });

export const pagamentoSchema = z.discriminatedUnion("metodo", [
  cartaoBaseSchema,
  pixSchema,
  boletoSchema,
]);
export type PagamentoData = z.infer<typeof pagamentoSchema>;
export type CartaoData = z.infer<typeof cartaoBaseSchema>;
