import { seed } from "@repo/db/seed";
import { expect, test } from "./fixtures";

test.describe("DETAIL SCREEN", () => {
    test.beforeEach(async () => {
        await seed();
    });

    test(
        "Render all product details",

        async ({ page }) => {
            await page.goto("/item/black-long-coat");

            // DETAIL SCREEN > Display product name, description, sizes, price, and photos

            const item = await page.getByTestId("product-1");
            await expect(item).toBeVisible();

            await expect(item.getByText("Black Long Coat")).toBeVisible();

            await expect(item.getByText("Jacket | Women")).toBeVisible();
            await expect(item.getByText("$89.99")).toBeVisible();
            await expect(item.getByText("A sleek, tailored long coat in classic black. Structured silhouette with notched lapels and a belted waist for a polished, put-together look.")).toBeVisible();
            await expect(item.getByTestId("size-button-S")).toBeVisible();
            await expect(item.getByTestId("size-button-M")).toBeVisible();
            await expect(item.getByTestId("size-button-L")).toBeVisible();
        },
    );

    test(
        "Add to cart disabled when no size selected",

        async ({ page }) => {

            await page.goto("/item/black-long-coat");
            
            // DETAIL SCREEN > "Add to cart" button is disabled until a size is selected
            await expect(page.getByTestId("add-to-cart-button")).toBeDisabled();
            await page.getByTestId("size-button-M").click();
            await expect(page.getByTestId("add-to-cart-button")).toBeEnabled();
        },
    );
});
