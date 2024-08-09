import { redis } from '@/yap/db/redis/client';
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
    
    const likesKey = `post:${postId}:likes`;
    const userId = session.id;

    if (await redis.sIsMember(likesKey, userId))
        return createResponse({
            message: 'User already liked this post',
            status: 409
        })
    // mark user as the one that liked this post
    await redis.sAdd(likesKey, userId);

    const likeCount = await redis.incr(`post:${postId}:like_count`);
    
    return createResponse({
        message: 'Success',
        status: 200,
        data: {
            likeCount
        }
    })
}