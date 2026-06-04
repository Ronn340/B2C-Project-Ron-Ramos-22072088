import { seed } from "@repo/db/seed";
import { expect, test } from "./fixtures";

test.describe("GENDER SCREEN", () => {
  test.beforeAll(async () => {
    await seed();
  });

  test(
    "Gender filter returns correct results",
    
    async ({ page }) => {
      await page.goto("/shop?gender=Women");

      // GENDER SCREEN > Displays results based on gender from url (e.g. /gender?gender=Women)

      const articles = await page.locator('[data-test-id^="product-"]');
      await expect(articles).toHaveCount(3);

      await expect(page.getByTestId("product-2")).toBeVisible();
      await expect(
        page.getByText("Gray"),
      ).toBeVisible();

    },
  );

  test(
    "Invalid Gender returns no results",

    async ({ page }) => {
      await page.goto("/shop?gender=Invalid");

      // GENDER SCREEN > Displays "No items found" when search does not find anything

      const articles = await page.locator('[data-test-id^="product-"]');
      await expect(articles).toHaveCount(0);

      await expect(page.getByText("No items found")).toBeVisible();
    },
  );
});