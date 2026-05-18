"use client";

type CartItemWithProduct = CartItem & { product: Product };
import { CartItem, Product } from "@prisma/client";

export function CartSummary({ items }: { items: CartItemWithProduct[] }) {
    const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

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
            <button className="w-full mt-4 bg-wsu text-black py-2 rounded-full hover:bg-textSecondary transition-colors">
                Proceed to Checkout
            </button>
        </div>
    );
}