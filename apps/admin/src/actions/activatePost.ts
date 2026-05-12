"use server";

import { client } from "@repo/db/client";

export async function activatePost(postId: number) {
    const post = await client.db.post.findUnique({
        where : { id: postId }
    })
    if (!post) {
        throw new Error("Post not found");
    }

    await client.db.post.update({
        where: { id: postId },
        data: { active : !post.active }
    })
}