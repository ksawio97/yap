import ProfilePicture from "../Profile/ProfilePicture";
import Like from "./Icons/Like";
import HoverIcon from "./Icons/HoverIcon";
import Share from "./Icons/Share";
import Comment from "./Icons/Comment";
import PostModel from "@/yap/db/models/PostModel";
import timeAgo from "@/yap/libs/timeAgo";
import { useRouter } from "next/navigation";

export default function Post({ post }: {post: PostModel}) {
    const router = useRouter();
    
    return (
        <article className="w-full flex flex-row">
            <div className="w-14 p-2">
                <ProfilePicture></ProfilePicture>
            </div>
            <div className="flex flex-col w-full">
                <div className="w-full flex flex-row gap-2">
                    <h3 className="text-white font-bold">{post.author.name}</h3>
                    {/* TODO update timeAgo every 1 minute */}
                    <p className="font-light text-gray-400">{timeAgo(new Date(post.published))}</p>
                </div>
                <p className="p-1">{post.content}</p>
                <div className="grid grid-cols-3 px-8 py-2 text-gray-500">
                    <HoverIcon color="#64748b" hoverColor="red" content={post.likes.toString()} icon={<Like/>}></HoverIcon>
                    <HoverIcon color="#64748b" hoverColor="blue" content={post._count.replies.toString()} icon={<Comment/>} handleOnClick={() => {
                        router.push(`/post/${post.id}`);
                    }}></HoverIcon>
                    <HoverIcon color="#64748b" hoverColor="orange" content={"Share"} icon={<Share/>} handleOnClick={() => {
                        // TODO ADD copy to Clipboard behavior
                    }
                    }></HoverIcon>
                </div>
            </div>
        </article>
    )
}