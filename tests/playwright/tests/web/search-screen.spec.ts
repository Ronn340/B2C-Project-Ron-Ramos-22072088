import { expect, test } from "./fixtures";

test.describe("SEARCH SCREEN", () => {
  test(
    "Search finds correctly one post",

    async ({ page }) => {
      await page.goto("/shop?urlId=cargo");

      // SEARCH SCREEN > Displays results based on search string stored in the query string (e.g. /search?q=Chino)

      const articles = await page.locator('[data-test-id^="product-"]');
      await expect(articles).toHaveCount(1);

      await expect(page.getByTestId("product-3")).toBeVisible();
      await expect(
        page.getByText("Tech Cargo Pants"),
      ).toBeVisible();
    },
  );

  test(
    "Search finds correctly multiple posts",

    async ({ page }) => {
      await page.goto("/shop?urlId=cotton");

      // SEARCH SCREEN > Displays results based on search string stored in the query string (e.g. /search?q=Fat)

      const articles = await page.locator('[data-test-id^="product-"]');
      await expect(articles).toHaveCount(3);

        await expect(page.getByTestId("product-2")).toBeVisible();
        await expect(
          page.getByText("Gray"),
        ).toBeVisible();

        await expect(page.getByTestId("product-4")).toBeVisible();
        await expect(
          page.getByText("Black"),
        ).toBeVisible();
      },
    );

  test(
    "Invalid Search returns no results",

    async ({ page }) => {
      await page.goto("/shop?urlId=abc");

      // SEARCH SCREEN > Displays "No items found" when search does not find anything

      const articles = await page.locator('[data-test-id^="product-"]');
      await expect(articles).toHaveCount(0);

      await expect(page.getByText("No items found")).toBeVisible();
    },
  );
});
