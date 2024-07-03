'use client'

import { ReactNode, memo } from "react";

const HoverIcon = memo(function HoverIcon({color, hoverColor, content, icon, handleOnClick}: {color: string, hoverColor: string, content: string, icon: ReactNode, handleOnClick?: () => void}) {
    return (
        <>
            <style jsx>{`
                .hover-icon {
                    stroke: ${color}
                }
                .hover-icon:hover div {
                    stroke: ${hoverColor};
                    box-shadow: ${hoverColor} 0px 0px 128px 4px;
                    border-radius: 50%;
                }
            `}</style>
            <div className="flex flex-row gap-1 hover-icon w-fit p-2 select-none" onClick={handleOnClick}>
                <div className="w-fit h-fit shadow">
                    {icon}
                </div>
                <p color={color}>{content}</p>
            </div>
        </>
    );
})

export default HoverIcon;