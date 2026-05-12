import { AppLayout } from "@/components/Layout/AppLayout";
import { Main } from "@/components/Main";
import { client } from "@repo/db/client";
import { toUrlPath } from "@repo/utils/url";

export default async function Page({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;

  // Fetch all ACTIVE posts
  const filteredPosts = await client.db.post.findMany({
    where: { active: true },
    include: { Likes: true }
  });

  /* NOTE:
    DB Raw = "Dev Tool", PARAM = "dev-tool"
    transforming the raw database tag is too complex than I would like so I filter client side instead after getting all active posts.
  */
  const structuredPosts = filteredPosts
    .filter((post) => post.tags.split(",").map((t) => toUrlPath(t.trim())).includes(tag))
    .map((post) => ({
      ...post,
      likes: post.Likes.length,
    }));

  return (

    <AppLayout selectedTag={tag}>
      <h1 className="flex items-center justify-center text-sm text-gray-500 font-bold px-4 py-2">Posts tagged with "{tag}"</h1>
      <Main posts={structuredPosts} />
    </AppLayout>
  );
}
