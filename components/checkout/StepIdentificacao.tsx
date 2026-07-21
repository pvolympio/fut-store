"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { identificacaoSchema, IdentificacaoData } from "@/lib/checkout-schemas";

function maskCpf(v: string) {
  return v
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function maskTelefone(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 10) return d.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3").trim().replace(/-$/, "");
  return d.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3").trim().replace(/-$/, "");
}

export function StepIdentificacao({
  valoresIniciais,
  onAvancar,
}: {
  valoresIniciais: Partial<IdentificacaoData>;
  onAvancar: (dados: IdentificacaoData) => void;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IdentificacaoData>({
    resolver: zodResolver(identificacaoSchema),
    defaultValues: valoresIniciais,
    mode: "onBlur",
  });

  return (
    <motion.form
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      onSubmit={handleSubmit(onAvancar)}
      noValidate
      className="flex flex-col gap-5"
    >
      <Input
        label="Nome completo"
        id="nomeCompleto"
        placeholder="Ex: Maria da Silva"
        {...register("nomeCompleto")}
        aria-invalid={!!errors.nomeCompleto}
      />
      {errors.nomeCompleto && <ErroCampo>{errors.nomeCompleto.message}</ErroCampo>}

      <Input
        label="E-mail"
        id="email"
        type="email"
        placeholder="voce@email.com"
        {...register("email")}
        aria-invalid={!!errors.email}
      />
      {errors.email && <ErroCampo>{errors.email.message}</ErroCampo>}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Input
            label="CPF"
            id="cpf"
            inputMode="numeric"
            placeholder="000.000.000-00"
            value={watch("cpf") ?? ""}
            onChange={(e) => setValue("cpf", maskCpf(e.target.value), { shouldValidate: true })}
            aria-invalid={!!errors.cpf}
          />
          {errors.cpf && <ErroCampo>{errors.cpf.message}</ErroCampo>}
        </div>
        <div>
          <Input
            label="Telefone"
            id="telefone"
            inputMode="numeric"
            placeholder="(11) 91234-5678"
            value={watch("telefone") ?? ""}
            onChange={(e) => setValue("telefone", maskTelefone(e.target.value), { shouldValidate: true })}
            aria-invalid={!!errors.telefone}
          />
          {errors.telefone && <ErroCampo>{errors.telefone.message}</ErroCampo>}
        </div>
      </div>

      <Button type="submit" variant="primary" size="lg" className="mt-2 self-end">
        Continuar para entrega
      </Button>
    </motion.form>
  );
}

function ErroCampo({ children }: { children?: string }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-caption text-danger -mt-3"
      role="alert"
    >
      {children}
    </motion.p>
  );
}
