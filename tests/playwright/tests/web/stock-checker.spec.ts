import { test, expect } from "@playwright/test";
import { seed } from "@repo/db/seed";

test.describe("STOCK CHECKER", () => {
    test.beforeEach(async () => {
        await seed();
    });

    test("Display stock levels for each size on product detail page", async ({ page }) => {
        await page.goto("/item/cotton-sweater-gray");
        await expect(page.getByTestId("size-button-XS")).toBeVisible();
        await expect(page.getByTestId("size-button-S")).toBeVisible();
        await expect(page.getByTestId("size-button-M")).toBeVisible();
        await expect(page.getByTestId("size-button-L")).toBeVisible();
        await expect(page.getByTestId("size-button-XL")).toBeVisible();

        await expect(page.getByTestId("size-button-XS").getByText("5")).toBeVisible();
        await expect(page.getByTestId("size-button-S").getByText("4")).toBeVisible();
        await expect(page.getByTestId("size-button-M").getByText("4")).toBeVisible();
        await expect(page.getByTestId("size-button-L").getByText("4")).toBeVisible();
        await expect(page.getByTestId("size-button-XL").getByText("4")).toBeVisible();
    });

    test("Disable buttons for out of stock sizes", async ({ page }) => {
        await page.goto("/item/cotton-sweater-black");
        const sizeButtonS = page.getByTestId("size-button-S");
        await expect(sizeButtonS).toBeDisabled();
        await expect(sizeButtonS.getByText("0")).toBeVisible();

        const sizeButtonM = page.getByTestId("size-button-M");
        await expect(sizeButtonM).toBeDisabled();
        await expect(sizeButtonM.getByText("0")).toBeVisible();

        const sizeButtonL = page.getByTestId("size-button-L");
        await expect(sizeButtonL).toBeDisabled();
        await expect(sizeButtonL.getByText("0")).toBeVisible();

        const sizeButtonXL = page.getByTestId("size-button-XL");
        await expect(sizeButtonXL).toBeDisabled();
        await expect(sizeButtonXL.getByText("0")).toBeVisible();

        const sizeButtonXXL = page.getByTestId("size-button-XXL");
        await expect(sizeButtonXXL).toBeDisabled();
        await expect(sizeButtonXXL.getByText("0")).toBeVisible();
    });

    test("Display out of stock message if all sizes are out of stock", async ({ page }) => {
        await page.goto("/");
        const item = page.getByTestId("product-4");
        await expect(item.getByText("Cotton Sweater")).toBeVisible();
        await expect(item.getByText("Out of Stock")).toBeVisible();
    });

    test("Disable add to cart button if all sizes are out of stock", async ({ page }) => {
        await page.goto("/item/cotton-sweater-black");

        const addToCartButton = page.getByTestId("add-to-cart-button");
        await expect(addToCartButton).toBeDisabled();
        await expect(addToCartButton.getByText("Out of Stock")).toBeVisible();
    });

    // test("Stock updates when user successfully orders their cart", async ({ page,request }) => {
    //     page.on("dialog", dialog => dialog.accept());

    //     await request.post("/api/order", {

    //     }); Ending it here, I can't bypass a stripe session ID or mock it to successfully use my /api/order :(
});