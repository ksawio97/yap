import { getPasswordTokenWithUsernameById } from '@/yap/db/services/passwordResetTokens';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');
    const tokenId = searchParams.get('tokenId');

    if (!token || !tokenId)
        return new NextResponse(JSON.stringify({
            error: 'Query parameters token and tokenId must be defined'
        }), { status: 400 });

    const expectedToken = await getPasswordTokenWithUsernameById(tokenId);
    if (!expectedToken || expectedToken.token !== token)
        return new NextResponse(JSON.stringify({
            error: 'Token with specified id doesn\'t exist or is invalid'
        }), { status: 404 });
    

    return new NextResponse(JSON.stringify({
        name: expectedToken.user.name
    }), { status: 200 });
}