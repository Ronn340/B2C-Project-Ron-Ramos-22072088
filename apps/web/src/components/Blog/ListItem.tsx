import type { Product } from "@repo/db/data";
import Link from "next/link";
import { Star } from "lucide-react";

export function ProductListItem({ product }: { product: Product }) {

  const formattedPrice = product.price.toLocaleString("en-AU", {
    style: "currency",
    currency: "AUD",
  });

  const outOfStock = product.stock === 0;
  const sizeList = product.sizes.split(",");

  return (
    <Link href={`/product/${product.urlId}`}>
      <article
        className="group flex flex-col rounded-lg overflow-hidden bg-background hover:shadow-xl hover:bg-primary hover:text-primary transition-shadow"
        data-test-id={`product-${product.id}`}
      >

        {/* Image */}
        <div className="relative">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-72 object-cover"
          />
          {outOfStock && (
            <span className="absolute top-2 left-2 bg-black text-white text-s px-2 py-1 rounded">
              Out of Stock
            </span>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col gap-2 p-4">
          <span className="text-xs text-gray-400 uppercase tracking-wide">
            {product.articleType} | {product.gender}
          </span>


          <span className="font-semibold text-primary group-hover:text-wsu">
            {product.name}
          </span>

          {/* Sizes */}
          <div className="flex gap-1 flex-wrap">
            {sizeList.map((size) => (
              <span
                key={size}
                data-testid={`size-${size}`}
                className="text-xs text-gray-600 border border-gray-300 px-2 py-0.5 rounded"
              >
                {size}
              </span>
            ))}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-primary text-primary group-hover:fill-secondary group-hover:text-background" />
            <span className="text-sm text-gray-600">{product.rating}</span>
          </div>

          {/* Price + colour */}
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-200">
            <span className="font-semibold text-primary group-hover:text-wsu">{formattedPrice}</span>
            <span className="text-xs text-gray-400">{product.colour}</span>
          </div>
        </div>
      </article>
    </Link>
  );

  /* top to bottom reference
  product ~
  imageUrl      ! ! !
  articleType   !
  name          ! !
  PRICE         ! ! !
  sizes         !
  color         - singular for now
  rating
  */
}

export default ProductListItem;