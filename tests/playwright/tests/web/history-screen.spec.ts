import { expect, test } from "./fixtures";

test.describe("SORTING SCREEN", () => {
    test(
        "ALPHABETICAL SORTING",

        async ({ page }) => {
            await page.goto("/shop?sort=Name+Ascending");

            // SORTING SCREEN > A-Z sorting
            const articles = await page.locator('[data-test-id^="product-"]');
            await expect(articles).toHaveCount(7);

            const articleFirst = await page.locator('[data-test-id^="product-"]').first();
            await expect(articleFirst).toBeVisible();
            await expect(articleFirst).toHaveAttribute("data-test-id", "product-1");

            const articleLast = await page.locator('[data-test-id^="product-"]').last();
            await expect(articleLast).toBeVisible();
            await expect(articleLast).toHaveAttribute("data-test-id", "product-4");
        },
    );

    test(
        "BEST REVIEW SORTING",

        async ({ page }) => {
            await page.goto("/shop?sort=Best+Reviews");

            // SORTING SCREEN > Best Reviews sorting

            const articles = await page.locator('[data-test-id^="product-"]');
            await expect(articles).toHaveCount(7);

            const articleFirst = await page.locator('[data-test-id^="product-"]').first();
            await expect(articleFirst).toBeVisible();
            await expect(articleFirst).toHaveAttribute("data-test-id", "product-2");

            const articleLast = await page.locator('[data-test-id^="product-"]').last();
            await expect(articleLast).toBeVisible();
            await expect(articleLast).toHaveAttribute("data-test-id", "product-6");

            await expect(articleFirst.getByText("4.7")).toBeVisible();
            await expect(articleLast.getByText("4.3")).toBeVisible();
        }
    );
});