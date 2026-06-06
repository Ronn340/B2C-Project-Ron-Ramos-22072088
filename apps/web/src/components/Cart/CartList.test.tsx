

import type { Prisma, SizeStock } from "@prisma/client";
import { CartList } from "./CartList";
import { test, expect, vi } from "vitest";
import { render } from "vitest-browser-react";

type CartItem = Prisma.CartItemGetPayload<{
    include: { product: true, sizeStock: true }
}>;

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

//Making hardcoded CartItem concatted Product
const product_1: Product = {
    id: 1,
    urlId: "product-1",
    name: "Product 1",
    articleType: "Shirt",
    description: "Description for product 1",
    gender: "Unisex",
    rating: 4.5,
    imageUrl: "https://via.placeholder.com/150",
    colour: "Red",
    price: 29.99,
    stock: 10,
    active: true,
    images: [],
    sizeStocks: sizeStockExample.slice(0, 5),
    createdAt: new Date(),
}
const product_2: Product = {
    id: 2,
    urlId: "product-2",
    name: "Product 2",
    articleType: "Shirt",
    description: "Description for product 2",
    gender: "Men",
    rating: 4.0,
    imageUrl: "https://via.placeholder.com/150",
    colour: "Blue",
    price: 39.99,
    stock: 5,
    active: true,
    images: [],
    sizeStocks: sizeStockExample.slice(5, 10),
    createdAt: new Date(),
}

export const cartItem_1: CartItem = {
    id: "cuid-pretend",
    cartId: "id-pretend",
    sizeStockId: 2,
    productId: 1,
    quantity: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
    product: product_1,
    sizeStock: sizeStockExample[1]!, 

}

const cartItem_2: CartItem = {
    id: "cuid-pretend-2",
    cartId: "id-pretend",
    sizeStockId: 7,
    productId: 2,
    quantity: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
    product: product_2,
    sizeStock: sizeStockExample[6]!,
}

//Note that inside <CartList/> is uses useRouter in which vitest cannot find.
//Using vi.mock next/navigation to define useRouter functionality so it CAN find it
vi.mock("next/navigation", () => ({
    useRouter: () => ({ refresh: vi.fn() }),
}));

//Test 0 products
test("renders 0 products when no items are present", async () => {
    const { getByText } = render(<CartList items={[]} />);
    await expect.element(getByText("0 Products")).toBeInTheDocument();
});

//Test correct number of products
test("renders correct number of products", async () => {
    const component = render(<CartList items={[cartItem_1, cartItem_2]} />);
    await expect(
        component.baseElement.getElementsByTagName("article"),
    ).toHaveLength(2);
    await expect.element(component.getByText("Product 1")).toBeInTheDocument();
    await expect.element(component.getByText("Product 2")).toBeInTheDocument();
});

//Test correct product details
test("render product name for each item", async () => {
    const { getByText } = render(<CartList items={[cartItem_1, cartItem_2]} />);

    await expect.element(getByText("Product 1")).toBeInTheDocument();
    await expect.element(getByText("Size: Unisex S")).toBeInTheDocument();
    await expect.element(getByText("Product 2")).toBeInTheDocument();
    await expect.element(getByText("Size: Men S")).toBeInTheDocument();
});