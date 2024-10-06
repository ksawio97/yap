import { useSession } from "next-auth/react";
import HoverIcon from "../icons/hover/HoverIcon";
import ReplyIcon from "../icons/ReplyIcon";

export default function PostReply({ handleOnClick }: { handleOnClick: () => void }) {
    const { status } = useSession();
    
    return (
        <div className={`${status === "authenticated" ? "" : "pointer-events-none"}`}>
        <HoverIcon color="#64748b" hoverColor="darkgreen" content="Reply" icon={<ReplyIcon/>} handleOnClick={handleOnClick}>
            
        </HoverIcon>
        </div>
    )
}