import type { Product } from "@repo/db/data";
import { ProductListItem } from "./ListItem";

export function ProductList({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return <div className="py-6 flex justify-center">0 Products</div>;
  }
  return (
    <div className="grid grid-cols-4 gap-6 py-6 px-4">
      {products.map((product) => (
        <ProductListItem key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;