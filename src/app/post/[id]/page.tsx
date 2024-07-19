'use client'

import Post from "@/yap/components/Post/Post";
import PostList from "@/yap/components/Post/PostList";
import PostModel from "@/yap/db/models/PostModel";
import Loading from "@/yap/components/Loading";
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import PostDetailedModel from "@/yap/db/models/PostDetailedModel";
import { useRouter } from "next/navigation";
import { getAdditionalPostDetailedItemsList } from "@/yap/components/getAdditionalItemsList";

export default function PostDetails() {
    const router = useRouter();
    
    const { id } = useParams();
    const [post, setPost] = useState<PostDetailedModel | undefined>();
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
                    setPost(postDetails as PostDetailedModel); 
                    setReplies(postDetails.replies);
                })
                .catch(err => console.error(err));
        })();
    }, [id, router]);

    return (
        <main className="w-full md:w-2/3 xl:w-1/2 justify-self-center h-full divide-y divide-white">
            {!post || !replies ? <Loading></Loading> :
                <>
                    <section id="post" className="py-4">
                        <Post post={post} getAdditionalListItems={(p) => getAdditionalPostDetailedItemsList(p as PostDetailedModel)}></Post>
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