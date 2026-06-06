"use client";
import { Prisma } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
type CartItem = Prisma.CartItemGetPayload<{
    include: { product: true, sizeStock: true }
}>;

//"-" and "+" button operations to API
export function CartListItem({ item }: { item: CartItem }) {
    const router = useRouter();

    async function addToCart(sizeStockId: number, action: String) {
        const res = await fetch("/api/cart",
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ sizeStockId, action })
            });
        if (!res.ok) {
            alert("Failed to update: " + (await res.json()).message);
        } else {
            router.refresh();
        }
    }

    async function removeFromCart(sizeStockId: number) {
        const res = await fetch("/api/cart",
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ sizeStockId })
            });
        if (!res.ok) {
            alert("Failed to remove: " + (await res.json()).message);
        } else {
            router.refresh();
        }
    }

    return (
        <article className="flex gap-2 py-4">
            {/* Left side item */}
            <div className="flex w-1/5 p-4 items-center justify-center">
                <img src={item.product.imageUrl} alt={item.product.name}
                    className="w-full object-cover aspect-square border border-gray-300 rounded-lg" />
            </div>
            {/* Right side details */}
            <div className="flex flex-col w-3/4 pt-4">
                <span className="text-base font-semibold text-primary">{item.product.name}</span>
                <span className="text-sm text-gray-500 mt-1">Colour: {item.product.colour}</span>
                <span className="text-sm text-gray-500">Size: {item.product.gender} {item.sizeStock.size}</span>
                <span className="text-lg font-bold text-primary mt-1">${item.product.price.toFixed(2)}</span>
                <div className="flex items-center gap-2 border rounded-lg w-fit bg-textSecondary border-primary my-2">
                    <button

                        disabled={item.quantity <= 1}
                        className={`${item.quantity <= 1 ? " w-8 h-8 flex items-center justify-center bg-gray-300 rounded-lg cursor-not-allowed text-gray-500 hover:disabled:bg-gray-300" : "w-8 h-8 flex items-center justify-center hover:bg-wsu rounded-lg"}`}
                        onClick={async () => await addToCart(item.product.id, "subtract")}
                        data-test-id="quantity-decrement">
                        -
                    </button>
                    <span data-test-id="quantity">{item.quantity}</span>
                    <button
                        disabled={item.quantity >= 10}
                        className={`${item.quantity >= 10 ? "w-8 h-8 flex items-center justify-center bg-gray-300 rounded-lg cursor-not-allowed text-gray-500 hover:disabled:bg-gray-300" : "w-8 h-8 flex items-center justify-center hover:bg-wsu rounded-lg"}`}
                        onClick={async () => await addToCart(item.sizeStock.id, "add")}
                        data-test-id="quantity-increment">
                        +
                    </button>
                </div>
                <button className="flex text-sm text-wsu mt-1 hover:underline w-fit"
                    onClick={async () => await removeFromCart(item.sizeStock.id)}>
                    Remove
                </button>
                <span className="text-sm font-semibold text-primary" data-test-id="subtotal">
                    Subtotal: ${(item.product.price * item.quantity).toFixed(2)}
                </span>
            </div>
        </article>
    );
}