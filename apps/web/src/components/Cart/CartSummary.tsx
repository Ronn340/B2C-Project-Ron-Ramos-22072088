"use client";

import { CartItem, Product } from "@prisma/client";
import { useState } from "react";

type CartItemWithProduct = CartItem & { product: Product };

export function CartSummary({ items }: { items: CartItemWithProduct[] }) {
    const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const [loading, setLoading] = useState(false);

    const handleCheckout = async () => {
        setLoading(true);
        const res = await fetch("/api/checkout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ cartItems: items })
        });

        if (!res.ok) {
            alert("Failed to create checkout session: " + (await res.json()).message);
            setLoading(false);
            return;
        } else {
            const { url } = await res.json();
            window.location.href = url;
        }

    }

    return (
        <div className="border-t pt-4 mt-4 bg-secondary rounded-lg p-4">
            <h2 className="text-lg font-semibold text-textSecondary">Order Summary</h2>
            <div className="flex justify-between mt-2">
                <span className="text-sm text-textSecondary">Total Items:</span>
                <span className="text-sm font-semibold text-textSecondary">{totalItems}</span>
            </div>
            <div className="flex justify-between mt-1">
                <span className="text-sm text-textSecondary">Total Price:</span>
                <span className="text-sm font-semibold text-textSecondary">${total.toFixed(2)}</span>
            </div>
            <div>
                <span className="text-xs text-textSecondary">Shipping to be calculated at checkout.</span>
            </div>
            <button
                className={`${loading ? "w-full mt-15 bg-gray-300 text-black py-2 rounded-full" : "w-full mt-15 bg-wsu text-black py-2 rounded-full hover:bg-textSecondary transition-colors"}`}
                onClick={handleCheckout}
            >
                {loading ? "Redirecting..." : "Proceed to Checkout"}
            </button>
        </div>
    );
}