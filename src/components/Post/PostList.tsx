import PostModel from "@/yap/db/models/PostModel";
import Post from "./Post";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../Loading";
import { useEffect, useState } from "react";


export default function PostList({ getPosts }: { getPosts: (lastPostId?: string | undefined) => Promise<PostModel[]>} ) {
    const [posts, setPosts] = useState<PostModel[]>([]);
    const [hasMore, setHasMore] = useState(true);

    // get some base data
    useEffect(() => {
        getPosts()
            .then(newPosts => {
                if (newPosts.length === 0)
                {
                    setHasMore(false);
                    return;
                }
                setPosts(newPosts);
            });
    }, [getPosts])

    const next = async () => {
        const lastPostId = posts[posts.length - 1]?.id || undefined;
        const olderPosts = await getPosts(lastPostId);
        // no more is available, block trying to fetch more
        if (olderPosts.length === 0) {
            setHasMore(false);
            return;
        }
        setPosts((posts) => [...posts, ...olderPosts]);
    }

    return (
        <section className="w-full flex flex-col gap-8 py-8">
            <InfiniteScroll 
                dataLength={posts.length}
                // if end is reached try get more
                next={next} 
                hasMore={hasMore}
                loader={<Loading></Loading>}>
            {posts.map((post, i) => 
                <Post key={`Post-${post.id}`} onPostSelfDelete={() => { 
                        setPosts([...posts.slice(0, i), ...posts.slice(i + 1)]);
                        if (hasMore)
                            next();
                    } } post={post}>
                </Post>
            )}
            </InfiniteScroll>
        </section>
    )
}