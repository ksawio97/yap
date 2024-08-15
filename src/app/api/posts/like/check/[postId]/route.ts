import { redis } from '@/yap/db/redis/client';
import { getLikeCountKey } from '@/yap/db/redis/keys';
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
    
    // TODO delete this line, redis shouldn't be used outside db folder 
    const likes = await redis.get(getLikeCountKey(postId));
    return createResponse({
        message: 'Success',
        status: 200,
        data: {
            likes
        }
    })
}