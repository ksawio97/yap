import { ReactNode } from "react";
import PostModel from "../db/models/PostModel";
import PostDetailedModel from "../db/models/PostDetailedModel";
import Link from "next/link";
import timeAgo from "../libs/timeAgo";

export function getAdditionalPostItemsList(post: PostModel): ReactNode {
    return (<li>{timeAgo(new Date(post.published))}</li>);
}

export function getAdditionalPostDetailedItemsList(post: PostDetailedModel): ReactNode {
    return (<>
        {getAdditionalPostItemsList(post)}
        {post.parent !== null && post.parent.author.name !== null && 
        <li className="text-emerald-300">
            <Link href={`/post/${post.parent.id}`} className="flex">
                <span className="text-xs self-center p-1">•</span> Reply to: {post.parent.author.name}
            </Link>
        </li>
        }
    </>);
}