import { expect, test } from "./fixtures";

test.describe("SEARCH SCREEN", () => {
  test(
    "Existing search result",

    async ({ page }) => {
      await page.goto("/shop?urlId=vest");

      // SEARCH SCREEN > Displays results based on search string stored in the query string (e.g. /search?q=Chino)

      const articles = await page.locator('[data-test-id^="product-"]');
      await expect(articles).toHaveCount(1);

      await expect(page.getByTestId("product-7")).toBeVisible();
      await expect(
        page.getByText("Lightweight Puffer Vest"),
      ).toBeVisible();
    },
  );

  test(
    "Search finds multiple posts",

    async ({ page }) => {
      await page.goto("/shop?urlId=jacket");

      // SEARCH SCREEN > Displays results based on search string stored in the query string (e.g. /search?q=Fat)

      const articles = await page.locator('[data-test-id^="product-"]');
      await expect(articles).toHaveCount(2);

        await expect(page.getByTestId("product-1")).toBeVisible();
        await expect(
          page.getByText("Black"),
        ).toBeVisible();

        await expect(page.getByTestId("product-2")).toBeVisible();
        await expect(
          page.getByText("Navy"),
        ).toBeVisible();
      },
    );

  test(
    "Invalid Search",

    async ({ page }) => {
      await page.goto("/shop?urlId=abc");

      // SEARCH SCREEN > Displays "0 Posts" when search does not find anything

      const articles = await page.locator('[data-test-id^="product-"]');
      await expect(articles).toHaveCount(0);

      await expect(page.getByText("0 Products")).toBeVisible();
    },
  );
});
