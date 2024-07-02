import { NextRequest, NextResponse } from 'next/server';
import { getPostById } from '@/yap/db/services/posts'

export async function GET(req: NextRequest, { id } : {id: string}) {
    const post = id === "" ? null : await getPostById(id);
    return NextResponse.json(post);
}