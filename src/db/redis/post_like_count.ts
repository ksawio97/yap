import { redis } from "./client";

function getKey(postId: string) {
    return `post:${postId}:like_count`;
}

export async function like(postsIds: string[]) {
    const keys = postsIds.map((postId) => getKey(postId));
    const pipe = redis.multi();

    keys.forEach((key) => {
        pipe.incr(key);
    })

    const results = await pipe.exec();
    return new Map(postsIds.map((postId, i) => [postId, results[i] as number | null]));
}

export async function dislike(postsIds: string[]) {
    const keys = postsIds.map((postId) => getKey(postId));
    const pipe = redis.multi();
    
    keys.forEach((key) => {
        pipe.decr(key);
    })

    const results = await pipe.exec();
    return new Map(postsIds.map((postId, i) => [postId, results[i] as number | null]));
}

export async function areLikesCounted(postsIds: string[]) {
    const keys = postsIds.map(postId => getKey(postId));

    const results = await redis.mGet(keys);
    return results.map(result => result !== null);
}