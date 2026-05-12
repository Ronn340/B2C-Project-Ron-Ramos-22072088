import { posts } from "@repo/db/data";
import { AppLayout } from "../components/Layout/AppLayout";
import { Main } from "../components/Main";
import styles from "./page.module.css";
import { client } from "@repo/db/client";
export default async function Home() {
  const databasePosts = await client.db.post.findMany({
    include: { Likes: true }
  });
  const filteredPosts = databasePosts.filter((post) => post.active).map((post) => ({
    ...post,
    likes: post.Likes.length,
  }));
  return (
    <AppLayout> 
      <Main posts={filteredPosts} className={styles.main} />
    </AppLayout>
  );
}
