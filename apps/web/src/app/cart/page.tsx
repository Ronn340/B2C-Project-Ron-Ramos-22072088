import { getCurrentUserId } from "@/utils/auth";
import { AppLayout } from "@/components/Layout/AppLayout";
import { client } from "@repo/db/client";
import { CartList } from "@/components/Cart/CartList";
import { CartSummary } from "@/components/Cart/CartSummary";

export default async function CartPage() {
    const userId = await getCurrentUserId();
    if (!userId) {
        return <AppLayout>
            <div className="flex items-center justify-center px-5 py-5 ">
                <span className="text-xl font-bold text-primary p-3 border-y border-wsu">Log-in to View Cart</span>
            </div>
        </AppLayout>
        //probably add a button here to go to the login page
    }

    const cart = await client.db.cart.findUnique({
        where: { userId },

        include: {
            items: {
                orderBy: {
                    product: {
                       name: "asc" 
                    }
                },
                include: { product: true, sizeStock: true}
            }
        }
    });

    const products = cart?.items.map(item => item.product) || [];

    if (!cart || cart.items.length === 0) {
        return <AppLayout >
            <div className="flex items-center justify-center px-5 py-5 ">
                <span className="text-xl font-bold text-primary p-3 border-y border-wsu">No items in your cart</span>
            </div>
        </AppLayout>
        //probably add a button here to go back to the shop
    }

    const total = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    return (
        <AppLayout>
            <div className="mx-15">
                <div className="flex items-center justify-center px-5 py-5 ">
                    <span className="text-xl font-bold text-primary p-3 border-y border-wsu">Shopping Cart</span>
                </div>
                <div className="grid grid-cols-[3fr_1fr] px-10">
                    <CartList items={cart.items} />
                    <div className="w-full">
                        <CartSummary items={cart.items} />
                    </div>
                </div>
            </div>

        </AppLayout>
    )
}