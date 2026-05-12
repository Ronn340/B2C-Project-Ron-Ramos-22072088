import { AppLayout } from "@/components/Layout/AppLayout";
import { Main } from "@/components/Main";
import { client } from "@repo/db/client";
import { toUrlPath } from "@repo/utils/url";

export default async function Page({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const databasePosts = await client.db.post.findMany({
    include: { Likes: true }
  });

  const filteredPosts = databasePosts
  .filter((post) => post.active)
  .filter((post) => toUrlPath(post.category) === name)
  .map((post) => ({
    ...post,
    likes: post.Likes.length,
  }));

  return (
    <AppLayout selectedCategory={name}>
      <h1 className="flex items-center justify-center text-sm text-gray-500 font-bold px-4 py-2">Posts in category "{name}"</h1>
      <Main posts={filteredPosts} />
    </AppLayout>
  );
}
