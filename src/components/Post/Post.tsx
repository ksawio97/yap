import ProfilePicture from "../Profile/ProfilePicture";
import HoverIcon from "../icons/hover/HoverIcon";
import ShareIcon from "../icons/ShareIcon";
import CommentIcon from "../icons/CommentIcon";
import PostModel from "@/yap/db/models/PostModel";
import { useRouter } from "next/navigation";
import getURL from "@/yap/libs/getURL";
import HoverIconWithPopup from "../icons/hover/HoverIconWithPopup";
import PostDetailedModel from "@/yap/db/models/PostDetailedModel";
import { ReactNode } from "react";
import PostLike from "./PostLike";

type PostProps = {
    post: PostModel | PostDetailedModel,
    getAdditionalListItems: (post: PostModel | PostDetailedModel) => ReactNode,
}

export default function Post({ post, getAdditionalListItems }: PostProps) {
    const router = useRouter();
    
    return (
        <article className="w-full flex flex-row">
            <div className="w-14 p-2">
                <ProfilePicture sizeMultiplier={1}></ProfilePicture>
            </div>
            <div className="flex flex-col w-full">
                <div className="w-full flex flex-row gap-2">
                    <h3 className="text-white font-bold">{post.author.name}</h3>
                    {/* TODO update timeAgo every 1 minute */}
                    <ul className="font-light text-gray-400 flex flex-row gap-1">
                        {getAdditionalListItems(post)}
                    </ul>
                </div>
                <p className="p-1">{post.content}</p>
                <div className="grid grid-cols-3 px-8 py-2 text-gray-500">
                    <PostLike postId={post.id} likeCount={post.likes.count} liked={post.likes.liked}></PostLike>
                    <HoverIcon color="#64748b" hoverColor="blue" content={post._count ? post._count.replies.toString() : '0' } icon={<CommentIcon/>} handleOnClick={() => {
                        router.push(`/post/${post.id}`);
                    }}></HoverIcon>

                    <HoverIconWithPopup color="#64748b" hoverColor="orange" content="Share" icon={<ShareIcon/>}
                        popupProps={{
                            message: "Copied to clipboard!",
                            color: "white",
                            backgroundColor: "rgb(245 158 11 / var(--tw-bg-opacity))"
                        }}
                        handleOnHoverIconClick={() => {
                            navigator.clipboard.writeText(getURL(`/post/${post.id}`));
                        }}/>
                    
                </div>
            </div>
        </article>
    )
}