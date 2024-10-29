import { NextRequest, NextResponse } from 'next/server';
import { deletePostByUser } from '@/yap/db/services/posts'
import { checkUserExistence } from '@/yap/libs/api/getUserIdFromSession';

export async function GET(req: NextRequest) {
    const id = req.nextUrl.toString().split('/').pop();

    if (id === undefined) {
        return new NextResponse(JSON.stringify({ error: 'Query parameter id is not defined' }), { status: 400 });
    }
    const { userId, userNotFound } = await checkUserExistence(req);
    if (userNotFound)
        return userNotFound

    const { error } = await deletePostByUser(id, userId);
    // it might not be not found error but for simplicity let it be
    if (error) {
        return new NextResponse(JSON.stringify({ error}), { status: 404 });
    }

    return NextResponse.json({ message: 'Success' });
}