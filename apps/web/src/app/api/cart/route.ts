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
    const { action, productId } = await req.json();

    //Find user
    if (!userId)
        return NextResponse.json({ message: "Not logged in" }, { status: 401 });

    //Find cart
    const cart = await client.db.cart.findUnique({ where: { userId } });
    if (!cart)
        return NextResponse.json({ message: "Cart not found" }, { status: 404 });

    //Find editable item
    const cartItem = await client.db.cartItem.findUnique({
        where: {
            cartId_productId: {
                cartId: cart.id,
                productId
            }
        }
    });
    if (!cartItem)
        return NextResponse.json({ message: "Item not found in cart" }, { status: 404 });

    //Find action
    const data = action === "subtract" ? { quantity: { decrement: 1 } } : { quantity: { increment: 1 } };

    //End at performing the update
    if (cartItem.quantity > 1) {
        await client.db.cartItem.update({
            where: { id: cartItem.id },
            data
        });
    } else {
        await client.db.cartItem.delete({ where: { id: cartItem.id } });
    }
    return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
    const userId = await getCurrentUserId();
    const { productId } = await req.json();

    //Find user
    if (!userId)
        return NextResponse.json({ message: "Not logged in" }, { status: 401 });

    //Find cart
    const cart = await client.db.cart.findUnique({ where: { userId } });
    if (!cart)
        return NextResponse.json({ message: "Cart not found" }, { status: 404 });

    //Find editable item
    const cartItem = await client.db.cartItem.findUnique({
        where: {
            cartId_productId: {
                cartId: cart.id,
                productId
            }
        }
    });
    if (!cartItem)
        return NextResponse.json({ message: "Item not found in cart" }, { status: 404 });

    await client.db.cartItem.delete({ where: { id: cartItem.id } });
    return NextResponse.json({ ok: true });
}
