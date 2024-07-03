'use client'

import { useRouter } from "next/navigation";

export default function PostNotFound() {
    const route = useRouter();

    return (
        <div>
            <h2>Post not found!</h2>
            <button onClick={() => {
            route.back()
            }}>Go back</button>
        </div>
    )
}