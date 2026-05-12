import { categories } from "@/functions/categories";
import type { Post } from "@repo/db/data";
import { toUrlPath } from "@repo/utils/url";
import { SummaryItem } from "./SummaryItem";
import Link from "next/link";
import { LinkList } from "./LinkList";

export function CategoryList({ posts, selectedCategory }: { posts: Post[]; selectedCategory?: string }) {
  // TODO: Implement proper category list

  const categoryList : { name: string; count: number }[] = [
    { name: "React", count: 0 },
    { name: "Node", count: 0 },
    { name: "Mongo", count: 0 },
    { name: "DevOps", count: 0 },
  ]
  const fromPosts = categories(posts);
  const categoriesWithZero = categoryList.map((category) => {
    const found = fromPosts.find((c) => toUrlPath(c.name) === toUrlPath(category.name));
    return { name: category.name, count: found ? found.count : 0 };
  });


  return (
    <>
    <LinkList title="Categories">
      {categoriesWithZero.map((item) => (
        <SummaryItem
          key={item.name}
          count={item.count}
          name={item.name}
          isSelected={toUrlPath(item.name) === selectedCategory}
          link={`/category/${toUrlPath(item.name)}`}
          title={`Category / ${item.name}`}
        />
      ))}
      </LinkList>
    </>
  );
}
