import { redis } from "../redis/client";
import { getLikeCountKey, getWhatLikedKey } from "../redis/keys";
import { dislike, areLikesCounted, like } from "../redis/post_like_count";
import { areLiked, markDislike, markLike } from "../redis/user_liked";
import { getPostById, getPostsByIds } from "./posts";
import { getUserById } from "./users";

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
    const [likeCounts, likedList] = [results[0] as string[] | undefined | null, results[1] as boolean[] | undefined | null];
    if (!likeCounts)

        return new Map();

    return new Map(likeCounts.map((likeCount, i) => (
        [ postsIds[i],
        { count: likeCount || '0',
          liked: (likedList ? likedList[i] : false) }]
    )));
}

async function arePostsLiked(userId: string, postIds: string[]) {
    const whatUserLikedKey = getWhatLikedKey(userId);
    const isLiked = await redis.smIsMember(whatUserLikedKey, postIds);

    return isLiked;
} 

async function modifyPost(userId: string, postId: string, operation: 'incr' | 'decr') {

    // user doesn't exist
    if (!await getUserById(userId))
        return null;

    // post doesn't exist in redis
    if (!(await areLikesCounted([postId]))[0]) {
        // post doesn't exist
        if (!await getPostById(postId))
            return null;
    }
    let count = 0;
    if (operation === 'incr') {
        count = (await Promise.all([like([postId]), markLike(userId, [postId])]))[0].get(postId) || 0;
    } else {
        count = (await Promise.all([dislike([postId]), markDislike(userId, [postId])]))[0].get(postId) || 0;
    }

    return count;
}

async function modifyPosts(userId: string, postsIds: string[], operation: 'incr' | 'decr') {
    if (postsIds.length === 0)
        return new Map<string, (number | null)>();

    const shouldBeLiked = operation !== 'incr'; 


    const toModify: string[] = [];

    const likesCounted = await areLikesCounted(postsIds);
    const likedInfo = await areLiked(userId, postsIds);
    const checkIfPostsExist: string[] = []

    likedInfo.forEach((isLiked, i) => {
        // skip when different than expected
        if (likesCounted)
            if (isLiked !== shouldBeLiked)
                return;
        else {
            // if does exist it can be liked, if likes aren't counted, we can't dislike
            if (shouldBeLiked)
                checkIfPostsExist.push(postsIds[i]);
            return;            
        }

        toModify.push(postsIds[i]);
    });
    toModify.push(...(await getPostsByIds(checkIfPostsExist)).map(post => post.id));

    if (toModify.length === 0)
        return new Map<string, (number | null)>();
    
    let postsLikes: Map<string, (number | null)>
    if (operation === 'incr') {
        postsLikes = (await Promise.all([like(toModify), markLike(userId, toModify)]))[0];
    } else {
        postsLikes = (await Promise.all([dislike(toModify), markDislike(userId, toModify)]))[0];
    }
    
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