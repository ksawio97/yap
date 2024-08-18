import { actions } from '@/yap/db/services/likes';
import createResponse from '@/yap/libs/api/createResponse';
import { checkUserExistence } from '@/yap/libs/api/getUserIdFromSession';
import checkIsStringArray from '@/yap/libs/checkIsStringArray';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
    const { userId, userNotFound } = await checkUserExistence(req);
    if (userNotFound)
        return userNotFound;

    const { likePostsIds, dislikePostsIds } = await req.json();

    // ensure it's defined and its array of strings
    const [likeList, dislikeList] = [checkIsStringArray(likePostsIds), checkIsStringArray(dislikePostsIds)];
    if (!likeList || !dislikeList)
        return createResponse({
            message: 'likePostsIds and dislikePostsIds body parameters not provided or aren\'t string arrays',
            status: 400
        });

    const likes = await actions.likePosts(userId, likeList);
    const dislikes = await actions.dislikePosts(userId, dislikeList);
    
    return createResponse({
        message: 'Success',
        status: 200,
        data: {
            likes: Array.from(likes.entries()),
            dislikes: Array.from(dislikes.entries())
        }
    })
}