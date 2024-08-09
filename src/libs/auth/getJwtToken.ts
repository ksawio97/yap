'use server'

import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export default async function getJwtToken(req: NextRequest) { 
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