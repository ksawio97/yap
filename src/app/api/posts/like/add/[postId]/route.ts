import { redis } from '@/yap/db/redis/client';
import { likeOrDislikePost } from '@/yap/db/services/likes';
import { getPostById } from '@/yap/db/services/posts';
import createResponse from '@/yap/libs/api/createResponse';
import getJwtToken from '@/yap/libs/auth/getJwtToken';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
    const session = await getJwtToken(req);

    if (!session || !('id' in session) || typeof session.id !== 'string')
        return createResponse({
            message: "You need to sign in",
            status: 401
        });
    
    const postId = req.nextUrl.toString().split('/').pop();

    if (!postId || !(await getPostById(postId)))
        return createResponse({
            message: "Post with specified id does't exist",
            status: 404
        });
    
    const userId = session.id;

    const likes = await likeOrDislikePost(userId, postId, false);
    if (likes === undefined)
        return createResponse({
            message: 'User already liked this post',
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