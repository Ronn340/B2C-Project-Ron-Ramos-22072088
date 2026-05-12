"use server";

import { client } from "@repo/db/client";
import { headers } from "next/headers";

export async function toggleLike(postId: number) {
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for") || "Unknown IP";

    const post = await client.db.post.findUnique({
        where: {
            id: postId
        }
    });
    if (!post) {
        throw new Error("Post not found");
    }

    const existingLike = await client.db.like.findFirst({
        where: {
            postId: postId,
            userIP: ip
        }
    });

    if (existingLike) {
        await client.db.like.delete({
            where: {
                postId_userIP: {
                    postId: postId,
                    userIP: ip
                }
             }
        });
        return;
    }
    //https://www.prisma.io/docs/orm/prisma-client/special-fields-and-types/working-with-composite-ids-and-constraints
    //postId_userId is the composite key name
    await client.db.like.create({
        data: {
            postId: postId,
            userIP: ip
        }
    });
}