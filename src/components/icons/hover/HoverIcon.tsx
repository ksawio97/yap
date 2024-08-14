'use client'

import { memo } from "react";
import HoverIconProps from "./HoverIconProps";

const HoverIcon = memo(function HoverIcon({color, hoverColor, content, icon, handleOnClick}: HoverIconProps) {
    return (
        <>
            <style jsx>{`
                .hover-icon {
                    stroke: ${color}
                }
                .hover-icon:hover div {
                    stroke: ${hoverColor};
                    color: ${hoverColor};
                    box-shadow: ${hoverColor} 0px 0px 128px 14px;
                    border-radius: 50%;
                }
            `}</style>
            <div className="flex flex-row gap-1 hover-icon w-fit p-2 select-none" onClick={handleOnClick}>
                <div className="w-fit h-fit shadow">
                    {icon}
                </div>
                <p className="select-none" color={color}>{content}</p>
            </div>
        </>
    );
})

export default HoverIcon;