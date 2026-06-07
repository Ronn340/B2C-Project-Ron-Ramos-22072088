import { test, expect } from "./fixtures";
import { seed } from "@repo/db/seed";


test.describe("CART SCREEN", () => {

    //seed before everythign
    test.beforeEach(async () => {
        await seed();
    });

    //Test unauthenticated cart screen
    test("Block access if not authenticated", async ({ browser }) => { //
        const context = await browser.newContext({ storageState: { cookies: [], origins: [] } });
        const pageWithNoCookie = await context.newPage();
        await pageWithNoCookie.goto("/cart");
        await expect(pageWithNoCookie.getByText("Log-in to View Cart")).toBeVisible();
        await context.close();
    });

    //Test empty cart screen
    test("Display empty cart message", async ({ page }) => {
        await page.goto("/cart");
        await expect(page.getByText("No items in your cart")).toBeVisible();
    });

    //Test Add to Cart from /item/[product] aka detail page
    test("Add item to cart from detail page", async ({ page }) => {
        page.on("dialog", dialog => dialog.accept());

        await page.goto("/item/cotton-sweater-gray");
        const selectSize = page.getByTestId("size-button-S");
        await selectSize.click();
        const addToCartButton = page.getByTestId("add-to-cart-button");
        addToCartButton.click();
        await page.waitForTimeout(6000);
        await page.goto("/cart");
        await expect(page.getByText("Cotton Sweater")).toBeVisible();
        await expect(page.getByTestId("quantity")).toHaveText("1");
        await expect(page.getByTestId("subtotal")).toHaveText("Subtotal: $59.90");
    });

    //Test multiple items to add it cart at once
    test("Add multiple items at once to cart", async ({ page }) => {
        page.on("dialog", dialog => dialog.accept());

        await page.goto("/item/cotton-sweater-gray");
        const selectSize = page.getByTestId("size-button-S");
        await selectSize.click();
        const plusButton = page.getByTestId("quantity-increment");
        await plusButton.click();
        await plusButton.click();
        const addToCartButton = page.getByTestId("add-to-cart-button");
        await addToCartButton.click();
        await page.waitForTimeout(6000);
        await page.goto("/cart");
        await expect(page.getByText("Cotton Sweater")).toBeVisible();
        await expect(page.getByTestId("quantity")).toHaveText("3");
        await expect(page.getByTestId("subtotal")).toHaveText("Subtotal: $179.70");
    });

    test.describe("Update Cart Item Quantity", () => {
        test.beforeEach(async ({ request }) => {
            await request.post("/api/cart", {
                data: { sizeStockId: 5, quantity: 2 },
                headers: { "Content-Type": "application/json" }
            });
        });

        //Test increment +=1
        test("Increment item quantity in cart", async ({ page }) => {
            await page.goto("/cart");
            const incrementButton = page.getByTestId("quantity-increment");
            await incrementButton.click();
            await page.waitForTimeout(6000);
            await expect(page.getByTestId("quantity")).toHaveText("3");
            await expect(page.getByTestId("subtotal")).toHaveText("Subtotal: $179.70");

        });

        //Test decrement -=1
        test("Decrement item quantity in cart", async ({ page }) => {
            await page.goto("/cart");
            const decrementButton = page.getByTestId("quantity-decrement");
            await decrementButton.click();
            await page.waitForTimeout(6000);
            await expect(page.getByTestId("quantity")).toHaveText("1");
            await expect(page.getByTestId("subtotal")).toHaveText("Subtotal: $59.90");
        });

        //Test decrement disabled to be stuck at 1
        test("Decrement button disabled at quantity 1", async ({ page }) => {
            await page.goto("/cart");
            const decrementButton = page.getByTestId("quantity-decrement");
            await decrementButton.click();
            await page.waitForTimeout(6000);
            await expect(page.getByTestId("quantity")).toHaveText("1");
            await expect(decrementButton).toBeDisabled();
        });

        //Test remove from cart
        test("Remove item from cart", async ({ page }) => {
            await page.goto("/cart");
            const removeButton = page.getByText("Remove");
            await removeButton.click();
            await page.waitForTimeout(6000);
            await expect(page.getByText("No items in your cart")).toBeVisible();
        });
    });
});