import { getPostLikesInfo } from '@/yap/db/services/likes';
import checkPostExistence from '@/yap/libs/api/checkPostExistence';
import createResponse from '@/yap/libs/api/createResponse';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
    const maybePostId = req.nextUrl.toString().split('/').pop();

    const { postId, postNotFound } = await checkPostExistence(maybePostId);
    if (postNotFound)
        return postNotFound;
    
    // TODO delete this line, redis shouldn't be used outside db folder 
    const { count } = await getPostLikesInfo(postId);
    return createResponse({
        message: 'Success',
        status: 200,
        data: {
            likes: count
        }
    })
}