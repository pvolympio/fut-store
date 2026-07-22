import { test, expect } from "@playwright/test";

test.describe("Fluxo de Compra Demonstrativo Completo", () => {
  test("Catálogo → Produto → Carrinho → Checkout com Frete Expresso e Pix → Confirmação", async ({ page }) => {
    // 1. Abrir o catálogo de produtos
    await page.goto("/produtos");
    await expect(page).toHaveTitle(/FUTREP/i);

    // 2. Pesquisar um produto existente ("Fluminense")
    const inputBusca = page.getByPlaceholder(/buscar/i);
    await expect(inputBusca).toBeVisible();
    await inputBusca.fill("Fluminense");
    await inputBusca.press("Enter");

    // 3. Abrir a página do produto — deve ter resultados visíveis
    const linkProduto = page.locator('a[href^="/produtos/"]').first();
    await expect(linkProduto).toBeVisible();
    await linkProduto.click();

    // 4. Verificar que a página de produto carregou com título visível
    const tituloProduto = page.locator("h1");
    await expect(tituloProduto).toBeVisible();
    const nomeProduto = await tituloProduto.textContent();
    expect(nomeProduto).toBeTruthy();

    // 5. Escolher um tamanho disponível (M)
    const botaoTamanhoM = page.getByRole("button", { name: "M" });
    await expect(botaoTamanhoM).toBeVisible();
    await botaoTamanhoM.click();

    // 6. Adicionar ao carrinho
    const botaoAdicionarSacola = page.getByRole("button", { name: /adicionar à sacola/i });
    await expect(botaoAdicionarSacola).toBeVisible();
    await botaoAdicionarSacola.click();

    // 7. Verificar que o drawer do carrinho foi aberto ou feedback foi dado
    // Esperar o botão de ir ao checkout ficar disponível (no drawer ou na página)
    const botaoIrCheckout = page.getByRole("link", { name: /checkout|finalizar/i });
    await expect(botaoIrCheckout).toBeVisible();
    await botaoIrCheckout.click();

    // 8. Verificar que estamos na página de checkout
    await page.waitForURL("**/checkout");
    await expect(page.getByText(/identificação|seus dados/i).first()).toBeVisible();

    // 9. Preencher dados de identificação
    await page.getByLabel(/nome completo/i).fill("Fulano de Teste");
    await page.getByLabel(/e-mail/i).fill("teste@teste.com");
    await page.getByLabel(/cpf/i).fill("123.456.789-09");
    await page.getByLabel(/telefone/i).fill("(11) 91234-5678");

    // Avançar para entrega
    const botaoAvancarIdentificacao = page.getByRole("button", { name: /avançar|próximo|continuar/i });
    await expect(botaoAvancarIdentificacao).toBeVisible();
    await botaoAvancarIdentificacao.click();

    // 10. Etapa de Entrega: preencher endereço
    await expect(page.getByLabel(/cep/i)).toBeVisible();
    await page.getByLabel(/cep/i).fill("01001-000");
    await page.getByLabel(/endereço/i).fill("Rua Demonstrativa");
    await page.getByLabel(/número/i).fill("100");
    await page.getByLabel(/bairro/i).fill("Centro");
    await page.getByLabel(/cidade/i).fill("São Paulo");
    await page.getByLabel(/estado|uf/i).fill("SP");

    // 11. Selecionar frete expresso
    const radioExpresso = page.getByRole("radio", { name: /express/i });
    await expect(radioExpresso).toBeVisible();
    await radioExpresso.click();

    // Avançar para pagamento
    const botaoAvancarEntrega = page.getByRole("button", { name: /avançar|próximo|continuar/i });
    await expect(botaoAvancarEntrega).toBeVisible();
    await botaoAvancarEntrega.click();

    // 12. Etapa de Pagamento: verificar que estamos no pagamento
    await expect(page.getByText(/forma de pagamento/i)).toBeVisible();

    // 13. Validar que o frete expresso aparece no resumo lateral
    const resumoLateral = page.locator("aside");
    await expect(resumoLateral.getByText(/frete/i)).toBeVisible();
    await expect(resumoLateral.getByText("R$")).toBeVisible();

    // 14. Selecionar Pix como método de pagamento
    const radioPix = page.getByRole("radio", { name: /pix/i });
    await expect(radioPix).toBeVisible();
    await radioPix.click();

    // 15. Validar que o desconto Pix aparece no resumo lateral
    await expect(resumoLateral.getByText(/desconto pix/i)).toBeVisible();

    // 16. Capturar o valor total exibido no resumo do checkout
    const textoTotalCheckout = await resumoLateral
      .locator("text=Total")
      .locator("..")
      .locator(".font-mono.text-flood")
      .textContent();
    expect(textoTotalCheckout).toBeTruthy();

    // 17. Finalizar pedido demonstrativo via Pix
    const botaoFinalizar = page.getByRole("button", { name: /finalizar pedido/i });
    await expect(botaoFinalizar).toBeVisible();
    await botaoFinalizar.click();

    // 18. Verificar tela de confirmação
    await expect(page.getByText(/pedido demonstrativo confirmado/i)).toBeVisible();

    // 19. Confirmar que o total na confirmação corresponde ao total do checkout
    const textoTotalConfirmacao = await page
      .locator("text=Total Confirmado")
      .locator("..")
      .locator(".font-mono.text-flood")
      .textContent();
    expect(textoTotalConfirmacao).toBeTruthy();
    expect(textoTotalConfirmacao).toBe(textoTotalCheckout);

    // 20. Confirmar que a mensagem de nenhum pagamento real aparece
    await expect(
      page.getByText(/nenhum pagamento real/i)
    ).toBeVisible();
  });
});
