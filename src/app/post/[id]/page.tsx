'use client'

import Post from "@/yap/components/Post/Post";
import PostList from "@/yap/components/Post/PostList";
import PostModel from "@/yap/db/models/PostModel";
import Loading from "@/yap/components/Loading";
import { notFound, useParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
import PostDetailedModel from "@/yap/db/models/PostDetailedModel";
import { useRouter } from "next/navigation";

export default function PostDetails() {
    const router = useRouter();
    
    const { id } = useParams();
    const [post, setPost] = useState<PostModel | undefined>();
    const [replies, setReplies] = useState<PostModel[] | undefined>();

    useEffect(() => {
        (async () => {
            fetch(`/api/posts/${id}`)
                .then(response => {
                    if (response.status == 404) {
                        router.replace('/post/not-found');
                        throw new Error('404 page not found')
                    }
                    return response.json();
                })
                .then(response => {
                    if (response == undefined)
                        return;
                    const postDetails = response as PostDetailedModel;
                    setPost(postDetails as PostModel); 
                    setReplies(postDetails.replies);
                })
                .catch(err => console.error(err));
        })();
    }, []);

    return (
        <main className="w-full md:w-2/3 xl:w-1/2 justify-self-center h-full divide-y divide-white">
            {!post || !replies ? <Loading></Loading> :
                <>
                    <section id="post" className="py-4">
                        <Post post={post}></Post>
                    </section>
                    {   replies.length == 0 ? <></> :
                        <section id="replies">
                            <PostList posts={replies}/> 
                        </section>
                    }
                </>
            }
        </main>
    )
}