import { getPostsLikesInfo } from '@/yap/db/services/likes';
import createResponse from '@/yap/libs/api/createResponse';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
    const { postsIds } = await req.json();
    // ensure it's defined and its array of strings
    if (!postsIds || !Array.isArray(postsIds) || postsIds.every((postId) => typeof postId === 'string'))
        return createResponse({
            message: 'postIds body parameter not provided or isn\'t string array',
            status: 400
        });

    const likesInfo = await getPostsLikesInfo(postsIds);
    // creates map [postId, likeCount]
    const likes = new Map(postsIds.map<[string, string]>(postId => [postId, likesInfo.get(postId)?.count || '0']));
    return createResponse({
        message: 'Success',
        status: 200,
        data: {
            likes
        }
    })
}