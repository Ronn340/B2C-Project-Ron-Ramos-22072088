import { expect, test } from "./fixtures";

test.describe("TYPE SCREEN", () => {
  test(
    "Type filter returns correct results",

    async ({ page }) => {
      await page.goto("/shop?type=T-Shirt");

      // TYPE SCREEN > Displays products with the type url (e.g. /shop?type=T-Shirt)

      const articles = await page.locator('[data-test-id^="product-"]');
      await expect(articles).toHaveCount(2);

      await expect(page.getByTestId("product-5")).toBeVisible();
      await expect(page.getByText("White")).toBeVisible();
      await expect(page.getByTestId("product-6")).toBeVisible();
      await expect(page.getByText("Black")).toBeVisible();
    },
  );

  test(
    "Invalid Type returns no results",
    {
      tag: "@a1",
    },
    async ({ page }) => {
      await page.goto("/shop?type=InvalidType");

      const articles = await page.locator('[data-test-id^="product-"]');
      await expect(articles).toHaveCount(0);

      await expect(page.getByText("0 Products")).toBeVisible();
    },
  );
});