import { redis } from "../redis/client";

export async function getPostLikesInfo(postId: string, userId?: string) {
    const likesKey = `post:${postId}:like_count`;
    
    return {
        count: await redis.get(likesKey) || '0',
        liked: userId ? await redis.sIsMember(likesKey, userId) : false
    };
}

export async function getMultiplePostsLikesInfo(postIds: string[], userId?: string) {
    const redisIds = postIds.map((postId) => `post:${postId}:like_count`);
    if (redisIds.length === 0)
        return new Map();
    const likesCounts = await redis.mGet(redisIds);
    const results = await Promise.all(likesCounts.map<Promise<[string, { count: string, liked: boolean}]>>(async (likeCount, i) => [postIds[i], { 
        count: likeCount || '0',
        liked: userId ? await redis.sIsMember(postIds[i], userId) : false
    }]));

    return new Map(results);
}