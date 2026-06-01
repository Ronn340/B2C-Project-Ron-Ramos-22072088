import { Order, OrderItem } from "@prisma/client";
import { Prisma } from "@prisma/client";

export type OrderWithItemProduct = Prisma.OrderGetPayload<{
    include: { items: { include: { product: true } } }
}> //https://www.prisma.io/docs/orm/prisma-client/type-safety/operating-against-partial-structures-of-model-types#solution

export function OrderCard({ order }: { order: OrderWithItemProduct }) {
    return (
        <article className="flex gap-2 py-4 border-b border-secondary">
            {/* Left side - first item image placeholder */}
            <div className="flex w-1/3 p-4 items-center justify-center">
                <div className="w-full aspect-square border border-gray-300 rounded-lg bg-gray-100 flex items-center justify-center">
                    <img src={order.items[0]?.product.imageUrl} alt={order.items[0]?.name} className="w-full h-full object-cover" />
                </div>
            </div>
            {/* Right side details */}
            <div className="flex flex-col w-3/4 pt-4 gap-1">
                <span className="text-lg text-primary font-semibold">
                    Order Placed: {new Date(order.createdAt).toLocaleDateString()}
                </span>
                <span className="text-md font-semibold text-primary">
                    Items: {order.items.reduce((sum, item) => sum + item.quantity, 0)} item(s)
                </span>
                <span className="text-md font-semibold text-primary">
                    Total: ${order.totalAmount.toFixed(2)}
                </span>

                {order.items.map(item => (
                    <div key={item.id} className="flex flex-col mt-2">
                        <span className="text-base text-primary"> {item.name} x{item.quantity}</span>
                        <span className="text-primary"> ${item.priceAtPurchase.toFixed(2)}</span>
                    </div>
                ))}

                <span className="text-sm text-secondary text-end mt-5">
                    Reference id: {order.id}
                </span>
            </div>
        </article>
    );
    //orderiD
    //order date
    //total amount
    //list of items with name, quantity, price at purchase

}