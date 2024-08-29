'use server'

import { decode, getToken, JWT } from "next-auth/jwt";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export async function getRequestJwtToken(req: NextRequest) { 
    return getToken({
        req, 
        secret: process.env.NEXTAUTH_SECRET!,
        secureCookie: process.env.NODE_ENV === "production",
        salt:
        process.env.NODE_ENV === "production"
            ? "__Secure-authjs.session-token"
            : "authjs.session-token",
    });
}

export async function getCookiesJwtToken(): Promise<JWT & { id: string} | null> {
    const token = cookies().get('authjs.session-token')?.value;
    if (!token)
        return null;

    return decode({
        token,
        secret: process.env.NEXTAUTH_SECRET!,
        salt: process.env.NODE_ENV === "production"
        ? "__Secure-authjs.session-token"
        : "authjs.session-token",
    });
}