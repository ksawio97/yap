import { useState } from "react";
import HoverIconProps from "../Props/HoverIconProps";
import HoverIcon from "./HoverIcon";
import PopupMessage from "../PopupMessage";
import PopupMessageProps from "../Props/PopupMessageProps";

type HoverIconWithPopupProps = Omit<HoverIconProps & { popupProps: Omit<PopupMessageProps, 'show'>,  } & { handleOnHoverIconClick?: () => void }, 'handleOnClick'>;

export default function HoverIconWithPopup({ color, hoverColor, content, icon, popupProps, handleOnHoverIconClick }: HoverIconWithPopupProps) {
    const [showPopup, setShowPopup] = useState(false);

    const handleOnClick = () => {
        setShowPopup(true);
        if (handleOnHoverIconClick)
            handleOnHoverIconClick();

        setTimeout(() => {
            setShowPopup(false);
        }, 2000);
    };

    return (
        <div className="h-full">
            <PopupMessage show={showPopup} backgroundColor={popupProps.backgroundColor} color={popupProps.color} message={popupProps.message} />
            <HoverIcon
                color={color}
                hoverColor={hoverColor}
                content={content}
                icon={icon}
                handleOnClick={handleOnClick}
            />
        </div>
    );
}