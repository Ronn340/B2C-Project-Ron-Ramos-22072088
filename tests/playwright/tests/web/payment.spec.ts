import { test, expect } from "@playwright/test";
import { seed } from "@repo/db/seed";

test.describe("PAYMENT CHECKOUT", () => {
    test.beforeEach(async ({ }) => {
        await seed();
    });
    //Test that the checkout button calls the API and redirects to the URL
    test("Proceed to checkout redirects to Stripe given URL", async ({ page, request }) => {
        //First add an item via cart api POST add-to-cart call
        await request.post("/api/cart", {
            data: { productId: 3, quantity: 1 },
            headers: { "Content-Type": "application/json" }
        });

        //Second, intercept/'fulfil' the already defined /checkout url API call
        await page.route("/api/checkout", async (route) => {
            await route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({ url: "https://checkout.stripe.com/pay/cs_test_a1b2c3d4e5f6g7h8i9j0" })
            });
        });

        //Third do the normal checkout flow expecting to get the checkout.stripe url
        await page.goto("/cart");
        await page.getByRole("button", { name: "Proceed to Checkout" }).click();
        await expect(page).toHaveURL("https://checkout.stripe.com/pay/cs_test_a1b2c3d4e5f6g7h8i9j0");
    });
    //Test that the success page properly renders  
    test("Success page shows payment confirmation", async ({ page }) => {
        await page.route("/api/order", async (route) => {
            await route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({ order: { id: "test-session-id" } })
            });
        });
        await page.goto("/checkout/success?session_id=test-session-id");
        await expect(page.getByText("Payment Successful!")).toBeVisible();
        await expect(page.getByRole("button", { name: "Continue Shopping" })).toBeVisible();
    });

    //Test that the 'go back to shopping' button works
    test("Go back to shopping redirects back to home page", async ({ page }) => {
        await page.route("/api/order", async (route) => {
            await route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({ order: { id: "test-session-id" } })
            });
        });

        await page.goto("/checkout/success?session_id=test-session-id");
        await page.getByRole("button", { name: "Continue Shopping" }).click();
        await page.waitForTimeout(2000);
        await expect(page).toHaveURL("/");
    });

    test("Tampering sessionID avoids skipping payment", async ({ page }) => {
        await page.goto("/checkout/success?session_id=invalid-session-id");
        await expect(page.getByText("Payment Successful!")).not.toBeVisible();
        await expect(page.getByText("Uh oh, Something went wrong!")).toBeVisible();
        await page.getByRole("button", { name: "Go Home" }).click();
        await expect(page).toHaveURL("/");
    })

});