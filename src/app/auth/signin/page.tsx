'use server'

import SigninForm from "@/yap/components/Auth/SigninForm";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Singin() {
    const csrfToken = cookies().get('next-auth.csrf-token')?.value.split('|')[0] as string;

    return (
        <div className="justify-self-center h-fit pt-32 w-3/6 flex flex-col gap-4">
            <h2 className="sm:text-6xl text-5xl p-3 text-center">Sign in</h2>
            <div className="w-1/2 self-center">
                <SigninForm csrfToken={csrfToken}/>
            </div>
            <div className="self-center">
                <Link href="/auth/signup">New here? <span className="text-emerald-300">Sign up</span></Link>
            </div>
        </div>

    );
}