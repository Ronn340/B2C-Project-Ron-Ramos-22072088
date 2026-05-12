// import { posts, type Post } from "../components/data";

export async function tags(
  posts: { tags: string; active: boolean }[],
): Promise<{ name: string; count: number }[]> {
  // TODO: Implement per specification
  return posts
    .filter((p) => p.active)
    //Straying from usual logic -R
    .reduce((accumulator, post) => {
      const tags = post.tags.split(",");
      tags.forEach((tag) => {
        const found = accumulator.find((item) => item.name === tag);
        if (found) {
          found.count++;
        } else {
          accumulator.push({ name: tag, count: 1 });
        }
      });

      //Sorting last because all tags is now separated
      accumulator.sort((a, b) => a.name.localeCompare(b.name));
      return accumulator;
    }, [] as { name: string; count: number }[]);
}
