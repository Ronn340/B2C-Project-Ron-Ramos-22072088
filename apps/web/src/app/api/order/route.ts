import { NextRequest } from "next/server"
import { client } from "@repo/db/client";
import { getCurrentUserId } from "@/utils/auth";

export async function POST(req: NextRequest) {
    //Authentication check
    const userId = await getCurrentUserId();
    if (!userId)
        return Response.json({ message: "Not logged in" }, { status: 401 });

    //Duplicate orders check
    const { stripeSessionId } = await req.json();
    const existingOrder = await client.db.order.findUnique({
        where: { stripeSessionId }
    });
    if (existingOrder) {
        return Response.json({ message: "Order already exists for this session" }, { status: 400 });
    }

    //Cart checks (non-existent+empty)
    const cart = await client.db.cart.findUnique({
        where: { userId },
        include: { items: { include: { product: true } } }
    });

    if (!cart)
        return Response.json({ message: "Cart not found" }, { status: 404 });
    if (cart.items.length === 0)
        return Response.json({ message: "Cart is empty" }, { status: 400 });

    //Total amount saved into history
    const total = cart.items.reduce((sum, item) => sum + item.quantity * item.product.price, 0);

    //Order Creation
    const order = await client.db.order.create({
        data: {
            userId,
            stripeSessionId,
            totalAmount: total,
            items: {
                create: cart.items.map(item => ({
                    productId: item.productId,
                    quantity: item.quantity,
                    priceAtPurchase: item.product.price,
                    name: item.product.name
                }))
            }
        }
    })

    //Delete the cart (FK relationhips first - item->cart)
    await client.db.cartItem.deleteMany({ where: { cartId: cart.id } });
    await client.db.cart.delete({ where: { id: cart.id } });

    return Response.json({ order })
}