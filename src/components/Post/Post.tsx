import ProfilePicture from "../Profile/ProfilePicture";
import HoverIcon from "../icons/hover/HoverIcon";
import ShareIcon from "../icons/ShareIcon";
import CommentIcon from "../icons/CommentIcon";
import PostModel from "@/yap/db/models/PostModel";
import { useRouter } from "next/navigation";
import getURL from "@/yap/libs/getURL";
import HoverIconWithPopup from "../icons/hover/HoverIconWithPopup";
import PostDetailedModel from "@/yap/db/models/PostDetailedModel";
import { ReactNode, useState } from "react";
import PostLike from "./PostLike";
import useTimeAgo from "@/yap/libs/hooks/useTimeAgo";
import PostReply from "./PostReply";
import ReplyForm from "./ReplyForm";
import DisappearOnMouseLeaveAfterDelay from "../Wrappers/DisappearOnMouseLeaveAfterDelay";

type PostProps = {
    post: PostModel | PostDetailedModel,
    additionalInfoListItems?: ReactNode 
}

export default function Post({ post, additionalInfoListItems }: PostProps) {
    const router = useRouter();
    const { timeAgo } = useTimeAgo(new Date(post.published));
    const [showReplyForm, setShowReplyForm] = useState(false);
    
    return (
        <div className="flex flex-col">
            <article className="w-full flex flex-row flex-grow-0">
                <div className="w-14 p-2">
                    <ProfilePicture sizeMultiplier={1}></ProfilePicture>
                </div>
                <div className="flex flex-col w-full">
                    <div className="w-full flex flex-row gap-2">
                        {post.author && post.author.name && <h3 className="text-white font-bold">{post.author.name}</h3>}
                        <ul className="font-light text-gray-400 flex flex-row gap-1">
                            <li>{timeAgo}</li>
                            {additionalInfoListItems}
                        </ul>
                    </div>
                    <p className="p-1 break-all">{post.content}</p>
                    <div className="grid grid-cols-4 md:px-8 py-2 text-gray-500">
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
                        <PostReply handleOnClick={() => { setShowReplyForm((prev) => !prev) }}></PostReply>
                    </div>
                </div>
            </article>

            
            { showReplyForm && 
            <DisappearOnMouseLeaveAfterDelay delayAfterMouseLeave={15_000} onDisappear={() => setShowReplyForm(false)}>
                <div className="px-8">
                    <ReplyForm replyToId={post.id} onPostCreated={() => { 
                        setShowReplyForm(false)
                        const navTo = getURL('/post/' + post.id);
                        if (document.location.href === navTo)
                            router.refresh()
                        else
                            router.push(navTo);
                        }}>
                    </ReplyForm>
                </div>
            </DisappearOnMouseLeaveAfterDelay>}
        </div>
    )
}