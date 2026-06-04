export type Product = {
  id: number;
  urlId: string;

  name: string;
  articleType : string;
  gender: string;
  sizes : string;
  rating: number;
  imageUrl: string;
  description: string;
  colour : string;

  price: number;
  stock: number;

  active: boolean;
  createdAt: Date;
  images: ProductImage[];
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
    urlId: "black-long-coat",
    name: "Black Long Coat",
    articleType: "Jacket",
    gender: "Women",
    sizes: "S,M,L",
    rating: 4.5,
    imageUrl: "https://images.unsplash.com/photo-1735559001201-f479903b33b6?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "A sleek, tailored long coat in classic black. Structured silhouette with notched lapels and a belted waist for a polished, put-together look.",
    colour: "Black",
    price: 89.99,
    stock: 34,
    active: true,
    createdAt: new Date("2024-01-10"),
    images: [],
  },
  {
    id: 2,
    urlId: "cotton-sweater-gray",
    name: "Cotton Sweater",
    articleType: "Sweater",
    gender: "Women",
    sizes: "XS,S,M,L,XL",
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1644902501899-40f739f6d011?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "A lightweight cotton sweater in a soft grey tone. Relaxed fit with ribbed cuffs and hem — effortlessly versatile for any casual occasion.",
    colour: "Gray",
    price: 59.90,
    stock: 21,
    active: true,
    createdAt: new Date("2024-01-10"),
    images: [],
  },
  {
    id: 3,
    urlId: "tech-cargo-pants",
    name: "Tech Cargo Pants",
    articleType: "Pants",
    gender: "Women",
    sizes: "XS,S,M,L,XL",
    rating: 4.5,
    imageUrl: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Functional tech cargo pants with multiple utility pockets and a tapered leg. Water-resistant fabric keeps you ready for anything the day throws at you.",
    colour: "Black",
    price: 79.90,
    stock: 18,
    active: true,
    createdAt: new Date("2024-02-01"),
    images: [],
  },
  {
    id: 4,
    urlId: "cotton-sweater-black",
    name: "Cotton Sweater",
    articleType: "Sweater",
    gender: "Men",
    sizes: "S,M,L,XL,XXL",
    rating: 4.5,
    imageUrl: "https://images.unsplash.com/photo-1614495039368-525273956716?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "The same great cotton sweater in a sharp black colourway. Clean, minimal design that pairs well with chinos, joggers, or jeans.",
    colour: "Black",
    price: 59.90,
    stock: 0,
    active: true,
    createdAt: new Date("2024-02-01"),
    images: [],
  },
  {
    id: 5,
    urlId: "oversized-merino-shirt-black",
    name: "Oversized Merino Shirt",
    articleType: "Shirt",
    gender: "Men",
    sizes: "XS,S,M,L,XL,XXL",
    rating: 4.2,
    imageUrl: "https://images.unsplash.com/photo-1633756887168-44c79bddf8b3?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Oversized merino wool shirt with a relaxed drape and dropped shoulders. Naturally breathable and temperature-regulating for year-round wear.",
    colour: "Black",
    price: 89.90,
    stock: 60,
    active: true,
    createdAt: new Date("2024-03-05"),
    images: [],
  },
  {
    id: 6,
    urlId: "pleated-pants-white",
    name: "Pleated Pants",
    articleType: "Pants",
    gender: "Men",
    sizes: "28,30,32,34,36",
    rating: 4.3,
    imageUrl: "https://images.unsplash.com/photo-1663593185972-4c3d2c1b9535?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Tailored pleated pants in crisp white. Wide-leg silhouette with a high waist and clean front pleats — smart enough for the office, easy enough for weekends.",
    colour: "White",
    price: 69.90,
    stock: 45,
    active: true,
    createdAt: new Date("2024-03-05"),
    images: [],
  },
  {
    id: 7,
    urlId: "cotton-hoodie-white",
    name: "Cotton Hoodie",
    articleType: "Hoodie",
    gender: "Unisex",
    sizes: "XS,S,M,L,XL,XXL",
    rating: 4.6,
    imageUrl: "https://images.unsplash.com/photo-1688111421205-a0a85415b224?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "A classic cotton hoodie in clean white. Heavyweight French terry fabric with a kangaroo pocket and adjustable drawstring hood for everyday comfort.",
    colour: "White",
    price: 69.90,
    stock: 12,
    active: true,
    createdAt: new Date("2024-04-01"),
    images: [],
  },
  {
    id: 8,
    urlId: "fleece-jacket-olive",
    name: "Fleece Jacket",
    articleType: "Jacket",
    gender: "Unisex",
    sizes: "XS,S,M,L,XL",
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1617948053081-99416f60adae?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Cosy fleece jacket in a muted olive tone. Zip-up front with a relaxed fit and soft brushed interior — the perfect mid-layer for transitional weather.",
    colour: "Olive",
    price: 79.90,
    stock: 0,
    active: false,
    createdAt: new Date("2023-11-15"),
    images: [],
  },
];

export type ProductImage = {
  id: number;
  url: string;
  position: number;
  productId: number;
};

export const productImages: ProductImage[] = [
  // Product 1 - Long Coat Black W
  { id: 1, url: "https://images.unsplash.com/photo-1735559001201-f479903b33b6?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", position: 0, productId: 1 },
  { id: 2, url: "https://images.unsplash.com/photo-1683642765591-2370edc15193?q=80&w=1065&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", position: 1, productId: 1 },
  { id: 3, url: "https://images.unsplash.com/photo-1739829315701-e931761a31c8?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", position: 2, productId: 1 },

  // Product 2 - Cotton Sweater Gray W
  { id: 4, url: "https://images.unsplash.com/photo-1644902501899-40f739f6d011?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", position: 0, productId: 2 },
  { id: 5, url: "https://images.unsplash.com/photo-1666443762372-c86511e64151?q=80&w=927&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", position: 1, productId: 2 },
  { id: 6, url: "https://images.unsplash.com/photo-1692558588261-124d6c60f872?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", position: 2, productId: 2 },

  // Product 3 - Tech Cargo Pants W
  { id: 7, url: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", position: 0, productId: 3 },
  { id: 8, url: "https://images.unsplash.com/photo-1552902875-9ac1f9fe0c07?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", position: 1, productId: 3 },
  { id: 9, url: "https://images.unsplash.com/photo-1552902831-bb0e060ac5a2?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", position: 2, productId: 3 },

  // Product 4 - Cotton Sweater Black M
  { id: 10, url: "https://images.unsplash.com/photo-1614495039368-525273956716?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", position: 0, productId: 4 },
  { id: 11, url: "https://images.unsplash.com/photo-1614495039268-aa9a80429b66?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", position: 1, productId: 4 },
  { id: 12, url: "https://images.unsplash.com/photo-1614495039153-e9cd13240469?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", position: 2, productId: 4 },

  // Product 5 - Oversized Merino Shirt Black M
  { id: 13, url: "https://images.unsplash.com/photo-1633756887168-44c79bddf8b3?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", position: 0, productId: 5 },
  { id: 14, url: "https://images.unsplash.com/photo-1604995280227-6022e890f62b?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", position: 1, productId: 5 },
  { id: 15, url: "https://images.unsplash.com/photo-1597237565086-997009b1677e?q=80&w=1065&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", position: 2, productId: 5 },

  // Product 6 - Pleated Pants White M
  { id: 16, url: "https://images.unsplash.com/photo-1663593185972-4c3d2c1b9535?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", position: 0, productId: 6 },
  { id: 17, url: "https://images.unsplash.com/photo-1693071093573-9e8e342aebeb?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", position: 1, productId: 6 },
  { id: 18, url: "https://images.unsplash.com/photo-1735653193631-fd8ec61ff9db?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", position: 2, productId: 6 },

  // Product 7 - Cotton Hoodie White Unisex
  { id: 19, url: "https://images.unsplash.com/photo-1688111421205-a0a85415b224?q=80&w=988&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", position: 0, productId: 7 },
  { id: 20, url: "https://images.unsplash.com/photo-1663573688938-2b3e7ea2ab33?q=80&w=968&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", position: 1, productId: 7 },
  { id: 21, url: "https://images.unsplash.com/photo-1611768309028-04a36c8a4cec?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", position: 2, productId: 7 },

  // Product 8 - Fleece Jacket Olive Unisex
  { id: 22, url: "https://images.unsplash.com/photo-1617948053081-99416f60adae?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", position: 0, productId: 8 },
  { id: 23, url: "https://images.unsplash.com/photo-1617948029795-b489be36b518?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", position: 1, productId: 8 },
  { id: 24, url: "https://images.unsplash.com/photo-1548883354-94bcfe321cbb?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", position: 2, productId: 8 }
];
