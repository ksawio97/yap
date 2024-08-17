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

export async function getPostsLikesInfo(postsIds: string[], userId?: string): Promise<Map<string, { count: string, liked: boolean}>> {
    if (postsIds.length === 0)
        return new Map();
    const redisIds = postsIds.map((postId) => getLikeCountKey(postId));


    const pipe = redis.multi();
    pipe.mGet(redisIds);
    if (userId)
        pipe.smIsMember(getWhatLikedKey(userId), postsIds);

    const results = await pipe.exec();
    const [likeCounts, likedList] = [results[0] as string[] | undefined | null, results[1] as string[] | undefined | null];
    if (!likeCounts)
        return new Map();

    return new Map(likeCounts.map((likeCount, i) => (
        [ postsIds[i],
        { count: likeCount || '0',
          liked: (likedList ? likedList[i] : '0') === '1', }]
    )));
}

async function arePostsLiked(userId: string, postIds: string[]) {
    const whatUserLikedKey = getWhatLikedKey(userId);
    const isLiked = await redis.smIsMember(whatUserLikedKey, postIds);

    return isLiked;
} 

// TODO ensure that modifications like incr and decr are always done by existing user and post
async function modifyPost(userId: string, postId: string, operation: 'incr' | 'decr') {
    const pipe = redis.multi();

    const likeCountKey = getLikeCountKey(postId);

    pipe[operation](likeCountKey);
    pipe[operation === 'incr' ? 'sAdd' : 'sRem'](getWhatLikedKey(userId), postId);

    const results = await pipe.exec();
    console.log(results[1]);
    return results[0] as (number | undefined | null) || 0;
}

async function modifyPosts(userId: string, postsIds: string[], operation: 'incr' | 'decr') {
    const shouldBeLiked = operation === 'incr'; 
    const whatUserLikedKey = getWhatLikedKey(userId);

    const pipe = redis.multi();

    const assignPostIds: string[] = [];

    const areLiked = await redis.smIsMember(whatUserLikedKey, postsIds);
    areLiked.forEach((isLiked, i) => {
        // skip when different than expected
        if (isLiked !== shouldBeLiked)
            return;
        
        // remember to which post assign like count to
        assignPostIds.push(postsIds[i]);
        // schedule incr or decr command
        const likeCountKey = getLikeCountKey(postsIds[i]);
        pipe[operation](likeCountKey);
    });
    if (assignPostIds.length === 0)
        return new Map<string, (number | null)>();
    
    if (operation === 'incr') {
        await redis.sAdd(whatUserLikedKey, assignPostIds);
    } else {
        await redis.sRem(whatUserLikedKey, assignPostIds);
    }
    
    // run all commands together
    const results = await pipe.exec();
    const postsLikes: Map<string, (number | null)> = new Map();
    // assign likes to posts likes count
    results.forEach((result, i) => {
        postsLikes.set(assignPostIds[i], result as (number | undefined | null) || 0); 
    }); 
    
    return postsLikes;
}

/**
 * stores functions which will use write and read operations in db
 */
export const actions = {

    /**
     * 
     * @param userId 
     * @param postId 
     * @returns current number of likes or null when post's already liked
     */
    likePost: async (userId: string, postId: string): Promise<number | null> => {
        const isLiked = (await arePostsLiked(userId, [postId]))[0];
        if (isLiked)
            return null;

        return modifyPost(userId, postId, 'incr');
    },

    /**
     * 
     * @param userId 
     * @param postId 
     * @returns current number of likes or null when post's already not liked
     */
    dislikePost: async (userId: string, postId: string): Promise<number | null> => {
        const isLiked = (await arePostsLiked(userId, [postId]))[0];
        if (!isLiked)
            return null;

        return modifyPost(userId, postId, 'decr');
    },

    /**
     * 
     * @param userId 
     * @param postIds
     * @returns current number of likes for every post except the ones unaffected
     */
    likePosts: async (userId: string, postsIds: string[]) => {
        return modifyPosts(userId, postsIds, 'incr');
    },

    /**
     * 
     * @param userId 
     * @param postIds
     * @returns current number of likes for every post except the ones unaffected
     */
    dislikePosts: async (userId: string, postsIds: string[]) => {
        return modifyPosts(userId, postsIds, 'decr');
    },
} 