"use server";

import { client } from "@repo/db/client";

export async function savePost(data: {
    title: string;
    description: string;
    content: string;
    imageUrl: string;
    tags: string;
    postId: number;
}) {
    const post = await client.db.post.findUnique({
        where: { id: data.postId }
    });

    if (!post) {
        throw new Error("Post not found");
    }

    await client.db.post.update({
        where: { id: data.postId },
        data: {
            title: data.title,
            description: data.description,
            content: data.content,
            imageUrl: data.imageUrl,
            tags: data.tags,
        }
    });
}