import { seed } from "@repo/db/seed";
import { expect, test } from "./fixtures";

test.describe("DETAIL SCREEN", () => {
    test.beforeEach(async () => {
        await seed();
    });

    test(
        "Detail view",

        async ({ page }) => {
            await page.goto("/item/fleece-jacket-black");

            // DETAIL SCREEN > Display product name, description, sizes, price, and photos

            const item = await page.getByTestId("product-1");
            await expect(item).toBeVisible();

            await expect(item.getByText("Fluffy Fleece Jacket")).toBeVisible();

            await expect(item.getByText("Jacket | Women")).toBeVisible();
            await expect(item.getByText("$89.99")).toBeVisible();
            await expect(item.getByText("A warm, lightweight fleece jacket perfect for layering. Soft brushed interior with a relaxed fit and zip-up front.")).toBeVisible();
            await expect(item.getByTestId("size-button-XS")).toBeVisible();
            await expect(item.getByTestId("size-button-S")).toBeVisible();
            await expect(item.getByTestId("size-button-M")).toBeVisible();
            await expect(item.getByTestId("size-button-L")).toBeVisible();
            await expect(item.getByTestId("size-button-XL")).toBeVisible();
        },
    );

    test(
        "Add to cart disabled",

        async ({ page }) => {

            await page.goto("/item/fleece-jacket-black");
            
            // DETAIL SCREEN > "Add to cart" button is disabled until a size is selected
            await expect(page.getByTestId("add-to-cart-button")).toBeDisabled();
            
            await page.getByTestId("size-button-M").click();
            await expect(page.getByTestId("add-to-cart-button")).toBeEnabled();
        },
    );
});
