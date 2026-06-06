import { AppLayout } from "../components/Layout/AppLayout";
import { Main } from "../components/Main";
import styles from "./page.module.css";
import { client } from "@repo/db/client";
export default async function Home() {

  const products = await client.db.product.findMany({
    where: { active: true },
    include: { images: true, sizeStocks: true }, // Eager load related images and size stocks
  });

  return (
    <AppLayout> 
      <Main products={products} className={styles.main} />
    </AppLayout>
  );
}
