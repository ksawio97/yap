import { useEffect, useState } from "react";
import HoverIcon from "../icons/hover/HoverIcon";
import LikeIcon from "../icons/LikeIcon";
import ClickedLikeIcon from "../icons/ClickedLikeIcon";
import { useLikeQueue } from "@/yap/libs/contexts/useLikeQueue";
import { useSession } from "next-auth/react";

export default function PostLike({ postId, likeCount, liked } : { postId: string, likeCount: string, liked: boolean}) {
    const { status } = useSession();
    const { updateLike, onLikeCountChange, getLikeUpdate } = useLikeQueue();

    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState(likeCount);

    useEffect(() => {
        const unsubscribe = onLikeCountChange(postId, (likes) => {
            setLikes(likes);
        });
        return () => { unsubscribe()};
    }, [onLikeCountChange, postId]);

    useEffect(() => {
        // change ui
        setIsLiked(liked);
    }, [liked]);

    // check like updates that will be sent to server and update UI
    useEffect(() => {
        const likeUpdate = getLikeUpdate(postId);
        if (!likeUpdate)
            return;
        if (isLiked === likeUpdate.liked)
            return;
        setIsLiked(likeUpdate.liked);
        setLikes(likes => String(Number(likes) + (likeUpdate.liked ? 1 : -1)))
    }, [postId, getLikeUpdate, isLiked]);

    const isLikedChange = () => {
        // add/remove like from post and update ui
        ((liked: boolean) => 
            updateLike(postId, liked)
        )(!isLiked);
        setLikes((likes) => String(Number(likes) + (!isLiked ? 1 : -1)));
        setIsLiked(!isLiked);
    }
    return (
        <div className={`${status === "authenticated" /* block click if not logged in */ ? "" : "pointer-events-none"}`}>
            <HoverIcon color="#64748b" hoverColor="red" content={likes} icon={
                <DynamicLikeIcon liked={isLiked}></DynamicLikeIcon>
            } handleOnClick={
                () => { if (status === "authenticated") isLikedChange(); }
            }></HoverIcon>
        </div>
    );
}

const DynamicLikeIcon = ({ liked }: { liked: boolean }) => {
    return (<div>
        { liked ? <ClickedLikeIcon/> : <LikeIcon/>}
    </div>)
}