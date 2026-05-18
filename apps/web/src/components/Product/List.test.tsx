import type { Product } from "@repo/db/data";
import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { ProductList } from "./List";

export const product_1: Product = {
    id: 1,
    urlId: "classic-tee",
    name: "Classic Tee",
    articleType: "T-Shirt",
    gender: "Men",
    sizes: "S,M,L",
    rating: 4.5,
    imageUrl: "/img/tee.jpg",
    description: "A classic t-shirt for everyday wear.",
    colour: "White",
    price: 49.99,
    stock: 5,
    active: true,
    createdAt: new Date("2024-10-01T00:00:00Z"),
    images: [],
};

export const product_2: Product = {
    id: 2,
    urlId: "vintage-hoodie",
    name: "Vintage Hoodie",
    articleType: "Hoodie",
    gender: "Unisex",
    sizes: "M,L,XL",
    rating: 4.8,
    imageUrl: "/img/hoodie.jpg",
    description: "A vintage hoodie for a retro look.",
    colour: "Black",
    price: 79.99,
    stock: 0,
    active: true,
    createdAt: new Date("2024-09-15T00:00:00Z"),
    images: [],
};

test("renders 0 products when no products are present", async () => {
    const { getByText } = render(<ProductList products={[]} />);
    await expect.element(getByText("No items found")).toBeInTheDocument();
});

test("renders all products", async () => {
    const component = render(<ProductList products={[product_1, product_2]} />);

    await expect(
        component.baseElement.getElementsByTagName("article"),
    ).toHaveLength(2);
    await expect.element(component.getByText("Classic Tee")).toBeInTheDocument();
    await expect.element(component.getByText("Vintage Hoodie")).toBeInTheDocument();
});
