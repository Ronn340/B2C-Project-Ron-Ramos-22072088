import { NextRequest } from "next/server"
import { Product, Prisma } from "@prisma/client";
import { getCurrentUserId } from "@/utils/auth";
import Stripe from "stripe";

/* Logic for future reference:
    use stripe secret key to let stripe create a CHECKOUT SESSION

    //<==optional==>
    give my passed items[] prop to line_items in session creation
    //==>optional==>

    API returns response URL
    finally just use that session URL via window.location.href = url; to redirect
*/

type CartItem = Prisma.CartItemGetPayload<{
    include: { product: true; sizeStock: true }
}>;

export async function POST(req: NextRequest) {
    const userId = await getCurrentUserId();
    if (!userId)
        return Response.json({ message: "Not logged in" }, { status: 401 });

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    const { cartItems } = await req.json();
    //body should be cartItemsWithProduct[] - CartItem->Apppended_Product

    const lineItems = cartItems.map((item: CartItem) => ({
        price_data: {
            currency: "aud",
            product_data: {
                name: item.product.name,
                description: ` ${item.product.gender} ${item.sizeStock.size} - ${item.product.colour}`, 
                images: [item.product.imageUrl],
            },
            unit_amount: parseFloat((item.product.price * 100).toFixed(2)), // Stripe expects unit in cents
        },
        quantity: item.quantity,
    }));
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        //Note: session_id is passed to be used in saving order. <mainly to stop duplicates>
        success_url: `${process.env.NEXT_PUBLIC_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_URL}/cart`,
    });
    return Response.json({ url: session.url });
}