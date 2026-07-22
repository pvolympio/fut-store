import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export default function GuiaDeTamanhosPage() {
  const medidas = [
    { tamanho: "PP", largura: "46 - 48 cm", comprimento: "68 - 70 cm", torax: "90 - 95 cm" },
    { tamanho: "P", largura: "49 - 51 cm", comprimento: "71 - 73 cm", torax: "96 - 101 cm" },
    { tamanho: "M", largura: "52 - 54 cm", comprimento: "74 - 76 cm", torax: "102 - 107 cm" },
    { tamanho: "G", largura: "55 - 57 cm", comprimento: "77 - 79 cm", torax: "108 - 113 cm" },
    { tamanho: "GG", largura: "58 - 60 cm", comprimento: "80 - 82 cm", torax: "114 - 119 cm" },
    { tamanho: "XG", largura: "61 - 64 cm", comprimento: "83 - 85 cm", torax: "120 - 126 cm" },
  ];

  return (
    <Section spacing="lg">
      <Container className="max-w-3xl flex flex-col gap-8">
        <div>
          <span className="font-mono text-eyebrow uppercase text-flood mb-2 block">
            Tabela de Medidas
          </span>
          <h1 className="font-display font-bold uppercase text-display-lg text-chalk">
            Guia de Tamanhos de Mantos
          </h1>
          <p className="text-body text-chalk-dim mt-2">
            Consulte a tabela abaixo para encontrar o caimento ideal antes de fazer o pedido demonstrativo.
          </p>
        </div>

        <div className="overflow-x-auto border border-border rounded-md bg-surface">
          <table className="w-full text-left font-mono text-body-sm">
            <thead className="bg-surface-raised border-b border-border uppercase text-caption text-chalk-dim">
              <tr>
                <th className="p-4">Tamanho</th>
                <th className="p-4">Largura (A)</th>
                <th className="p-4">Comprimento (B)</th>
                <th className="p-4">Tórax Recomendado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-chalk">
              {medidas.map((m) => (
                <tr key={m.tamanho} className="hover:bg-surface-raised/50 transition-colors">
                  <td className="p-4 font-bold text-flood">{m.tamanho}</td>
                  <td className="p-4">{m.largura}</td>
                  <td className="p-4">{m.comprimento}</td>
                  <td className="p-4 text-chalk-dim">{m.torax}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-md bg-flood/5 border border-flood/30 p-5 text-caption text-chalk-dim leading-relaxed">
          💡 <strong className="text-chalk">Dica de Caimento:</strong> Mantos com caimento de jogador (Player Version) costumam ser levemente mais ajustados ao corpo. Em caso de dúvida, recomendamos optar por um tamanho maior.
        </div>
      </Container>
    </Section>
  );
}
