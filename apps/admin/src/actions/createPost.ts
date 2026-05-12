"use server"

import { client } from "@repo/db/client";
import { toUrlPath } from "@repo/utils/url";

export async function createPost(data: {
    title: string;
    description: string;
    content: string;
    imageUrl: string;
    tags: string;

        // title: "",
        // description: "",
        // content: "",
        // imageUrl: "",
        // tags: ""

}) {
    const post = await client.db.post.create({
        data: {
            urlId: toUrlPath(data.title),
            title: data.title,
            content: data.content,
            description: data.description,
            imageUrl: data.imageUrl,
            date: new Date(),
            category: "React",// Default category for now
            views: 0,
            tags: data.tags,
            active: true,
        }
    })
}

//   id          Int      @id @default(autoincrement())
//   urlId       String   @unique
//   title       String
//   content     String
//   description String
//   imageUrl    String
//   date        DateTime @default(now())
//   category    String
//   views       Int      @default(0)
//   Likes       Like[]
//   tags        String
//   active      Boolean  @default(true)