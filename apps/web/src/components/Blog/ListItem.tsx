import type { Post } from "@repo/db/data";
import Link from "next/link";

export function BlogListItem({ post }: { post: Post }) {
  const formattedDate = new Date(post.date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }); /* https://www.geeksforgeeks.org/javascript/javascript-date-tolocaledatestring-method/ */

  const tagList = post.tags.split(",");

  return (
    <article
      className="flex flex-row gap-6 py-6 ml-5 mr-5"
      data-test-id={`blog-post-${post.id}`}
    >
      <img
        src={post.imageUrl}
        alt={post.title}
        className="w-80 h-60 rounded-lg object-cover shrink-0"
      />
      <div className="flex flex-col gap-2 flex-1">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="font-medium text-wsu">{post.category}</span>
          <span>{formattedDate}</span>
        </div>
        <Link href={`/post/${post.urlId}`} className="text-primary font-semibold hover:text-wsu">
          {post.title}
        </Link>
        <p className="text-sm text-gray-500 line-clamp-2">{post.description}</p>
        <div className="flex items-center gap-3 flex-wrap">
          {tagList.map((tag) => (
            <span key={tag} className="text-xs text-wsu">#{tag}</span>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-2 border-t border-gray-200 pt-2">
          <span className="text-xs text-gray-500">{post.likes} likes</span>
          <span className="ml-auto text-xs text-gray-500">{post.views} views</span>
        </div>
      </div>
    </article>
  );
}