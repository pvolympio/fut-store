import { test, expect } from "@playwright/test";

test.describe("Fluxo de Compra Demonstrativo", () => {
  test("Navegar pelo catálogo, filtrar, abrir produto, adicionar à sacola e simular checkout", async ({ page }) => {
    // 1. Acessa a página de produtos
    await page.goto("/produtos");
    await expect(page).toHaveTitle(/Arena/i);

    // 2. Realiza busca por "Fluminense"
    const inputBusca = page.locator('input[placeholder*="Buscar"]');
    if (await inputBusca.isVisible()) {
      await inputBusca.fill("Fluminense");
      await page.keyboard.press("Enter");
    }

    // 3. Clica no primeiro card de produto
    const primeiroCard = page.locator('a[href^="/produtos/"]').first();
    await expect(primeiroCard).toBeVisible();
    await primeiroCard.click();

    // 4. Verifica se carregou a página de produto e seleciona tamanho
    await expect(page.locator("h1")).toBeVisible();
    const botaoTamanho = page.locator("button:has-text('M'), button:has-text('G')").first();
    if (await botaoTamanho.isVisible()) {
      await botaoTamanho.click();
    }

    // 5. Adiciona ao carrinho
    const botaoAdicionar = page.locator("button:has-text('Adicionar'), button:has-text('Sacola')").first();
    if (await botaoAdicionar.isVisible()) {
      await botaoAdicionar.click();
    }

    // 6. Abre checkout
    const botaoCheckout = page.locator("a[href='/checkout'], button:has-text('Checkout')").first();
    if (await botaoCheckout.isVisible()) {
      await botaoCheckout.click();
      await page.waitForURL("**/checkout");
      await expect(page.locator("text=Modo Demonstrativo")).toBeVisible();
    }
  });
});
