'use client'

import Post from "@/yap/components/Post/Post";
import PostList from "@/yap/components/Post/PostList";
import PostModel from "@/yap/db/models/PostModel";
import Loading from "@/yap/components/Loading";
import { useParams } from "next/navigation"
import { useCallback, useState } from "react"
import PostDetailedModel from "@/yap/db/models/PostDetailedModel";
import { useRouter } from "next/navigation";
import getAdditionalPostDetailedItemsList from "@/yap/components/getAdditionalPostDetailedItemsList";

export default function PostDetails() {
    const router = useRouter();
    
    const { id } = useParams();
    const [post, setPost] = useState<PostDetailedModel | undefined>();

    const getPosts = useCallback((async (lastPostId?: string | undefined) => {
        // first request will fetch also a parent post
        if (!lastPostId)
            return fetch(`/api/posts/${id}`)
            .then(response => {
                if (response.status == 404) {
                    router.replace('/post/not-found');
                    return [];
                }
                return response.json();
            })
            .then(response => {
                if (response == undefined)
                    return [];
                const postDetails = response as PostDetailedModel;

                setPost(postDetails as PostDetailedModel); 
                return postDetails.replies;
            })
            .catch(err => { console.error(err); return []});

        return fetch(`/api/posts?lastPostId=${lastPostId}&parentId=${id}`)
            .then(
                (value) => value.json(), 
                (rejection) => [])
            .then((value) => {
                const posts = value as PostModel[];
                return posts;
            })
            .catch((rejected) => []);
      }), [id, router]);

    return (
        <main className="w-full md:w-2/3 xl:w-1/2 justify-self-center h-full divide-y divide-white">
                <>
                    {!post ? <Loading></Loading> : 
                        <section id="post" className="py-4">
                            <Post post={post} additionalInfoListItems={getAdditionalPostDetailedItemsList(post)}></Post>
                        </section>
                    }
                    <section id="replies">
                        <PostList getPosts={getPosts}/> 
                    </section>
                </>
        </main>
    )
}