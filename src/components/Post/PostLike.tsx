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

    const isLikedChange = () => {
        // TODO figure how to reduce calling this endpoints
        // add/remove like from post and update ui
        // function makes sure even when isLiked changes, request stays the same
        ((liked: boolean) => 
            fetch(`/api/posts/like/${liked ? "remove" : "add"}/${postId}`, { method: "POST"})
                .then(async (response) => {
                    if (!response.ok)
                        return;

                    const { likes } = await response.json();
                    console.log(likes);
                    if (likes !== undefined)
                        setLikes(likes.toString());
                })
        )(isLiked);
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