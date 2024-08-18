import { useEffect, useState } from "react";
import HoverIcon from "../icons/hover/HoverIcon";
import LikeIcon from "../icons/LikeIcon";
import ClickedLikeIcon from "../icons/ClickedLikeIcon";
import { useLikeQueue } from "@/yap/libs/hooks/useLike";

// TODO update parent post prop like variable to be up to date without much rerendering
export default function PostLike({ postId, likeCount, liked } : { postId: string, likeCount: string, liked: boolean}) {
    const { updateLike } = useLikeQueue();

    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState(likeCount);

    useEffect(() => {
        // change ui
        setIsLiked(liked);
    }, [liked]);

    const isLikedChange = () => {
        // add/remove like from post and update ui
        ((liked: boolean) => 
            updateLike(postId, liked)
        )(isLiked);
        setLikes((likes) => String(Number(likes) + (!isLiked ? 1 : -1)));
        setIsLiked(!isLiked);
    }
    return (
        <HoverIcon color="#64748b" hoverColor="red" content={likes} icon={
            <DynamicLikeIcon liked={isLiked}></DynamicLikeIcon>
        } handleOnClick={
            () => isLikedChange()
        }></HoverIcon>
    );
}

const DynamicLikeIcon = ({ liked }: { liked: boolean }) => {
    return (<div>
        { liked ? <ClickedLikeIcon/> : <LikeIcon/>}
    </div>)
}