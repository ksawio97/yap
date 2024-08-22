import { useEffect, useState } from "react";
import getTimeAgo from "../getTimeAgo";

export default function useTimeAgo(date: Date) {
    const [timeAgo, setTimeAgo] = useState(getTimeAgo(date));

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeAgo(getTimeAgo(date));
        }, 1000 * 60 * 60/* 1 minute */);

        return () => clearInterval(interval);
    }, [date]);

    return { timeAgo };
}