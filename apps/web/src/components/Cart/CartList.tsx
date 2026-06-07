import type { Prisma } from "@prisma/client";
import { CartListItem } from "./CartItem";
type CartItem = Prisma.CartItemGetPayload<{
    include: { product: true, sizeStock: true }
}>;

export function CartList({ items }: { items: CartItem[] }) {
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