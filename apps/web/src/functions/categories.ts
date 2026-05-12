// import { posts, type Post } from "../components/data";

export function categories<T>(
  posts: { category: string; active: boolean }[],
): { name: string; count: number }[] {
  return posts
    .sort((a, b) => a.category.localeCompare(b.category))
    //a and b are posts being compared i.e. alphabetical sort
    .reduce(
      (acc, post) => {
        const category = acc.find((c) => c.name === post.category);
        //c looks like the current category in accumulator
        if (category) {
          if (post.active) {
            category.count++;
          }
        } else {
          if (post.active) {
            acc.push({ name: post.category, count: 1 });
          } else {
            acc.push({ name: post.category, count: 0 }); // NOTE: mongo and devops land here at 0 posts
          }
        }
        //console.log(acc); Log shows as [ { name: 'React', count: 1 }  ...  {name: 'Node', count: 1 }]
        return acc;
      },
      [] as { name: string; count: number }[],
    );
}