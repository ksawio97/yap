import { redis } from "./client";

function getKey(userId: string) {
    return `user:${userId}:liked`;
}

export async function markLike(userId: string, postsIds: string[]) {
    const key = getKey(userId);
    
    await redis.sAdd(key, postsIds);
}

export async function markDislike(userId: string, postsIds: string[]) {
    const key = getKey(userId);
    
    await redis.sRem(key, postsIds);
}

export async function areLiked(userId: string, postsIds: string[]) {
    const key = getKey(userId);

    return await redis.smIsMember(key, postsIds);
}