import HoverIcon from "../icons/hover/HoverIcon";
import ReplyIcon from "../icons/ReplyIcon";

export default function PostReply({ handleOnClick }: { handleOnClick: () => void }) {
    return (
        <HoverIcon color="#64748b" hoverColor="darkgreen" content="Reply" icon={<ReplyIcon/>} handleOnClick={handleOnClick}>
            
        </HoverIcon>
    )
}