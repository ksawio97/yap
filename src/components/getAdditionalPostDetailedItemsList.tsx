import { ReactNode } from "react";
import PostDetailedModel from "../db/models/PostDetailedModel";
import Link from "next/link";

export default function getAdditionalPostDetailedItemsList(post: PostDetailedModel): ReactNode {
    return (<>
        {post.parent !== null && post.parent.author.name !== null && 
        <li className="text-emerald-300">
            <Link href={`/post/${post.parent.id}`} className="flex">
                <span className="text-xs self-center p-1">•</span> Reply to: {post.parent.author.name}
            </Link>
        </li>
        }
    </>);
}