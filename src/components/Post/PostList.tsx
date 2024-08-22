import PostModel from "@/yap/db/models/PostModel";
import Post from "./Post";
export default function PostList({ posts }: {posts: PostModel[]}) {
    return (
        <section className="w-full flex flex-col gap-8 py-8">
            {posts.map((post) => 
                <Post key={`Post-${post.id}`}
                    post={post}>
                </Post>
            )}
        </section>
    )
}