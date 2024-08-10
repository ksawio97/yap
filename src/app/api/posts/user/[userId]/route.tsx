import { attachLikesInfoToPosts } from '@/yap/db/helpers/likes_posts/likesToPosts';
import { getPostsByUserId } from '@/yap/db/services/posts';
import getUserIdFromSession from '@/yap/libs/api/getUserIdFromSession';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const userId = req.nextUrl.toString().split('/').pop();

    if (userId === undefined) {
        return new NextResponse(JSON.stringify({ error: 'Query parameter userId is not defined' }), { status: 400 });
    }
    const posts = await getPostsByUserId(userId);
    if (posts === null) {
        return new NextResponse(JSON.stringify({ error: 'Posts not found' }), { status: 404 });
    }

    const reqUserId = await getUserIdFromSession(req);

    const postsWithLikeInfo = await attachLikesInfoToPosts(posts, reqUserId || undefined);
    return NextResponse.json(postsWithLikeInfo);
}