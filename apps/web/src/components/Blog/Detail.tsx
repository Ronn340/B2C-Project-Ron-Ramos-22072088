import type { Post } from "@repo/db/data";
import { marked } from "marked";
import { Heart, Eye } from 'lucide-react';
import { increaseView } from "@/actions/increaseView";
import { client } from "@repo/db/client";
import { LikeButton } from "./LikeButton";
import { checkLiked } from "@/actions/checkLiked";

export async function BlogDetail({ post }: { post: Post }) {
  const content = await marked.parse(post.content);

  const formattedDate = post.date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }); /* https://www.geeksforgeeks.org/javascript/javascript-date-tolocaledatestring-method/ */

  const taglist = post.tags.split(",");

  //Increase of view count server action
  await increaseView(post.id);
  const updatedPost = await client.db.post.findUnique({
    where: { id: post.id }
  });

  //Check liked status server action
  const isLiked = await checkLiked(post.id);

  return <article data-test-id={`blog-post-${post.id}`} className="px-10 py-10 pr-40">
    <div className="flex items-center gap-2 text-sm text-secondary mb-2">
      <span>{formattedDate}</span>
      <span>{post.category}</span>
    </div>
    <a href={`/post/${post.urlId}`} className="text-2xl font-bold text-primary mb-4">
      {post.title}
    </a>
    <img src={post.imageUrl} alt={post.title} className="w-full rounded-lg max-h-96 object-cover mb-5" />
    <div
      data-test-id="content-markdown"
      dangerouslySetInnerHTML={{ __html: content }}
      className="prose text-secondary mb-5"
    />
    <div className="border-b border-gray-200 mb-5 pb-5">
      {taglist.map((tag) => (
        <span key={tag} className="text-xs text-wsu">#{tag}</span>
      ))}
    </div>
    <div className="flex items-center gap-4">
      <LikeButton postId={post.id} likes={post.likes} isLiked={isLiked} />
      <Eye className="ml-auto w-4 h-4 text-secondary" />
      <span className="text-sm text-gray-500">{updatedPost?.views || 0} views</span>
    </div>

  </article>;
}
