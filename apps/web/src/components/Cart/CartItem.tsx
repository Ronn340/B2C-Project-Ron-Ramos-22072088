import { CartItem, Product } from "@prisma/client";
type CartItemWithProduct = CartItem & { product: Product };

export function CartListItem({ item }: { item: CartItemWithProduct }) {
    return (
        <div>
            <span>{item.product.name}</span>
            <span>${item.product.price.toFixed(2)}</span>
        </div>
    );
}