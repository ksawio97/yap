'use client'

import { useEffect, useRef, useState } from "react";

export default function useWidthBreakpoint(isReached: (width: number) => boolean) {
    const prevWidth = useRef(0);
    const [reached, setReached] = useState(isReached(prevWidth.current));
    
    useEffect(() => {
        const resize = () => {
            const currReached = isReached(window.innerWidth);
            if (isReached(prevWidth.current) !== currReached)
                setReached(currReached);

            prevWidth.current = window.innerWidth;
        }
        resize();
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, [isReached]);

    return { reached };
}