"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { entregaSchema, EntregaData } from "@/lib/checkout-schemas";

function maskCep(v: string) {
  return v.replace(/\D/g, "").slice(0, 8).replace(/(\d{5})(\d)/, "$1-$2");
}

export function StepEntrega({
  valoresIniciais,
  onAvancar,
  onVoltar,
}: {
  valoresIniciais: Partial<EntregaData>;
  onAvancar: (dados: EntregaData) => void;
  onVoltar: () => void;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EntregaData>({
    resolver: zodResolver(entregaSchema),
    defaultValues: { metodoEntrega: "padrao", ...valoresIniciais },
    mode: "onBlur",
  });

  const metodoEntrega = watch("metodoEntrega");

  return (
    <motion.form
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      onSubmit={handleSubmit(onAvancar)}
      noValidate
      className="flex flex-col gap-5"
    >
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Input
            label="CEP"
            id="cep"
            inputMode="numeric"
            placeholder="00000-000"
            value={watch("cep") ?? ""}
            onChange={(e) => setValue("cep", maskCep(e.target.value), { shouldValidate: true })}
            aria-invalid={!!errors.cep}
          />
          {errors.cep && <ErroCampo>{errors.cep.message}</ErroCampo>}
        </div>
        <div>
          <Input label="Número" id="numero" placeholder="123" {...register("numero")} aria-invalid={!!errors.numero} />
          {errors.numero && <ErroCampo>{errors.numero.message}</ErroCampo>}
        </div>
      </div>

      <div>
        <Input label="Endereço" id="endereco" placeholder="Rua, avenida..." {...register("endereco")} aria-invalid={!!errors.endereco} />
        {errors.endereco && <ErroCampo>{errors.endereco.message}</ErroCampo>}
      </div>

      <Input label="Complemento (opcional)" id="complemento" placeholder="Apto, bloco..." {...register("complemento")} />

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Input label="Bairro" id="bairro" {...register("bairro")} aria-invalid={!!errors.bairro} />
          {errors.bairro && <ErroCampo>{errors.bairro.message}</ErroCampo>}
        </div>
        <div>
          <Input label="Cidade" id="cidade" {...register("cidade")} aria-invalid={!!errors.cidade} />
          {errors.cidade && <ErroCampo>{errors.cidade.message}</ErroCampo>}
        </div>
      </div>

      <div className="w-32">
        <Input
          label="UF"
          id="estado"
          maxLength={2}
          placeholder="SP"
          value={watch("estado") ?? ""}
          onChange={(e) => setValue("estado", e.target.value.toUpperCase(), { shouldValidate: true })}
          aria-invalid={!!errors.estado}
        />
        {errors.estado && <ErroCampo>{errors.estado.message}</ErroCampo>}
      </div>

      <div>
        <p className="font-mono text-caption uppercase tracking-[0.08em] text-chalk-dim mb-3">
          Método de entrega
        </p>
        <div className="grid grid-cols-2 gap-3">
          {(
            [
              { valor: "padrao", titulo: "Padrão", prazo: "5 a 8 dias úteis", preco: "Grátis" },
              { valor: "expressa", titulo: "Expressa", prazo: "1 a 2 dias úteis", preco: "R$ 29,90" },
            ] as const
          ).map((opcao) => {
            const ativo = metodoEntrega === opcao.valor;
            return (
              <button
                type="button"
                key={opcao.valor}
                onClick={() => setValue("metodoEntrega", opcao.valor, { shouldValidate: true })}
                className={cn(
                  "text-left rounded-md border p-4 transition-colors duration-snap ease-sprint",
                  ativo ? "border-flood bg-flood/5" : "border-border hover:border-chalk/40"
                )}
              >
                <p className="text-body-sm text-chalk font-semibold">{opcao.titulo}</p>
                <p className="text-caption text-chalk-dim">{opcao.prazo}</p>
                <p className="font-mono text-caption text-flood mt-1">{opcao.preco}</p>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between mt-2">
        <Button type="button" variant="ghost" size="lg" onClick={onVoltar}>
          Voltar
        </Button>
        <Button type="submit" variant="primary" size="lg">
          Continuar para pagamento
        </Button>
      </div>
    </motion.form>
  );
}

function ErroCampo({ children }: { children?: string }) {
  return (
    <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-caption text-danger -mt-3" role="alert">
      {children}
    </motion.p>
  );
}
