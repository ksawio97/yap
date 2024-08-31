'use server'

import { cookies } from "next/headers";

export async function getCsrfToken() {
    const token = cookies().get(process.env.NODE_ENV === "production" ? '_Host-authjs.csrf-token' : 'authjs.csrf-token')?.value.split('|')[0];

    if (!token)
        return null;

    return token;
}