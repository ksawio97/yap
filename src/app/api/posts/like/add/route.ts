import { actions } from '@/yap/db/services/likes';
import createResponse from '@/yap/libs/api/createResponse';
import { checkUserExistence } from '@/yap/libs/api/getUserIdFromSession';
import checkIsStringArray from '@/yap/libs/checkIsStringArray';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
    const { userId, userNotFound } = await checkUserExistence(req);
    if (userNotFound)
        return userNotFound;

    const { postsIds } = await req.json();
    const postsList = checkIsStringArray(postsIds);
    // ensure it's defined and its array of strings
    if (!postsList)
        return createResponse({
            message: 'postIds body parameter not provided or isn\'t string array',
            status: 400
        });

    const likes = await actions.likePosts(userId, postsList);
    return createResponse({
        message: 'Success',
        status: 200,
        data: {
            likes
        }
    })
}