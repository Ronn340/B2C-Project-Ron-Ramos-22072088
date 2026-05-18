import type { Product } from "@repo/db/data";
import { ProductListItem } from "./ListItem";

export function ProductList({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return <div className="flex items-center justify-center px-5 py-5 ">
                <span className="text-xl font-bold text-primary p-3 border-y border-wsu">No items found</span>
            </div>
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