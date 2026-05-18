import { client } from "./client.js";
import { products, productImages } from "./data.js";
import { toUrlPath } from "@repo/utils/url";

export async function seed() {
  // TODO: Uncomment below once you set up Prisma and loaded data to your database
  console.log("🌱 Seeding data");

  await client.db.productImage.deleteMany();  //Collapse foreign key relationships FIRST
  await client.db.product.deleteMany();       //Then delete

  //Create products - main table
  for (const p of products) {
    await client.db.product.create({
      data: {
        id: p.id,
        urlId: p.urlId,
        name: p.name,
        articleType: p.articleType,
        gender: p.gender,
        sizes: p.sizes,
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

  // Temporary free user
  await client.db.user.deleteMany();

  await client.db.user.create({
    data: {
      id: "user-123",
      email: "ron@test.com",
    }
  });

}