import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserId } from "@/utils/auth";
import { client } from "@repo/db/client";

export async function POST(req: NextRequest) {

    const userId = await getCurrentUserId();
    if (!userId)
        return NextResponse.json({ message: "Not logged in" }, { status: 401 });

    const { productId, quantity } = await req.json();

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
            quantity: quantity
        },
        update: {
            quantity: { increment: quantity }  //Increment by the specified quantity if already exists
        }
    })
    return NextResponse.json({ ok: true });
}

export async function PATCH(req: NextRequest) {
    const userId = await getCurrentUserId();
    if (!userId)
        return NextResponse.json({ message: "Not logged in" }, { status: 401 });

    const { action, productId } = await req.json();
    const cart = await client.db.cart.findUnique({ where: { userId } });

    if (action === "subtract") {
        const res = await client.db.cartItem.update({
            where: {
                cartId_productId: {
                    cartId: cart!.id,
                    productId
                }
            },
            data: {
                quantity: { decrement: 1 }
            }
        });
    } else {
        const res = await client.db.cartItem.update({
            where: {
                cartId_productId: {
                    cartId: cart!.id,
                    productId
                }
            },
            data: {
                quantity: { increment: 1 }
            }
        });
    }
    return NextResponse.json({ ok: true });
}