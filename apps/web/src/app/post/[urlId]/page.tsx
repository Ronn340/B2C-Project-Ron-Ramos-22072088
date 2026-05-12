import { AppLayout } from "@/components/Layout/AppLayout";
import { BlogDetail } from "@/components/Blog/Detail";
import { client } from "@repo/db/client";
export default async function Page({
  params,
}: {
  params: Promise<{ urlId: string }>;
}) {
  const { urlId } = await params;

  const post = await client.db.post.findFirst({
    where: {
      AND: [
        { urlId },
        { active: true }
      ]
    },
    include: { Likes: true }
  });

  if (!post) {
    return <AppLayout>
      Article not found
    </AppLayout>;
  }
  const structuredPost = {
    ...post,
    likes: post.Likes.length,
  };

  return <AppLayout>
    <BlogDetail key={post.id} post={structuredPost} />
  </AppLayout>;
}
