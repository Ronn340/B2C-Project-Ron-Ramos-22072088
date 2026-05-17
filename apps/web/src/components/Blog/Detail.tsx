"use client";
import { useState } from "react";

type ProductImage = {
  id: number;
  url: string;
  position: number;
};

type Product = {
  id: number;
  name: string;
  articleType: string;
  gender: string;
  sizes: string;
  rating: number;
  description: string;
  colour: string;
  price: number;
  stock: number;
  images: ProductImage[];
};

export function ProductDetail({ product }: { product: Product }) {

  const [selectedSize, setSelectedSize] = useState("");
  const [activeImage, setActiveImage] = useState(0);
  const sizes = product.sizes.split(",");

  return <div className="grid grid-cols-2 gap-4 mt-8">
    {/* Grid Laout - 50/50 image<->info */}
    <div className="flex flex-row gap-4 justify-center">
      <img
        src={product.images[activeImage]?.url}
        alt={product.name}
        className="w-1/2 h-auto object-cover rounded-lg justify-self-center aspect-3/4 border-1 border-secondary"
      />
      <div className="flex flex-col gap-4">
        {product.images.map((img, index) => (
          <img
            key={img.id}
            src={img.url}
            onClick={() => setActiveImage(index)}
            className="w-30 h-30 object-cover rounded-lg cursor-pointer border-1 border-secondary"
          />
        ))}
      </div>
    </div>

    <div className="flex flex-col gap-4 px-4">
      <span className="text-sm text-gray-500 uppercase tracking-wide mb-1">
        {product.articleType} | {product.gender}
      </span>
      <h1 className="text-2xl font-bold text-primary">{product.name}</h1>
      <p className="text-xl font-semibold text-primary">{product.price.toLocaleString("en-AU", { style: "currency", currency: "AUD" })}</p>
      <div className="flex flex-row gap-2 items-center">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => setSelectedSize(size)}
            className={`px-4 py-2 border rounded-md ${selectedSize === size ? "bg-primary text-secondary" : "bg-background text-primary border-primary"}`}
          >
            {size}
          </button>
        ))}
      </div>
      <div>
        <p className="text-lg font-semibold text-gray-500 mb-1">Description</p>
        <p className="text-lg text-gray-500">{product.description}</p>
      </div>
      <button 
        disabled={!selectedSize || product.stock === 0}
        className={`${!selectedSize || product.stock === 0 ? 
          'bg-gray-300 text-secondary py-2 px-4 rounded-full cursor-not-allowed' : 
          'bg-wsu text-primary py-2 px-4 rounded-full hover:bg-secondary hover:text-primary transition-colors'}`}
      >
        {product.stock === 0 ? "Out of Stock" : !selectedSize ? "Select a Size" : "Add to Cart"}
      </button>
    </div>
  </div>
}
