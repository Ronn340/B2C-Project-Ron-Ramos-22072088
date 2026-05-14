import { products } from "@repo/db/data";
import { AppLayout } from "../components/Layout/AppLayout";
import { Main } from "../components/Main";
import styles from "./page.module.css";
import { client } from "@repo/db/client";
export default async function Home() {

  /* DELETED - replace later 
  const databaseProduct = getall
  const structuredProduct = structured if other table relationships like Likes[]
  */

  return (
    <AppLayout> 
      <Main products={products} className={styles.main} />
    </AppLayout>
  );
}
