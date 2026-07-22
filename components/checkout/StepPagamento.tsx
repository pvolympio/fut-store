"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { formatarPreco } from "@/mock/produtos";
import { CardPreview } from "./CardPreview";
import { cartaoBaseSchema, CartaoData, CartaoFormInput, PagamentoData } from "@/lib/checkout-schemas";
import { MetodoPagamento, ResumoCheckout } from "@/lib/checkout-calculations";

function maskNumeroCartao(v: string) {
  return v.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ").trim();
}
function maskValidade(v: string) {
  return v.replace(/\D/g, "").slice(0, 4).replace(/(\d{2})(\d)/, "$1/$2");
}

export function StepPagamento({
  resumo,
  metodoAtual,
  onMudarMetodo,
  onAvancar,
  onVoltar,
}: {
  resumo: ResumoCheckout;
  metodoAtual: MetodoPagamento;
  onMudarMetodo: (m: MetodoPagamento) => void;
  onAvancar: (dados: PagamentoData) => void;
  onVoltar: () => void;
}) {
  const [focoCvv, setFocoCvv] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CartaoFormInput, unknown, CartaoData>({
    resolver: zodResolver(cartaoBaseSchema),
    defaultValues: { metodo: "cartao", parcelas: 1 },
    mode: "onBlur",
  });

  const numeroCartao = watch("numeroCartao") ?? "";
  const nomeImpresso = watch("nomeImpresso") ?? "";
  const validade = watch("validade") ?? "";
  const cvv = watch("cvv") ?? "";

  function submeterCartao(dados: CartaoData) {
    onAvancar({ ...dados, metodo: "cartao" });
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Indicador discreto de projeto demonstrativo */}
      <div className="rounded-md bg-flood/10 border border-flood/30 p-3.5 flex items-start gap-3">
        <span className="text-flood font-bold text-body-sm">ℹ️</span>
        <p className="text-caption text-chalk-dim leading-relaxed">
          Esta é uma experiência demonstrativa para portfólio. Nenhum pagamento ou pedido real será processado.
        </p>
      </div>

      <div>
        <p className="font-mono text-caption uppercase tracking-[0.08em] text-chalk-dim mb-3" id="label-forma-pagamento">
          Forma de pagamento
        </p>
        <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-labelledby="label-forma-pagamento">
          {(
            [
              { valor: "cartao" as const, label: "Cartão" },
              { valor: "pix" as const, label: "Pix (-5%)" },
              { valor: "boleto" as const, label: "Boleto" },
            ]
          ).map((opcao) => (
            <button
              key={opcao.valor}
              type="button"
              role="radio"
              aria-checked={metodoAtual === opcao.valor}
              onClick={() => onMudarMetodo(opcao.valor)}
              className={cn(
                "h-11 rounded border font-mono text-caption uppercase tracking-[0.06em] transition-colors duration-snap ease-sprint focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-flood",
                metodoAtual === opcao.valor
                  ? "border-flood text-flood bg-flood/5 font-bold"
                  : "border-border text-chalk-dim hover:border-chalk/40"
              )}
            >
              {opcao.label}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {metodoAtual === "cartao" && (
          <motion.div
            key="cartao"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8"
          >
            <CardPreview numero={numeroCartao} nome={nomeImpresso} validade={validade} cvv={cvv} focoCvv={focoCvv} />

            <form onSubmit={handleSubmit(submeterCartao)} noValidate className="flex flex-col gap-5">
              <div>
                <Input
                  label="Número do cartão"
                  id="numeroCartao"
                  inputMode="numeric"
                  placeholder="0000 0000 0000 0000"
                  value={numeroCartao}
                  onChange={(e) => setValue("numeroCartao", maskNumeroCartao(e.target.value), { shouldValidate: true })}
                  aria-invalid={!!errors.numeroCartao}
                />
                {errors.numeroCartao && <ErroCampo>{errors.numeroCartao.message}</ErroCampo>}
              </div>

              <div>
                <Input
                  label="Nome impresso no cartão"
                  id="nomeImpresso"
                  placeholder="COMO ESTÁ NO CARTÃO"
                  value={nomeImpresso}
                  onChange={(e) => setValue("nomeImpresso", e.target.value.toUpperCase(), { shouldValidate: true })}
                  aria-invalid={!!errors.nomeImpresso}
                />
                {errors.nomeImpresso && <ErroCampo>{errors.nomeImpresso.message}</ErroCampo>}
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                  <Input
                    label="Validade"
                    id="validade"
                    inputMode="numeric"
                    placeholder="MM/AA"
                    value={validade}
                    onChange={(e) => setValue("validade", maskValidade(e.target.value), { shouldValidate: true })}
                    aria-invalid={!!errors.validade}
                  />
                  {errors.validade && <ErroCampo>{errors.validade.message}</ErroCampo>}
                </div>
                <div className="col-span-1">
                  <Input
                    label="CVV"
                    id="cvv"
                    inputMode="numeric"
                    placeholder="123"
                    maxLength={4}
                    {...register("cvv")}
                    onFocus={() => setFocoCvv(true)}
                    onBlur={() => setFocoCvv(false)}
                    aria-invalid={!!errors.cvv}
                  />
                  {errors.cvv && <ErroCampo>{errors.cvv.message}</ErroCampo>}
                </div>
                <div className="col-span-1">
                  <Select label="Parcelas" id="parcelas" {...register("parcelas")}>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                      <option key={n} value={n}>
                        {n}x {formatarPreco(Math.round(resumo.totalCentavos / n))}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>

              <div className="flex items-center justify-between mt-2">
                <Button type="button" variant="ghost" size="lg" onClick={onVoltar}>
                  Voltar
                </Button>
                <Button type="submit" variant="primary" size="lg">
                  Finalizar pedido ({formatarPreco(resumo.totalCentavos)})
                </Button>
              </div>
            </form>
          </motion.div>
        )}

        {metodoAtual === "pix" && (
          <motion.div
            key="pix"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center gap-4 py-6 border border-border rounded-md"
          >
            <div className="h-40 w-40 rounded-md bg-surface-raised border border-border flex items-center justify-center p-2">
              <span className="font-mono text-caption text-chalk-dim">QR Code Pix Demonstrativo</span>
            </div>
            <p className="text-body-sm text-chalk max-w-sm">
              O pagamento no Pix concede <span className="text-flood font-semibold">5% de desconto</span> sobre os produtos: Total de{" "}
              <span className="font-mono font-bold text-flood">{formatarPreco(resumo.totalCentavos)}</span>
              {resumo.descontoPixCentavos > 0 && (
                <span className="block text-caption text-success font-mono mt-1">
                  Economia de {formatarPreco(resumo.descontoPixCentavos)}
                </span>
              )}
            </p>
            <Button variant="secondary" size="sm" type="button">
              Simular cópia de código Pix
            </Button>
            <div className="flex items-center justify-between w-full mt-2 px-4">
              <Button variant="ghost" size="lg" onClick={onVoltar}>
                Voltar
              </Button>
              <Button variant="primary" size="lg" onClick={() => onAvancar({ metodo: "pix" })}>
                Finalizar pedido demonstrativo
              </Button>
            </div>
          </motion.div>
        )}

        {metodoAtual === "boleto" && (
          <motion.div
            key="boleto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center gap-4 py-6 border border-border rounded-md"
          >
            <div className="h-16 w-full max-w-sm rounded-sm bg-[repeating-linear-gradient(90deg,var(--chalk)_0,var(--chalk)_2px,transparent_2px,transparent_5px)] opacity-80" />
            <p className="text-body-sm text-chalk max-w-sm">
              Boleto simulado com vencimento em 3 dias úteis. Total de{" "}
              <span className="font-mono font-bold text-chalk">{formatarPreco(resumo.totalCentavos)}</span>.
            </p>
            <div className="flex items-center justify-between w-full mt-2 px-4">
              <Button variant="ghost" size="lg" onClick={onVoltar}>
                Voltar
              </Button>
              <Button variant="primary" size="lg" onClick={() => onAvancar({ metodo: "boleto" })}>
                Finalizar pedido demonstrativo
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ErroCampo({ children }: { children?: string }) {
  return (
    <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-caption text-danger -mt-3" role="alert">
      {children}
    </motion.p>
  );
}
