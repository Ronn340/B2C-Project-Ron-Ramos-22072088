import { seed } from "@repo/db/seed";
import { expect, test, type Page } from "./fixtures";

test.beforeAll(async () => {
    await seed();
});

test.describe("HOME SCREEN", () => {
    async function checkItem(
        //Changed the checkItem function to use <button> role instead of <a> role, since the items are now buttons instead of links
        page: Page,
        name: string,
        param: string,
        value: string,
    ) {
        const btn = page.getByRole("button", { name, exact: true });
        await expect(btn).toBeVisible();
        await btn.click();
        await expect(page).toHaveURL(new RegExp(`${param}=${value}`));
    }

    test(
        "Show Active Posts",
        async ({ page }) => {
            await page.goto("/");

            await expect(await page.locator("article").count()).toBe(7);
        },
    );

    test(
        "Gender Links",

        async ({ page }) => {
            await page.goto("/");

            //  HOME SCREEN > User must see the list of products filtered by gender
            //  Link Checking via click

            await checkItem(page, "Women", "gender", "Women");
            await checkItem(page, "Men", "gender", "Men");
            await checkItem(page, "Unisex", "gender", "Unisex");
            await checkItem(page, "Kids", "gender", "Kids");
        },
    );

    test(
        "Sort Links",

        async ({ page }) => {
            await page.goto("/");

            //  HOME SCREEN > User must see the list of products sorted by different criteria
            //  Link Checking via select

            await page.getByTestId("sort-select").selectOption("Best Reviews");
            await expect(page).toHaveURL(new RegExp(`sort=Best.Reviews`));

            await page.getByTestId("sort-select").selectOption("Price Ascending");
            await expect(page).toHaveURL(new RegExp(`sort=Price.Ascending`));

        },
    );

    test(
        "Type Links",
        
        async ({ page }) => {
            await page.goto("/");
            
            //  HOME SCREEN > User must see the list of products filtered by type
            //  Link Checking via select
            await page.getByTestId("type-select").selectOption("Pants");
            await expect(page).toHaveURL(new RegExp(`type=Pants`));

            await page.getByTestId("type-select").selectOption("Shorts");
            await expect(page).toHaveURL(new RegExp(`type=Shorts`));
        }
    );


    test(
        "Post Item",
        async ({ page }) => {
            await page.goto("/");

            const item = await page.getByTestId("product-1");
            await expect(item).toBeVisible();

            // HOME SCREEN > The list shows the following items:
            // - product name
            // - link to product page
            // - CLothing Category 
            // - Clothing Gender
            // - price
            // - rating

            await expect(item.getByText("Fluffy Fleece Jacket")).toBeVisible();
            await expect(item).toHaveAttribute("href", "/item/fleece-jacket-black");

            await expect(item.getByTestId("category")).toHaveText("Jacket | Women");
            await expect(item.getByText("$89.99")).toBeVisible();
            await expect(item.getByText("4.5")).toBeVisible();
        },
    );

    test(
        "Dark Mode Switch",
        {
            tag: "@a1",
        },
        async ({ page }) => {
            await page.goto("/");

            // HOME SCREEN > User must be able to switch between dark and light theme with a button

            const html = await page.getAttribute("html", "data-theme");
            if (html === "dark") {
                await page.getByText("Light Mode").click();
                // await page.waitForTimeout(1000);
                await expect(await page.getAttribute("html", "data-theme")).toBe(
                    "light",
                );
            } else {
                await page.getByText("Dark Mode").click();
                // await page.waitForTimeout(1000);
                await expect(await page.getAttribute("html", "data-theme")).toBe(
                    "dark",
                );
            }
        },
    );

    test(
        "Search Box",

        async ({ page }) => {
            await page.goto("/");

            // HOME SCREEN > There is a search functionality that filters the products based on the search string stored in the query string

            await page.getByPlaceholder("Search").fill("Fatboy");
            await expect(page).toHaveURL("/shop?urlId=fatboy");
        },
    );
});