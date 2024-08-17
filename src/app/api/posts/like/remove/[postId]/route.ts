import { actions } from '@/yap/db/services/likes';
import checkPostExistence from '@/yap/libs/api/checkPostExistence';
import createResponse from '@/yap/libs/api/createResponse';
import { checkUserExistence } from '@/yap/libs/api/getUserIdFromSession';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
    const { userId, userNotFound } = await checkUserExistence(req);
    if (userNotFound)
        return userNotFound;

    const maybePostId = req.nextUrl.toString().split('/').pop();
    const { postId, postNotFound } = await checkPostExistence(maybePostId);
    if (postNotFound)
        return postNotFound;

    const likes = await actions.dislikePost(userId, postId);

    if (likes === null)
        return createResponse({
            message: 'User has\'t liked this post',
            status: 409
        })
    
    return createResponse({
        message: 'Success',
        status: 200,
        data: {
            likes
        }
    })
}