import { isLoggedIn } from "../utils/auth";
import styles from "./page.module.css";
import { Login } from "../components/Login";
import { Logout } from "../components/Logout";
import { BlogListWithFilter } from "../components/Blog/BlogListWithFilter";
import { client } from "@repo/db/client";
import Image from 'next/image'

export default async function Home() {
  // use the is logged in function to check if user is authorised
  // we will use the cookie based approach
  const loggedIn = await isLoggedIn();

  const databasePosts = await client.db.post.findMany({
    include: { Likes: true }
  });
  const filteredPosts = databasePosts.map((post) => ({
    ...post,
    likes: post.Likes.length,
  }));
  
  if (!loggedIn) {
    return <main><Login /></main>;
  } else {
    return (
      <div>
        <header className="flex items-center w-full border-gray-200 border-b py-3">
          <Image src="/wsulogo.png" alt="WSU Logo" width={32} height={32} className="mx-4" />
          <h1 className="text-primary text-xl font-bold p-4">Admin of Full Stack Blog</h1>
          <div className="ml-auto mx-4">
            <Logout />
          </div>
        </header>

        <main className={styles.main}>
          <div>
            <div>
              <BlogListWithFilter posts={filteredPosts} />
            </div>
          </div>

        </main>
      </div>
    );
  }
}
