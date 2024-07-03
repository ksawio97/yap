import { NextRequest, NextResponse } from 'next/server';
import { getPostById } from '@/yap/db/services/posts'

export async function GET(req: NextRequest) {
    const id = req.nextUrl.toString().split('/').pop();

    if (id === undefined) {
        return new NextResponse(JSON.stringify({ error: 'Query parameter id is not defined' }), { status: 400 });
    }
    const post = await getPostById(id);
    if (post === null) {
        return new NextResponse(JSON.stringify({ error: 'Post not found' }), { status: 404 });
    }
    return NextResponse.json(post);
}