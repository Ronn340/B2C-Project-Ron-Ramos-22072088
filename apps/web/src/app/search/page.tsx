import { AppLayout } from "@/components/Layout/AppLayout";
import { Main } from "@/components/Main";
import { client } from "@repo/db/client";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;
  const filteredPosts = await client.db.post.findMany({
    where: {
      OR: [
        { title: { contains: q } },
        { description: { contains: q } },
      ],
      active: true,
    },
    include: { Likes: true }
  })
  const structuredPosts = filteredPosts.map((post) => ({
    ...post,
    likes: post.Likes.length,
  }));

  //  (posts
  //   .filter((post) => 
  //   post.title.toLowerCase().includes(q.toLowerCase())
  //   || 
  //   post.description.toLowerCase().includes(q.toLowerCase())));

  return (
    <AppLayout query={q}>
      <h1 className="flex items-center justify-center text-sm text-gray-500 font-bold px-4 py-2">Search Results for "{q}"</h1>
      <Main posts={structuredPosts} />
    </AppLayout>
  );
}
