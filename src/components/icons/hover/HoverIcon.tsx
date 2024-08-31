'use client'

import { CSSProperties, memo } from "react";
import HoverIconProps from "./HoverIconProps";
import styles from './HoverIcon.module.css';

// enables setting dynamic colors to static css stylesheet
type HoverIconCSSProperties = CSSProperties & {
    '--color'?: string;
    '--hoverColor'?: string;
}

const HoverIcon = memo(function HoverIcon({color, hoverColor, content, icon, handleOnClick}: HoverIconProps) {
    const style: HoverIconCSSProperties = {
        '--color': color,
        '--hoverColor': hoverColor,
    };

    return (
        <>
            <div className={`flex flex-row gap-1 ${styles.hoverIcon} w-fit p-2 select-none`} onClick={handleOnClick} style={style}>
                <span className={`${styles.iconShadow}`}></span>
                <div className="w-fit h-fit shadow">
                    {icon}
                </div>
                <p className="select-none" color={color}>{content}</p>
            </div>
        </>
    );
})

export default HoverIcon;