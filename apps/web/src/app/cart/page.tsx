import { getCurrentUser } from "@/utils/auth";
import { AppLayout } from "@/components/Layout/AppLayout";
import { client } from "@repo/db/client";
import { CartList } from "@/components/Cart/CartList";

export default async function CartPage() {
    const userId = await getCurrentUser();
    if (!userId) {
        return <AppLayout><p className="flex items-center justify-center">Please log in to view your cart.</p></AppLayout>
        //probably add a button here to go to the login page
    }

    const cart = await client.db.cart.findUnique({
        where: { userId },
        include: {
            items: { include: { product: true } }
        }
    });

    const products = cart?.items.map(item => item.product) || [];

    if (!cart || cart.items.length === 0) {
        return <AppLayout >
            <p className="flex items-center justify-center">Your cart is empty.</p>
        </AppLayout>
        //probably add a button here to go back to the shop
    }

    const total = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    return (
        <AppLayout>
            <h1>Your Cart</h1>
            <CartList items={cart.items} />
        </AppLayout>
    )
}