import { getCurrentUser } from "@/utils/auth";
import { AppLayout } from "@/components/Layout/AppLayout";
import { client } from "@repo/db/client";

export default async function CartPage() {
    const userId = await getCurrentUser();
    if (!userId) {
        return <AppLayout><p>Please log in to view your cart.</p></AppLayout>
        //probably add a button here to go to the login page
    }

    const cart = await client.db.cart.findUnique({
        where: { userId },
        include: {
            items: { include: { product: true } }
        }
    });

    if (!cart || cart.items.length === 0) {
        return <AppLayout><p>Your cart is empty.</p></AppLayout>
        //probably add a button here to go back to the shop
    }

    const total = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    return (
        <AppLayout>
            <h1>Your Cart</h1>
            {cart.items.map(item => (
                <div key={item.id}>
                    <span>{item.product.name}</span>
                    <span>x{item.quantity}</span>
                    <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
            ))}
            <p>Total: ${total.toFixed(2)}</p>
        </AppLayout>
    )
}