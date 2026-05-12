"use server";
import { client } from "@repo/db/client";

export async function increaseView(postId: number) {
    const post = await client.db.post.findUnique({
        where: { id: postId }
    })
    if (!post) {
        throw new Error("Post not found");
    }

    await client.db.post.update({
        where: { id: postId },
        data: { views : post.views + 1 }
    })
}