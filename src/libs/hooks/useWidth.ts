'use client'

import { useEffect, useState } from "react";

export default function useWidth() {
    // prevent error showing when prerendering on the server side
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const resize = () => setWidth(window.innerWidth);
        resize();
        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, []);

    return { width };
}