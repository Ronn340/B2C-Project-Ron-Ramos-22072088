import { seed } from "@repo/db/seed";
import { expect, test } from "./fixtures";

test.describe("FILTER COMBINATION", () => {
    test.beforeAll(async () => {
        await seed();
    });

    test(
        "Multiple Filters",
        async ({ page }) => {
            await page.goto("/");
            // FILTER COMBINATION > Applying multiple filters together click one by one
            //(1)
            await page.getByRole("button", { name: "Women", exact: true }).click();
            await expect(page).toHaveURL(new RegExp(`gender=Women`));
            const articles = await page.locator('[data-test-id^="product-"]');
            await expect(articles).toHaveCount(2);

            //(2)
            await page.getByTestId("sort-select").selectOption("Price Ascending");
            await expect(page).toHaveURL(new RegExp(`gender=Women&sort=Price.Ascending`));
            const articles_2 = await page.locator('[data-test-id^="product-"]');
            await expect(articles_2).toHaveCount(2);
            await expect(articles_2.first()).toHaveAttribute("data-test-id", "product-2");

            //(3)
            await page.getByTestId("type-select").selectOption("T-Shirt");
            await expect(page).toHaveURL(new RegExp(`gender=Women&sort=Price.Ascending&type=T-Shirt`));
            const articles_3 = await page.locator('[data-test-id^="product-"]');
            await expect(articles_3).toHaveCount(0);
            await expect(page.getByText("0 Products")).toBeVisible();
        },
    );
});
