import { AppLayout } from "@/components/Layout/AppLayout";
import { OrderList } from "@/components/Orders/OrderList";
import { getCurrentUserId } from "@/utils/auth";
import { client } from "@repo/db/client";
import App from "next/app";

export default async function OrdersPage() {
    const userId = await getCurrentUserId();
    if (!userId) {
        return (
            <AppLayout>
                <div className="flex items-center justify-center px-5 py-5 ">
                    <span className="text-xl font-bold text-primary p-3 border-y border-wsu">Log-in to View Orders</span>
                </div>
            </AppLayout>
        );
    }

    const orders = await client.db.order.findMany({
        where: { userId },
        include: { items: { include: { product: true } } },
        orderBy: { createdAt: "desc" }
    })

    if (orders.length === 0) {
        return (
            <AppLayout>
                <div className="flex items-center justify-center px-5 py-5 ">
                    <span className="text-xl font-bold text-primary p-3 border-y border-wsu">No orders found.</span>
                </div>
            </AppLayout>
        );
    }   

    return (
        <AppLayout>
            <div className="mx-15">
                <div className="flex items-center justify-center px-5 py-5 ">
                    <span className="text-xl font-bold text-primary p-3 border-y border-wsu">Purchase History</span>
                </div>
                <OrderList orders={orders} />
            </div>
        </AppLayout>
    )
}