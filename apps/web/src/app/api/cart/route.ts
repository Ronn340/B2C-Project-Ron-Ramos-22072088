import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserId } from "@/utils/auth";
import { client } from "@repo/db/client";

export async function POST(req: NextRequest) {

    const userId = await getCurrentUserId();
    if (!userId)
        return NextResponse.json({ message: "Not logged in" }, { status: 401 });

    const { sizeStockId, quantity } = await req.json();

    const sizeStock = await client.db.sizeStock.findUnique({
        where: { id: sizeStockId }
    });

    if (!sizeStock) {
        return NextResponse.json({ message: "Size stock not found" }, { status: 404 });
    }

    const cart = await client.db.cart.upsert({
        where: { userId },
        create: { userId },     //Create cart if not exists
        update: {}              //Do nothing if there is one
    })

    const existingCartItem = await client.db.cartItem.findUnique({
        where: {
            cartId_sizeStockId: {
                cartId: cart.id,
                sizeStockId
            }
        }
    });

    const totalQuantity = (existingCartItem?.quantity ?? 0) + quantity;
    if (totalQuantity > sizeStock.stock) {
        return NextResponse.json({ message: "Quantity exceeds available stock" }, { status: 400 });
    }
    if (totalQuantity > 10) {
        return NextResponse.json({ message: "Quantity exceeds maximum limit" }, { status: 400 });
    }
    
    await client.db.cartItem.upsert({
        where: {
            cartId_sizeStockId: {
                cartId: cart.id,
                sizeStockId
            }
        },
        create: {                       //Create new cartItem
            cartId: cart.id,
            productId: sizeStock.productId,
            sizeStockId: sizeStockId,
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
    const { action, sizeStockId } = await req.json();

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
            cartId_sizeStockId: {
                cartId: cart.id,
                sizeStockId
            }
        }
    });
    if (!cartItem)
        return NextResponse.json({ message: "Item not found in cart" }, { status: 404 });

    //End at performing the update
    if (action === "add") {
        await client.db.cartItem.update({
            where: { id: cartItem.id },
            data: { quantity: Math.min(cartItem.quantity + 1, 10) }
        });
    } else if (action === "subtract") {
        await client.db.cartItem.update({
            where: { id: cartItem.id },
            data: { quantity: Math.max(cartItem.quantity - 1, 1) }
        });
    }

    return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
    const userId = await getCurrentUserId();
    const { sizeStockId } = await req.json();

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
            cartId_sizeStockId: {
                cartId: cart.id,
                sizeStockId
            }
        }
    });
    if (!cartItem)
        return NextResponse.json({ message: "Item not found in cart" }, { status: 404 });

    await client.db.cartItem.delete({ where: { id: cartItem.id } });
    return NextResponse.json({ ok: true });
}
