import { getUserToken, setUserEmailVerified } from '@/yap/db/services/users';
import getURL from '@/yap/libs/getUrl';
import { permanentRedirect } from 'next/navigation';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    const token = searchParams.get('token');

    if (email === null || token === null)
        return new NextResponse(JSON.stringify({ error: 'Query parameters email and token must be defined' }), { status: 400 });


    const expectedToken = await getUserToken(email);
    if (token !== expectedToken) {
        return new NextResponse(JSON.stringify({ error: 'Verification error' }), { status: 401 });
    }

    await setUserEmailVerified(email);
    permanentRedirect(getURL('/auth/signup/success'));
}