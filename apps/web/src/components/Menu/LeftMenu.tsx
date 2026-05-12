import { client } from "@repo/db/client";
import { CategoryList } from "./CategoryList";
import { HistoryList } from "./HistoryList";
import { TagList } from "./TagList";
import Image from "next/image";



export async function LeftMenu({
  selectedCategory,
  selectedYear,
  selectedMonth,
  selectedTag,
}: {
  selectedCategory?: string; 
  selectedYear?: string; 
  selectedMonth?: string
  selectedTag?: string;
}) {

  const databasePosts = await client.db.post.findMany({
    include: { Likes: true }
  });
  console.log(databasePosts);
  const posts = databasePosts.map((post) => ({
    ...post,
    likes: post.Likes.length,
  }));

  return (
    <div className="w-80   h-screen px-10 py-8">
      {/* Sidebar component, swap this element with another sidebar if you like */}
      <a className="flex items-center gap-2" href="/">
        <Image src="/wsulogo.png" alt="WSU Logo" width={32} height={32} />
        <span className="font-bold text-primary">Full Stack Blog</span>
      </a>
      <nav>
        <CategoryList posts={posts} selectedCategory={selectedCategory} />
        <HistoryList selectedYear={selectedYear} selectedMonth={selectedMonth} posts={posts} />
        <TagList selectedTag={selectedTag} posts={posts} />
      </nav>
    </div>
  );
}
