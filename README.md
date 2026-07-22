# FUTREP ⚽⚡

> **E-commerce demonstrativo de camisas de futebol — projeto de portfólio.**

[![Quality](https://github.com/pvolympio/fut-store/actions/workflows/quality.yml/badge.svg)](https://github.com/pvolympio/fut-store/actions/workflows/quality.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)

---

## 📸 Screenshots

<!-- Adicione capturas de tela após o deploy. Salve-as em docs/screenshots/ e referencie aqui. -->

```
docs/
└── screenshots/
    ├── home.png
    ├── catalogo.png
    ├── produto.png
    ├── checkout.png
    └── confirmacao.png
```

Exemplo de uso após adicionar os arquivos:

```md
![Página Inicial](docs/screenshots/home.png)
![Catálogo](docs/screenshots/catalogo.png)
```

<!-- Adicione aqui a URL do deploy após a publicação -->
<!-- 🔗 **Demo Online**: https://seu-deploy.vercel.app -->

---

## ℹ️ Natureza Demonstrativa

> **Esta aplicação é um projeto de demonstração técnica de portfólio.**
> Nenhum pagamento real é processado, nenhuma cobrança é efetuada, e nenhum produto físico será enviado. Todos os fluxos de carrinho, cupons, frete, taxas e finalização de pedido são simulados em tempo real no cliente com fins educativos e de apresentação.

---

## 🚀 Principais Funcionalidades

- **Catálogo de Mantos Esportivos**: Navegação por clubes brasileiros e seleções internacionais.
- **Busca Normalizada**: Pesquisa insensível a acentos e maiúsculas/minúsculas em nome, time, temporada, categoria e país.
- **Filtros e Ordenação**: Filtragem por categorias, tamanhos, promoções e baixo estoque, com ordenação por preço e novidades.
- **Adição Rápida (Quick Add)**: Adição direta para mantos com 1 tamanho e seletor acessível por teclado para múltiplos tamanhos.
- **Checkout Simulado**: Função pura (`lib/checkout-calculations.ts`) em centavos inteiros com frete padrão (grátis), frete expresso (R$ 25,00), cupons e desconto Pix (5%).
- **Painel Administrativo Local**: Gerenciador de mantos (`/admin/camisas`) com persistência em JSON local.
- **Acessibilidade**: Navegação por teclado, atributos ARIA, focus trap, `prefers-reduced-motion`.
- **Páginas Institucionais**: Sobre, FAQ, Guia de Tamanhos, Contato, Trocas e Privacidade.

---

## 🛠️ Tecnologias

| Categoria | Tecnologia |
|:---|:---|
| Core | Next.js 14 (App Router), React 18, TypeScript 5.5 |
| Estilização | Tailwind CSS 3.4, Framer Motion 11 |
| Formulários | React Hook Form 7, Zod 4 |
| Testes | Vitest 2.1 (unitários), Playwright 1.49 (E2E) |
| Qualidade | ESLint, TypeScript strict |

---

## 📂 Estrutura do Projeto

```
fut-store/
├── app/                        # Rotas e páginas (App Router)
│   ├── admin/camisas/          # Gerenciador de mantos
│   ├── api/                    # API interna
│   ├── checkout/               # Etapas do checkout simulado
│   ├── produtos/               # Catálogo e detalhes
│   ├── sobre/, faq/, contato/  # Páginas institucionais
│   ├── layout.tsx              # Root Layout
│   ├── sitemap.ts              # Sitemap dinâmico
│   └── robots.ts               # Configuração de indexação
├── components/                 # Componentes de UI e negócio
│   ├── admin/                  # Formulários administrativos
│   ├── cart/                   # Contexto e Drawer do carrinho
│   ├── checkout/               # Etapas de pagamento
│   ├── product/                # Cards, Quick Add, Empty States
│   └── ui/                     # Primitivos de interface
├── config/                     # Configurações globais
├── hooks/                      # Hooks customizados
├── lib/                        # Funções utilitárias e regras de negócio
├── mock/                       # Dados mockados
├── schemas/                    # Schemas Zod
└── tests/                      # Testes unitários e E2E
```

---

## 💻 Instalação e Execução

### Pré-requisitos
- **Node.js**: v18.0.0 ou superior
- **npm**: v9.0.0 ou superior

### Passos

```bash
# 1. Clonar o repositório
git clone https://github.com/pvolympio/fut-store.git

# 2. Acessar a pasta do projeto
cd fut-store

# 3. Instalar as dependências
npm install

# 4. Copiar as variáveis de ambiente
cp .env.example .env.local

# 5. Iniciar o servidor de desenvolvimento
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

---

## ⚙️ Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# URL base pública da aplicação (SEO, Open Graph, sitemap)
NEXT_PUBLIC_SITE_URL=https://arena-futebol-store.vercel.app
```

---

## 📜 Scripts Disponíveis

| Comando | Descrição |
|:---|:---|
| `npm run dev` | Servidor de desenvolvimento (porta 3000) |
| `npm run build` | Build de produção |
| `npm run start` | Servidor de produção |
| `npm run lint` | Verificação ESLint |
| `npm run typecheck` | Checagem de tipos (TypeScript strict) |
| `npm run test` | Testes unitários (Vitest) |
| `npm run test:watch` | Testes unitários em modo watch |
| `npm run test:e2e` | Testes E2E (Playwright) |

---

## 📐 Decisões de Arquitetura

1. **Cálculos em Centavos**: Todos os valores financeiros são inteiros (centavos) para evitar erros de ponto flutuante IEEE 754. Conversão para BRL apenas na apresentação.
2. **Regra de Negócio Centralizada**: `calcularResumoCheckout` é a única fonte de verdade para subtotal, cupom, frete e Pix.
3. **Persistência Local**: Carrinho em `localStorage`, produtos em JSON local.

---

## ⚠️ Limitações Intencionais

- **Sem gateways de pagamento reais**: Nenhuma integração com Stripe, Mercado Pago ou PagSeguro.
- **Sem banco de dados**: Persistência via arquivos JSON locais.
- **Sem autenticação**: O painel administrativo é aberto para fins de demonstração.
- **Newsletter simulada**: O formulário não envia e-mails reais.

---

## 🔮 Melhorias Futuras

- [ ] Integração com serviço real de busca de CEP (ViaCEP / BrasilAPI).
- [ ] Autenticação de administradores com NextAuth.
- [ ] Deploy automatizado com preview por PR.

---

## 👨‍💻 Autor

**Paulo Victor Olympio**
- **GitHub**: [github.com/pvolympio](https://github.com/pvolympio)

---

*Projeto desenvolvido para fins de demonstração de portfólio profissional.*
