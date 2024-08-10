import { redis } from '@/yap/db/redis/client';
import { getPostById } from '@/yap/db/services/posts';
import createResponse from '@/yap/libs/api/createResponse';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
    const postId = req.nextUrl.toString().split('/').pop();

    if (!postId || !(await getPostById(postId)))
        return createResponse({
            message: "Post with specified id does't exist",
            status: 404
        });
    
    const likes = await redis.get(`post:${postId}:like_count`);
    return createResponse({
        message: 'Success',
        status: 200,
        data: {
            likes
        }
    })
}