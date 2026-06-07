import { NextRequest } from "next/server"
import { client } from "@repo/db/client";
import { getCurrentUserId } from "@/utils/auth";
import { Stripe } from "stripe";

export async function POST(req: NextRequest) {
    const { stripeSessionId } = await req.json();

    //Authentication check
    const userId = await getCurrentUserId();
    if (!userId)
        return Response.json({ message: "Not logged in" }, { status: 401 });

    //Stripe payment paid check
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    try {
        const session = await stripe.checkout.sessions.retrieve(stripeSessionId);
        if (session.payment_status !== "paid") {
            return Response.json({ message: "Payment not completed" }, { status: 400 });
        }
    } catch (error) {
        return Response.json({ message: "Invalid Stripe session ID" }, { status: 400 });
    }

    //Duplicate orders check
    const existingOrder = await client.db.order.findUnique({
        where: { stripeSessionId }
    });
    if (existingOrder) {
        return Response.json({ message: "Order already exists for this session" }, { status: 400 });
    }

    //Total amount saved into history
    const cart = await client.db.cart.findUnique({
        where: { userId },
        include: { items: { include: { product: true, sizeStock: true } } }
    });

    if (!cart) {
        return Response.json({ message: "Cart not found" }, { status: 404 });
    } else if (cart.items.length === 0) {
        return Response.json({ message: "Cart is empty" }, { status: 400 });
    }

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
                    size: item.sizeStock.size,
                    quantity: item.quantity,
                    priceAtPurchase: item.product.price,
                    name: item.product.name
                }))
            } //https://www.prisma.io/docs/orm/prisma-client/queries/relation-queries#create-a-related-record
        }
    })

    //Delete the cart (FK relationhips first - item->cart)
    await client.db.cartItem.deleteMany({ where: { cartId: cart.id } });
    await client.db.cart.delete({ where: { id: cart.id } });
    for (const item of cart.items) {
        await client.db.sizeStock.update({
            where: { id: item.sizeStockId },
            data: { stock: { decrement: item.quantity } }
        })
    }

    return Response.json({ order })
}