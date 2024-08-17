import { actions } from '@/yap/db/services/likes';
import createResponse from '@/yap/libs/api/createResponse';
import { checkUserExistence } from '@/yap/libs/api/getUserIdFromSession';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
    const { userId, userNotFound } = await checkUserExistence(req);
    if (userNotFound)
        return userNotFound;

    const { postsIds } = await req.json();
    // ensure it's defined and its array of strings
    if (!postsIds || !Array.isArray(postsIds) || postsIds.every((postId) => typeof postId === 'string'))
        return createResponse({
            message: 'postIds body parameter not provided or isn\'t string array',
            status: 400
        });

    const likes = await actions.dislikePosts(userId, postsIds);
    return createResponse({
        message: 'Success',
        status: 200,
        data: {
            likes
        }
    })
}