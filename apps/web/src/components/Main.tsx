import { Prisma } from "@prisma/client";
import ProductList from "./Product/List";

type ProductWithRelations = Prisma.ProductGetPayload<{
  include: { images: true; sizeStocks: true }
}>;

export function Main({
  products,
  className,
}: {
  products: ProductWithRelations[];
  className?: string;
}) {
  return (
    <main className={className}>
      <ProductList products={products} />
    </main>
  );
}
