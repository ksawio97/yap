'use client'

import { ReactNode, memo } from "react";

const HoverIcon = memo(function HoverIcon({color, hoverColor, icon}: {color: string, hoverColor: string, icon: ReactNode}) {
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
            <div className="flex flex-row gap-1 hover-icon w-fit p-2 select-none">
                <div className="w-fit h-fit shadow">
                    {icon}
                </div>
                <p color={color}>472</p>
            </div>
        </>
    );
})

export default HoverIcon;