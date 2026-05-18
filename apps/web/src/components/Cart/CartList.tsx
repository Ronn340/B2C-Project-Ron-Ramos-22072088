import type { CartItem, Product } from "@prisma/client";
type CartItemWithProduct = CartItem & { product: Product };
import { CartListItem } from "./CartItem";

export function CartList({ items }: { items: CartItemWithProduct[] }) {
    if (items.length === 0) {
        return <div className="py-6 flex justify-center">0 Products</div>;
    }
    return (
        <div>
            {items.map((item) => (
                <CartListItem key={item.id} item={item} />
            ))}
        </div>
    );
}