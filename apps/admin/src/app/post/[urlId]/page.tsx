import { client } from "@repo/db/client";
import { Login } from "../../../components/Login";
import { UpdateForm } from "../../../components/UpdateForm";
import { isLoggedIn } from "../../../utils/auth";


export default async function Page({ params } : { params: Promise<{ urlId: string }> }) {
    const loggedIn = await isLoggedIn();
    const { urlId } = await params;
    const databasePost = await client.db.post.findUnique({
        where: { urlId },
        include: { Likes: true }
    });
    const post = databasePost ? { ...databasePost, likes: databasePost.Likes.length } : null; 
    if (!loggedIn) {
        return <div><Login /></div>;
    } else if (!post) {
        return <div>Post not found</div>;
    } else {
        return <div><UpdateForm key={post.id} post={post} /></div>;
    }
}