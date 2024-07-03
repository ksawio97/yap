'use client'

import PostModel from "@/yap/db/models/PostModel"
import { notFound, useParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function PostDetails() {
    const { id } = useParams();
    const [post, setPost] = useState<PostModel | undefined>();
    const [replies, setReplies] = useState<PostModel[]>([]);

    useEffect(() => {
        (async () => {
            fetch(`/api/posts/${id}`)
                .then(response => {
                    // TODO fix it so it will then load not-found page
                    if (response.status == 404) {
                        notFound();
                    }
                    return response.json();
                })
                .then(response => setPost(response as PostModel))
                .catch(err => console.error(err));
        })();
    }, []);
    // TODO load replies from post
    useEffect(() => {

    }, [post]);


    return (
        <section>
            Post details
        </section>
    )
}