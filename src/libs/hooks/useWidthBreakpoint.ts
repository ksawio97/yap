'use client'

import { useEffect, useState } from "react";
import useWidth from "./useWidth";

export default function useWidthBreakpoint(isReached: (width: number) => boolean) {
    const { width } = useWidth();
    const [reached, setReached] = useState(isReached(width));
    
    useEffect(() => {
        if (reached !== isReached(width))
            setReached(!reached);
    }, [width, isReached, reached]);

    return { reached };
}