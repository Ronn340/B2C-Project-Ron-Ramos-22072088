import type { Prisma, SizeStock } from "@prisma/client";
import { expect, test } from "vitest";
import { render } from "vitest-browser-react";
import { ProductList } from "./List";

type Product = Prisma.ProductGetPayload<{
  include: { images: true; sizeStocks: true }
}>;

const sizeStockExample: SizeStock[] = [
    { id: 1, productId: 1, size: "XS", stock: 10, },
    { id: 2, productId: 1, size: "S", stock: 15, },
    { id: 3, productId: 1, size: "M", stock: 20, },
    { id: 4, productId: 1, size: "L", stock: 25, },
    { id: 5, productId: 1, size: "XL", stock: 30, }, 
    { id: 6, productId: 2, size: "XS", stock: 0, },
    { id: 7, productId: 2, size: "S", stock: 0, },
    { id: 8, productId: 2, size: "M", stock: 0, },
    { id: 9, productId: 2, size: "L", stock: 0, },
    { id: 10, productId: 2, size: "XL", stock: 0, },
];

export const product_1: Product = {
    id: 1,
    urlId: "classic-tee",
    name: "Classic Tee",
    articleType: "T-Shirt",
    gender: "Men",
    rating: 4.5,
    imageUrl: "/img/tee.jpg",
    description: "A classic t-shirt for everyday wear.",
    colour: "White",
    price: 49.99,
    stock: 5,
    active: true,
    createdAt: new Date("2024-10-01T00:00:00Z"),
    images: [],
    sizeStocks: sizeStockExample.slice(0, 5), 
};

export const product_2: Product = {
    id: 2,
    urlId: "vintage-hoodie",
    name: "Vintage Hoodie",
    articleType: "Hoodie",
    gender: "Unisex",
    rating: 4.8,
    imageUrl: "/img/hoodie.jpg",
    description: "A vintage hoodie for a retro look.",
    colour: "Black",
    price: 79.99,
    stock: 0,
    active: true,
    createdAt: new Date("2024-09-15T00:00:00Z"),
    images: [],
    sizeStocks: sizeStockExample.slice(5, 10),
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
