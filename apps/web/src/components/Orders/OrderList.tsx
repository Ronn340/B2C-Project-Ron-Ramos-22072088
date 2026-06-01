import { Order, OrderItem } from "@prisma/client";
import { OrderCard } from "./OrderItem";
import { Prisma } from "@prisma/client";

export type OrderWithItemProduct = Prisma.OrderGetPayload<{
    include: { items: { include: { product: true } } }
}> //https://www.prisma.io/docs/orm/prisma-client/type-safety/operating-against-partial-structures-of-model-types#solution

export function OrderList({ orders }: { orders: OrderWithItemProduct[] }) {
    if (orders.length === 0) {
        return <p>No orders found.</p>;
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
            ))}
        </div>
    );
}