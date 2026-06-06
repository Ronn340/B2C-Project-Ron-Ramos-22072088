import { client } from "./client.js";
import { products, productImages } from "./data.js";
import { toUrlPath } from "@repo/utils/url";

export async function seed() {
  // TODO: Uncomment below once you set up Prisma and loaded data to your database
  console.log("🌱 Seeding data");

  await client.db.orderItem.deleteMany();
  await client.db.order.deleteMany();
  await client.db.cartItem.deleteMany();
  await client.db.cart.deleteMany();
  await client.db.session.deleteMany();
  await client.db.account.deleteMany();
  await client.db.user.deleteMany();
  await client.db.productImage.deleteMany();
  await client.db.sizeStock.deleteMany();
  await client.db.product.deleteMany();

  //Create products - main table
  for (const p of products) {
    await client.db.product.create({
      data: {
        id: p.id,
        urlId: p.urlId,
        name: p.name,
        articleType: p.articleType,
        gender: p.gender,
        rating: p.rating,
        imageUrl: p.imageUrl,
        description: p.description,
        colour: p.colour,
        price: p.price,
        stock: p.stock,
        active: p.active,
        createdAt: p.createdAt,
      }
    });
  }

  //Create images - separation for image storage
  for (const i of productImages) {
    await client.db.productImage.create({
      data: {
        id: i.id,
        url: i.url,
        position: i.position,
        productId: i.productId
      }
    })
  }

  // Create size stocks - separation for stock management
  await client.db.sizeStock.createMany({
    data: [
      { productId: 1, size: "XS", stock: 35 },
      { productId: 1, size: "S", stock: 30 },
      { productId: 1, size: "M", stock: 25 },
      { productId: 1, size: "L", stock: 20 },
      { productId: 1, size: "XL", stock: 15 },
    ]
  });

  // Create a user and session for testing
  await client.db.user.create({
    data: {
      id: "user-123",
      email: "ron@test.com",
    }
  });

  await client.db.session.create({
    data: {
      sessionToken: "test-session-token",
      userId: "user-123",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    }
  });

}