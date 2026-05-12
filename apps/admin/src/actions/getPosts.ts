"use server";

import { client } from "@repo/db/client";

export async function getPosts() {
    const databasePosts = await client.db.post.findMany({
        include: { Likes: true }
    });
    const filteredPosts = databasePosts.map((post) => ({
        ...post,
        likes: post.Likes.length,
    }));
    return filteredPosts;
};

/* Reference: prisma date comparison with 'gte' https://github.com/prisma/prisma/discussions/20219 */