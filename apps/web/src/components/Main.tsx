import type { Product } from "@repo/db/data";
import BlogList from "./Blog/List";

export function Main({
  products,
  className,
}: {
  products: Product[];
  className?: string;
}) {
  return (
    <main className={className}>
      <BlogList products={products} />
    </main>
  );
}
