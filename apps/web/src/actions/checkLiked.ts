"use server";
import { client } from "@repo/db/client";
import { headers } from "next/headers";

export async function checkLiked(postId: number) {
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for") || "Unknown IP";

    const existingLike = await client.db.like.findFirst({
        where: {
            postId: postId,
            userIP: ip
        }
    });

    if (existingLike) {
        return true;
    } else {
        return false;
    }   
}