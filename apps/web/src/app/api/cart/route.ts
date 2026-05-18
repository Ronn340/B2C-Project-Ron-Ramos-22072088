import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/utils/auth";
import { client } from "@repo/db/client";

export async function POST(req: NextRequest) {

    const userId = await getCurrentUser();
    if (!userId)
        return NextResponse.json({ message: "Not logged in" }, { status: 401 });

    const { productId } = await req.json();

    const cart = await client.db.cart.upsert({
        where: { userId },
        create: { userId },     //Create cart if not exists
        update: {}              //Do nothing if there is one
    })

    await client.db.cartItem.upsert({
        where: {
            cartId_productId: {
                cartId: cart.id,
                productId
            }
        },
        create: {                       //Create new cartItem
            cartId: cart.id,
            productId: productId,
            quantity: 1
        },
        update: {
            quantity: { increment: 1 }  //Up +1 if already exists
        }
    })
    return NextResponse.json({ ok: true });
}