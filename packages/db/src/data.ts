export type Product = {
  id: number;
  urlId: string;

  name: string;
  articleType : string;
  sizes : string;
  rating: number;
  imageUrl: string;
  description: string;
  colour : string;

  price: number;
  stock: number;

  active: boolean;
  createdAt: Date;
};


/* Prefilling of the hardcoded data is AI generated for demonstration purposes */
/*
 1 inactive                           - for admin
 2 same product but different colour  - colour swatching *optimistic finish of project IGNORE IF NO TIME*
 3 out of stocks                      - for displaying proper disabled state
 1 BIG price                          - format it (thousands separator and 2dp)
 */

export const products: Product[] = [
  {
    id: 1,
    urlId: "fleece-jacket-black",
    name: "Fluffy Fleece Jacket",
    articleType: "Jacket",
    sizes: "XS,S,M,L,XL",
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop",
    description: "A warm, lightweight fleece jacket perfect for layering. Soft brushed interior with a relaxed fit and zip-up front.",
    colour: "Black",
    price: 99999.90,
    stock: 34,
    active: true,
    createdAt: new Date("2024-01-10"),
  },
  {
    id: 2,
    urlId: "fleece-jacket-navy",
    name: "Fluffy Fleece Jacket",
    articleType: "Jacket",
    sizes: "XS,S,M,L,XL",
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1604644401890-0bd678c83788?w=800&auto=format&fit=crop",
    description: "A warm, lightweight fleece jacket perfect for layering. Soft brushed interior with a relaxed fit and zip-up front.",
    colour: "Navy",
    price: 59.90,
    stock: 21,
    active: true,
    createdAt: new Date("2024-01-10"),
  },
  {
    id: 3,
    urlId: "slim-chino-pants-beige",
    name: "Slim Chino Pants",
    articleType: "Pants",
    sizes: "28,30,32,34,36",
    rating: 4.5,
    imageUrl: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&auto=format&fit=crop",
    description: "Clean, tapered chino pants with a slim fit through the thigh. Stretch fabric for all-day comfort.",
    colour: "Beige",
    price: 49.90,
    stock: 18,
    active: true,
    createdAt: new Date("2024-02-01"),
  },
  {
    id: 4,
    urlId: "slim-chino-pants-olive",
    name: "Slim Chino Pants",
    articleType: "Pants",
    sizes: "28,30,32,34,36",
    rating: 4.5,
    imageUrl: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&auto=format&fit=crop",
    description: "Clean, tapered chino pants with a slim fit through the thigh. Stretch fabric for all-day comfort.",
    colour: "Olive",
    price: 49.90,
    stock: 0,
    active: true,
    createdAt: new Date("2024-02-01"),
  },
  {
    id: 5,
    urlId: "oversized-cotton-tee-white",
    name: "Oversized Cotton T-Shirt",
    articleType: "T-Shirt",
    sizes: "XS,S,M,L,XL,XXL",
    rating: 4.3,
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&auto=format&fit=crop",
    description: "100% cotton oversized tee with a dropped shoulder and boxy silhouette. Garment-washed for a lived-in feel.",
    colour: "White",
    price: 29.90,
    stock: 60,
    active: true,
    createdAt: new Date("2024-03-05"),
  },
  {
    id: 6,
    urlId: "oversized-cotton-tee-black",
    name: "Oversized Cotton T-Shirt",
    articleType: "T-Shirt",
    sizes: "XS,S,M,L,XL,XXL",
    rating: 4.3,
    imageUrl: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&auto=format&fit=crop",
    description: "100% cotton oversized tee with a dropped shoulder and boxy silhouette. Garment-washed for a lived-in feel.",
    colour: "Black",
    price: 29.90,
    stock: 45,
    active: true,
    createdAt: new Date("2024-03-05"),
  },
  {
    id: 7,
    urlId: "puffer-vest-grey",
    name: "Lightweight Puffer Vest",
    articleType: "Vest",
    sizes: "S,M,L,XL",
    rating: 4.6,
    imageUrl: "https://images.unsplash.com/photo-1547949003-9792a18a2601?w=800&auto=format&fit=crop",
    description: "Packable puffer vest with heat-retaining fill and a water-resistant shell. Great as a mid-layer or on its own.",
    colour: "Grey",
    price: 69.90,
    stock: 12,
    active: true,
    createdAt: new Date("2024-04-01"),
  },
  {
    id: 8,
    urlId: "ribbed-knit-sweater-camel",
    name: "Ribbed Knit Sweater",
    articleType: "Sweater",
    sizes: "XS,S,M,L,XL",
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&auto=format&fit=crop",
    description: "Soft ribbed knit sweater with a crew neck and relaxed fit. Blended wool fabric keeps you warm without bulk.",
    colour: "Camel",
    price: 79.90,
    stock: 0,
    active: false,
    createdAt: new Date("2023-11-15"),
  },
];