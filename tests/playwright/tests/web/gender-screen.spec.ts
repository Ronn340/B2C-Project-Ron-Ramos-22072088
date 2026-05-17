import { seed } from "@repo/db/seed";
import { expect, test } from "./fixtures";

test.describe("GENDER SCREEN", () => {
  test.beforeAll(async () => {
    await seed();
  });

  test(
    "Existing Gender",
    
    async ({ page }) => {
      await page.goto("/shop?gender=Women");

      // GENDER SCREEN > Displays results based on gender from url (e.g. /gender?gender=Women)

      const articles = await page.locator('[data-test-id^="product-"]');
      await expect(articles).toHaveCount(2);

      await expect(page.getByTestId("product-2")).toBeVisible();
      await expect(
        page.getByText("Navy"),
      ).toBeVisible();

      await expect(page.getByTestId("product-1")).toBeVisible();
      await expect(
        page.getByText("Black"),
      ).toBeVisible();
    },
  );

  test(
    "Invalid Gender",

    async ({ page }) => {
      await page.goto("/shop?gender=Invalid");

      // GENDER SCREEN > Displays "0 Posts" when search does not find anything

      const articles = await page.locator('[data-test-id^="product-"]');
      await expect(articles).toHaveCount(0);

      await expect(page.getByText("0 Products")).toBeVisible();
    },
  );
});