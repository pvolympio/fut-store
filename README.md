# Arena Futebol Store ⚽🔥

> **Plataforma E-Commerce Demonstrativa para Mantos de Futebol Oficiais**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-2.1-729b1b?style=flat-square&logo=vitest)](https://vitest.dev/)
[![Status](https://img.shields.io/badge/Status-Demonstração%20de%20Portfólio-amber?style=flat-square)](#-natureza-demonstrativa)

---

## 📸 Banner do Projeto

```
+-------------------------------------------------------------------------+
|                                                                         |
|                          ARENA FUTEBOL STORE                            |
|             [ Espaço reservado para Screenshot / Banner HD ]            |
|                                                                         |
+-------------------------------------------------------------------------+
```

🔗 **Demo Online**: [https://arena-futebol-store.vercel.app](https://arena-futebol-store.vercel.app) *(Link demonstrativo / substitua pela URL de produção)*

---

## ℹ️ Natureza Demonstrativa

> **Esta aplicação é um projeto de demonstração técnica de portfólio.**
> Nenhum pagamento real é processado, nenhuma cobrança é efetuada no seu cartão ou Pix, e nenhum produto físico será enviado. Todos os fluxos de carrinho, cupons, frete, taxas e finalização de pedido são simulados em tempo real no cliente com fins educativos e de apresentação.

---

## 🚀 Principais Funcionalidades

- **Catálogo de Mantos Esportivos**: Navegação completa por 20 clubes brasileiros e principais seleções mundiais.
- **Busca Normalizada e Resiliente**: Pesquisa insensível a acentos, maiúsculas/minúsculas e espaços excedentes em múltiplos atributos (nome, time, apelido, temporada, categoria, país).
- **Filtros e Ordenação Combinados**: Filtragem simultânea por categorias (Titular, Visitante, Retrô, Goleiro), tamanhos, promoções e baixo estoque, integrados com ordenação por menor preço, maior preço e novidades.
- **Adição Rápida Acessível (Quick Add)**: Adição direta para mantos com 1 tamanho disponível, seletor em popover acessível por teclado para múltiplos tamanhos e bloqueio/feedback em itens indisponíveis.
- **Cálculo de Checkout Centralizado**: Função pura (`lib/checkout-calculations.ts`) operando estritamente em centavos inteiros para evitar erros de ponto flutuante. Suporta frete padrão (grátis), frete expresso (R$ 25,00), cupons percentuais e desconto de 5% no Pix.
- **Painel Administrativo Local**: Gerenciador de mantos (`/admin/camisas`) para criação, edição e exclusão de produtos com persistência em dados JSON.
- **Acessibilidade & UX**: Suporte completo a navegação por teclado (Tab, Esc), focus trap em modais/drawers, atributos ARIA semânticos e respeito às preferências de movimento (`prefers-reduced-motion`).

---

## 🛠️ Tecnologias Utilizadas

- **Core**: Next.js 14 (App Router), React 18, TypeScript 5.5.
- **Estilização & UI**: Tailwind CSS 3.4, Framer Motion 11 (animações e micro-interações).
- **Formulários & Validação**: React Hook Form 7, Zod 4.
- **Qualidade & Testes**: Vitest 2.1 (testes unitários), Playwright 1.49 (testes E2E), ESLint, TypeScript (`--noEmit`).

---

## 📂 Estrutura do Projeto

```
futebol-store/
├── app/                        # Rotas e páginas (App Router)
│   ├── admin/camisas/          # Gerenciador de mantos (Admin)
│   ├── api/                    # Rotas da API interna
│   ├── checkout/               # Etapas e confirmação do checkout
│   ├── produtos/               # Catálogo e detalhes do produto
│   ├── sobre/, faq/, contato/  # Páginas institucionais
│   ├── layout.tsx              # Root Layout com SEO e Provider
│   ├── sitemap.ts              # Geração dinâmica do sitemap
│   └── robots.ts               # Diretrizes para indexadores
├── components/                 # Componentes de UI e negócio
│   ├── admin/                  # Formulários e listas administrativas
│   ├── cart/                   # Contexto e Drawer do carrinho
│   ├── checkout/               # Etapas e resumo de pagamento
│   ├── product/                # Cards de produto, Quick Add e Empty States
│   └── ui/                     # Primitivos de interface acessíveis
├── config/                     # Configurações globais (site.ts)
├── hooks/                      # Hooks customizados (useProducts, etc)
├── lib/                        # Funções utilitárias e regras de negócio
│   ├── checkout-calculations.ts # Função pura de cálculos do checkout
│   ├── search.ts               # Normalização textual Unicode (NFD)
│   └── filtros.ts              # Filtros e ordenação do catálogo
├── mock/                       # Dados base e modelos de entidades
├── schemas/                    # Schemas Zod de validação
└── tests/                      # Suíte de testes unitários e E2E
```

---

## 📐 Decisões de Arquitetura

1. **Cálculos de Checkout Baseados em Centavos**: Para garantir precisão absoluta e evitar discrepâncias comuns do IEEE 754 em Javascript, todos os valores financeiros são manipulados em centavos (inteiros) e convertidos para BRL apenas na camada de apresentação.
2. **Centralização da Regra de Negócio**: `calcularResumoCheckout` centraliza as regras de subtotal, cupom, frete e Pix. O carrinho, a barra lateral, a página de pagamento e a confirmação consomem essa mesma função pura.
3. **Persistência Híbrida**: O carrinho utiliza `localStorage` para manter o estado do visitante entre sessões, enquanto a API de administração lê e escreve no repositório de dados JSON.

---

## 🎨 Decisões de UX & Design

- **Preservação do Design System Existente**: Manutenção rigorosa das paletas de cores tailwind tailormade, gradientes, tipografia (Big Shoulders Display e IBM Plex Mono) e estilo visual marcante da marca.
- **Feedback Constante ao Usuário**: Toasts acessíveis, avisos de indisponibilidade, confirmações visuais e alertas claros sobre o caráter demonstrativo em todas as fases críticas do funil de conversão.

---

## 💻 Instruções para Instalação e Execução

### Pré-requisitos
- **Node.js**: v18.0.0 ou superior
- **npm**: v9.0.0 ou superior

### Passos
```bash
# 1. Clonar o repositório
git clone https://github.com/usuario/arena-futebol-store.git

# 2. Acessar a pasta do projeto
cd arena-futebol-store

# 3. Instalar as dependências
npm install

# 4. Copiar as variáveis de ambiente
cp .env.example .env.local

# 5. Iniciar o servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

---

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes chaves:

```env
# URL base pública da aplicação para SEO e Open Graph
NEXT_PUBLIC_SITE_URL=https://arena-futebol-store.vercel.app
```

---

## 📜 Scripts Disponíveis

| Comando | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia o servidor local de desenvolvimento na porta 3000 |
| `npm run build` | Compila o projeto para produção |
| `npm run start` | Executa o servidor de produção compilado |
| `npm run lint` | Executa a verificação do ESLint |
| `npm run typecheck` | Executa a checagem de tipos estritos do TypeScript |
| `npm run test` | Executa a suíte de testes unitários com Vitest |
| `npm run test:watch` | Modo watch para desenvolvimento com Vitest |
| `npm run test:e2e` | Executa os testes de ponta a ponta com Playwright |

---

## ⚠️ Limitações Intencionais da Demonstração

- **Sem Gateways Reais de Pagamento**: Integrações com Stripe, Mercado Pago ou PagSeguro não foram habilitadas para evitar cobranças acidentais.
- **Persistência Local**: O gerenciamento de produtos salva alterações em um arquivo JSON local, ideal para testes sem necessidade de banco de dados SQL/NoSQL externo.

---

## 🔮 Melhorias Futuras

- [ ] Integração com serviço real de busca CEP (ViaCEP / BrasilAPI).
- [ ] Autenticação de administradores com OAuth 2.0 / NextAuth.
- [ ] Exportação de relatórios de vendas simuladas em PDF/CSV.

---

## 💡 Principais Desafios e Aprendizados

- **Consistência em Cálculos Financeiros**: Garantir que o valor exibido no momento de selecionar o Pix ou o frete expresso batesse exatamente com o valor final confirmado na tela de obrigado, sem diferenças de arredondamento.
- **Normalização Textual**: Implementar busca tolerante a acentos e cedilhas sem depender de bibliotecas externas pesadas, utilizando `normalize('NFD')`.

---

## 👨‍💻 Autor & Contato

**Desenvolvedor Full Stack**
- **GitHub**: [github.com/seu-usuario](https://github.com) *(Placeholder)*
- **LinkedIn**: [linkedin.com/in/seu-perfil](https://linkedin.com) *(Placeholder)*
- **Portfólio**: [portfolio-demonstrativo.dev](https://portfolio-demonstrativo.dev) *(Placeholder)*

---

*Projeto desenvolvido para fins de demonstração de portfólio profissional.*
