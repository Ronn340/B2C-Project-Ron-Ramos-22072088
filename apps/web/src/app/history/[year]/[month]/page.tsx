import { AppLayout } from "@/components/Layout/AppLayout";
import { Main } from "@/components/Main";
import { client } from "@repo/db/client";

export default async function Page({
  params,
}: {
  params: Promise<{ year: string; month: string }>;
}) {
  const { year, month } = await params;

  const filteredPosts = await client.db.post.findMany({
    where : { 
      active : true,
      date: {
        gte: new Date(parseInt(year), parseInt(month) - 1, 1),
        lt: new Date(parseInt(year), parseInt(month), 1),
        // Start of month -> End of next month, if equals is used its just one day, we want the whole month
      },
    },
    include: { Likes: true
    }
  });

  const postsWithLikes = filteredPosts.map((post) => ({
    ...post,
    likes: post.Likes.length,
  }));

  return (
      
    <AppLayout selectedYear={year} selectedMonth={month}>
      <h1 className="flex items-center justify-center text-sm text-gray-500 font-bold px-4 py-2">Posts from {year}-{month}</h1>
      <Main posts={postsWithLikes} />
    </AppLayout>
  );
}
