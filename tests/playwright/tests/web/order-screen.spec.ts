import { test, expect } from "@playwright/test";
import { seed } from "@repo/db/seed";
import { client } from "@repo/db/client";

test.describe("ORDER SCREEN", () => {

    test.beforeEach(async () => {
        await seed();
    });

    test("Prompt login if not authenticated", async ({ browser }) => {
        const context = await browser.newContext({ storageState: { cookies: [], origins: [] } });
        const pageWithNoCookie = await context.newPage();
        await pageWithNoCookie.goto("/orders");
        await expect(pageWithNoCookie.getByText("Log-in to View Orders")).toBeVisible();
        await context.close();
    });

    test("Display empty orders message if no orders", async ({ page }) => {
        await page.goto("/orders");
        await expect(page.getByText("No orders found.")).toBeVisible();
    });

    test("Display orders in purchase history", async ({ page }) => {
        //Mock Earliest Order
        const user = await client.db.user.findFirst();
        const order = await client.db.order.create({
            data: {
                userId: "user-123",
                totalAmount: 29.90,
                stripeSessionId: "test-session-id",
                items: {
                    create: [
                        {
                            productId: 1,
                            quantity: 1,
                            size: "M",
                            priceAtPurchase: 29.90,
                            name: "Oversized Cotton T-Shirt"
                        }
                    ]
                }
            }
        });

        await page.goto("/orders");
        await expect(page.getByText("Oversized Cotton T-Shirt")).toBeVisible();
        await expect(page.getByText("x1")).toBeVisible();
        await expect(page.getByText("Size: Women M")).toBeVisible();
        await expect(page.getByText("Total: $29.90")).toBeVisible();
    });

    test("Display correct total for orders with multiple items", async ({ page }) => {
        //Mock Order with multiple items
        await client.db.order.create({
            data: {
                userId: "user-123",
                totalAmount: 149.60,
                stripeSessionId: "test-session-id-2",
                items: {
                    create: [
                        {
                            productId: 1,
                            quantity: 3,
                            priceAtPurchase: 29.90,
                            name: "Black Long Coat",
                            size: "XL"
                        },
                        {
                            productId: 2,
                            quantity: 1,
                            priceAtPurchase: 59.90,
                            name: "Cotton Sweater",
                            size: "L"

                        }
                    ]
                }
            }
        });



        await page.goto("/orders");
        await expect(page.getByText("Black Long Coat x3")).toBeVisible();
        await expect(page.getByText("Size: Women XL")).toBeVisible();
        await expect(page.getByText("Cotton Sweater x1")).toBeVisible();
        await expect(page.getByText("Size: Women L")).toBeVisible();
        await expect(page.getByText("Total: $149.60")).toBeVisible();
    });
});