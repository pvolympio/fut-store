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
import { pagamentoSchema, CartaoData, PagamentoData } from "@/lib/checkout-schemas";

type Metodo = "cartao" | "pix" | "boleto";

function maskNumeroCartao(v: string) {
  return v.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ").trim();
}
function maskValidade(v: string) {
  return v.replace(/\D/g, "").slice(0, 4).replace(/(\d{2})(\d)/, "$1/$2");
}

export function StepPagamento({
  totalCentavos,
  onAvancar,
  onVoltar,
}: {
  totalCentavos: number;
  onAvancar: (dados: PagamentoData) => void;
  onVoltar: () => void;
}) {
  const [metodo, setMetodo] = useState<Metodo>("cartao");
  const [focoCvv, setFocoCvv] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CartaoData>({
    resolver: zodResolver(pagamentoSchema) as any,
    defaultValues: { metodo: "cartao", parcelas: 1 },
    mode: "onBlur",
  });

  const numeroCartao = watch("numeroCartao") ?? "";
  const nomeImpresso = watch("nomeImpresso") ?? "";
  const validade = watch("validade") ?? "";
  const cvv = watch("cvv") ?? "";

  const precoPix = Math.round(totalCentavos * 0.95);

  function submeterCartao(dados: CartaoData) {
    onAvancar({ ...dados, metodo: "cartao" });
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="font-mono text-caption uppercase tracking-[0.08em] text-chalk-dim mb-3">
          Forma de pagamento
        </p>
        <div className="grid grid-cols-3 gap-2">
          {(
            [
              { valor: "cartao", label: "Cartão" },
              { valor: "pix", label: "Pix" },
              { valor: "boleto", label: "Boleto" },
            ] as const
          ).map((opcao) => (
            <button
              key={opcao.valor}
              type="button"
              onClick={() => setMetodo(opcao.valor)}
              className={cn(
                "h-11 rounded border font-mono text-caption uppercase tracking-[0.06em] transition-colors duration-snap ease-sprint",
                metodo === opcao.valor
                  ? "border-flood text-flood bg-flood/5"
                  : "border-border text-chalk-dim hover:border-chalk/40"
              )}
            >
              {opcao.label}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {metodo === "cartao" && (
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
                        {n}x {formatarPreco(Math.round(totalCentavos / n))}
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
                  Revisar pedido
                </Button>
              </div>
            </form>
          </motion.div>
        )}

        {metodo === "pix" && (
          <motion.div
            key="pix"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center gap-4 py-6 border border-border rounded-md"
          >
            <div className="h-40 w-40 rounded-md bg-surface-raised border border-border flex items-center justify-center">
              <span className="font-mono text-caption text-chalk-dim">QR Code Pix</span>
            </div>
            <p className="text-body-sm text-chalk max-w-sm">
              Escaneie o código ou use o Pix Copia e Cola. O pagamento à vista no Pix garante{" "}
              <span className="text-flood font-semibold">5% de desconto</span>: total de{" "}
              {formatarPreco(precoPix)}.
            </p>
            <Button variant="secondary" size="sm" type="button">
              Copiar código Pix
            </Button>
            <div className="flex items-center justify-between w-full mt-2">
              <Button variant="ghost" size="lg" onClick={onVoltar}>
                Voltar
              </Button>
              <Button variant="primary" size="lg" onClick={() => onAvancar({ metodo: "pix" })}>
                Revisar pedido
              </Button>
            </div>
          </motion.div>
        )}

        {metodo === "boleto" && (
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
              O boleto vence em 3 dias úteis e pode ser pago em qualquer banco ou app. Total de{" "}
              {formatarPreco(totalCentavos)}.
            </p>
            <div className="flex items-center justify-between w-full mt-2">
              <Button variant="ghost" size="lg" onClick={onVoltar}>
                Voltar
              </Button>
              <Button variant="primary" size="lg" onClick={() => onAvancar({ metodo: "boleto" })}>
                Revisar pedido
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
