import { ReactNode } from "react";

type HoverIconProps = {
    color: string,
    hoverColor: string,
    content: string,
    icon: ReactNode,
    handleOnClick?: () => void
}

export default HoverIconProps;