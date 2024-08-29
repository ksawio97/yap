import { getLastUserPostPublishDate } from "../../services/posts";

const USER_POST_TIMEOUT = 1000 * 60 * 15 /* 15 minutes */
export default async function getUserPostTimeoutLeft(userId: string) {
    const lastPublishDate = await getLastUserPostPublishDate(userId);
    if (!lastPublishDate)
        return 0;
    const now = Date.now();
    
    const difference = now - lastPublishDate.getTime();

    if (difference < USER_POST_TIMEOUT)
        return USER_POST_TIMEOUT - difference;
    return 0;
}

export function timeoutToText(timeout: number) {
    if (timeout < 1000)
        return 'under a second'
    if (timeout < 1000 * 60) {
        const timeLeft = Math.floor(timeout / 1000);
        return `${timeLeft} ${timeLeft === 1 ? 'second' : 'seconds'}`;
    } 
    const timeLeft = Math.floor(timeout / 1000 / 60);
    return `${timeLeft} ${timeLeft === 1 ? 'minute' : 'minutes'}`;
}