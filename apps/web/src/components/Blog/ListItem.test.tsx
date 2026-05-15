import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { product_1, product_2} from "./List.test";
import { ProductListItem } from "./ListItem";

test("render product data summary", async () => {
  const { getByText, getByTestId, getByRole } = render(<ProductListItem product={product_1} />);

  await expect.element(getByText("Classic Tee"))
  await expect.element(getByRole("link")).toHaveAttribute("href", "/product/classic-tee");
  await expect.element(getByTestId("size-S")).toBeVisible();
  await expect.element(getByTestId("size-M")).toBeVisible();
  await expect.element(getByTestId("size-L")).toBeVisible();    
  await expect.element(getByText("4.5")).toBeVisible();
  await expect.element(getByText("White")).toBeVisible();
  await expect.element(getByText("$49.99")).toBeVisible();
});

test("renders out of stock badge when stock is 0", async () => {
    const { getByText } = render(<ProductListItem product={product_2} />);

    await expect.element(getByText("Out of Stock")).toBeInTheDocument();
});

/*  ALL OF WHICH MUST BE VISIBLE
    name: "Classic Tee",
    articleType: "T-Shirt",
    url-linkage-to: "/product/classic-tee",
    sizes: "S,M,L",
    rating: 4.5,
    colour: "White",
    price: 49.99,
*/