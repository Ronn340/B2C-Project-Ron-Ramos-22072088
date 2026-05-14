import type { Product } from "@repo/db/data";
import { BlogListItem } from "./ListItem";

export function BlogList({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return <div className="py-6 flex justify-center">0 Products</div>;
  }
  return (
    <div className="grid grid-cols-4 gap-6 py-6 px-4">
      {products.map((product) => (
        <BlogListItem key={product.id} product={product} />
      ))}
    </div>
  );
}

export default BlogList;