import { getPostsByUserId } from '@/yap/db/services/posts';
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
    return NextResponse.json(posts);
}