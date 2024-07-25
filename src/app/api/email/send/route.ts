import { sendVerificationEmail } from '@/yap/app/actions/auth/email';
import { getUserByEmail } from '@/yap/db/services/users';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const emailValidator = z.string().email({ message: 'Invalid email address' });
export async function POST(req: NextRequest) {
    let { email } = await req.json();

    // expects encoded email
    email = typeof email === 'string' ? decodeURIComponent(email) : undefined;
    if (!email || !emailValidator.safeParse(email).success) {
        return new NextResponse(JSON.stringify({
            error: "Valid email body argument is required"
        }), { status: 400 });
    }

    const user = await getUserByEmail(email);
    if (user === null || user.emailVerified) {
        return new NextResponse(JSON.stringify({
            error: "User doesn't exist or is already verified"
        }), { status: 404 });   
    }
    try {
        await sendVerificationEmail(email);
    } catch (error) {
        console.error(error);
        return new NextResponse(JSON.stringify({
            error: "Failed to send email"
        }), { status: 500 })
    }

    return new NextResponse(JSON.stringify({
        error: "Email verification has been sent"
    }), { status: 200 })
}