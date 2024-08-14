import { useEffect, useState } from "react";
import HoverIcon from "../icons/hover/HoverIcon";
import LikeIcon from "../icons/LikeIcon";
import ClickedLikeIcon from "../icons/ClickedLikeIcon";

// TODO update parent post prop like variable to be up to date without much rerendering
export default function PostLike({ postId, likeCount, liked } : { postId: string, likeCount: string, liked: boolean}) {
    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState(likeCount);

    useEffect(() => {
        // change ui
        setIsLiked(liked);
    }, [liked]);

    useEffect(() => {
        // TODO figure how to reduce calling this endpoints
        // add/remove like from post and update ui
        fetch(`/api/posts/like/${isLiked ? "remove" : "add"}/${postId}`, { method: "POST"})
            .then(async (response) => {
                if (!response.ok)
                    return;

                const { likes } = await response.json();
                if (likes)
                    setLikes(likes.toString());
        });
    }, [isLiked]);
    return (
        <HoverIcon color="#64748b" hoverColor="red" content={likes} icon={
            <DynamicLikeIcon liked={isLiked}></DynamicLikeIcon>
        } handleOnClick={
            () => setIsLiked(!isLiked)
        }></HoverIcon>
    );
}

const DynamicLikeIcon = ({ liked }: { liked: boolean }) => {
    return (<div>
        { liked ? <LikeIcon/> : <ClickedLikeIcon/>}
    </div>)
}