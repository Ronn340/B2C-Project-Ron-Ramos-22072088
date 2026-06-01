import { test, expect } from "./fixtures";
import { seed } from "@repo/db/seed";

test.describe("AUTHENTICATION", () => {
    //seed before everythign
    test.beforeEach(async () => {
        await seed();
    });

    test("Signed out shows no user image / shows a sign in button", async ({ browser }) => {
        //Clear cookies/session = logged out state
        const context = await browser.newContext({ storageState: { cookies: [], origins: [] } });
        const pageWithNoCookie = await context.newPage();
        await pageWithNoCookie.goto("/");
        await expect(pageWithNoCookie.getByTestId("user-icon")).toBeVisible();
        const toggleProfile = pageWithNoCookie.getByTestId("user-icon");
        await toggleProfile.click();
        await expect(pageWithNoCookie.getByRole("button", { name: "Sign in with Google" })).toBeVisible();
        await context.close();
    });

    test("Signed in shows user image / shows sign out button", async ({ page }) => {
        await page.goto("/");
        await expect(page.getByTestId("user-image")).toBeVisible();
        const toggleProfile = page.getByTestId("user-image");
        await toggleProfile.click();
        await expect(page.getByRole("button", { name: "Sign out" })).toBeVisible();
    });
});




