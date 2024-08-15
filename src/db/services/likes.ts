import { redis } from "../redis/client";
import { getLikeCountKey, getWhatLikedKey } from "../redis/keys";

export async function getPostLikesInfo(postId: string, userId?: string) {
    const pipe = redis.multi();

    pipe.get(getLikeCountKey(postId));
    if (userId)
        pipe.sIsMember(getWhatLikedKey(userId), postId);
    // Execute the pipeline
    const results = await pipe.exec();
    
    const [countVal, likedVal] = results;
    return {
        count: countVal as string || '0',
        liked: likedVal as (boolean | undefined | null) ? (likedVal as (boolean | undefined | null) as boolean) /* Read from db bool value */ : false,
    };
}

export async function getMultiplePostsLikesInfo(postIds: string[], userId?: string): Promise<Map<string, { count: string, liked: boolean}>> {
    if (postIds.length === 0)
        return new Map();
    const redisIds = postIds.map((postId) => getLikeCountKey(postId));


    const pipe = redis.multi();
    pipe.mGet(redisIds);
    if (userId)
        pipe.smIsMember(getWhatLikedKey(userId), postIds);

    const results = await pipe.exec();
    const [likeCounts, likedList] = [results[0] as string[] | undefined | null, results[1] as string[] | undefined | null];
    if (!likeCounts)
        return new Map();

    return new Map(likeCounts.map((likeCount, i) => (
        [ postIds[i],
        { count: likeCount || '0',
          liked: (likedList ? likedList[i] : '0') === '1', }]
    )));
}

/**
 * 
 * @param userId 
 * @param postId 
 * @param expectToBeLiked optional variable that will block like/dislike process if it expects it to be in different state
 * @returns current number of likes or null when action is blocked
 */
export async function likeOrDislikePost(userId: string, postId: string, expectToBeLiked?: boolean): Promise<number | null> {
    const whatUserLikedKey = getWhatLikedKey(userId);
    const isLiked = await redis.sIsMember(whatUserLikedKey, postId);
    if (expectToBeLiked !== undefined && expectToBeLiked !== isLiked)
        return null;

    const pipe = redis.multi();

    const likeCountKey = getLikeCountKey(postId);
    if (isLiked) {
        pipe.decr(likeCountKey);
        pipe.sRem(whatUserLikedKey, postId);
    } else {
        pipe.incr(likeCountKey);
        pipe.sAdd(whatUserLikedKey, postId);
    }

    const results = await pipe.exec();
    return results[0] as (number | undefined | null) || 0;
}