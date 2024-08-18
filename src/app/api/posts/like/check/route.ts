import { getPostsLikesInfo } from '@/yap/db/services/likes';
import createResponse from '@/yap/libs/api/createResponse';
import checkIsStringArray from '@/yap/libs/checkIsStringArray';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
    const { postsIds } = await req.json();

    const postsList = checkIsStringArray(postsIds);
    // ensure it's defined and its array of strings
    if (!postsList)
        return createResponse({
            message: 'postIds body parameter not provided or isn\'t string array',
            status: 400
        });

    const likesInfo = await getPostsLikesInfo(postsList);
    // creates map [postId, likeCount]
    const likes = new Map(postsList.map<[string, string]>(postId => [postId, likesInfo.get(postId)?.count || '0']));
    return createResponse({
        message: 'Success',
        status: 200,
        data: {
            likes: Array.from(likes.entries())
        }
    })
}