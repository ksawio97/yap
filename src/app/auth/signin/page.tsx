'use server'

import SigninForm from "@/yap/components/Auth/SigninForm";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Singin() {
    const csrfToken = cookies().get('next-auth.csrf-token')?.value.split('|')[0] as string;

    return (
        <div className="justify-self-center h-fit lg:w-1/4 flex flex-col gap-4 md:pt-24 lg:pt-32">
            <h2 className="sm:text-6xl text-5xl p-3 text-center">Sign in</h2>
            <div className="w-full self-center">
                <SigninForm csrfToken={csrfToken}/>
            </div>
            <div className="self-center flex flex-col gap-8">
                <Link href="/auth/signup"><span className="text-emerald-300 text-nowrap">Forgot password?</span></Link>
                <div className="h-px bg-white w-4/5 self-center"></div>
                <Link href="/auth/signup" className="justify-self-center">New here? <span className="text-emerald-300 text-nowrap">Sign up</span></Link>
            </div>
        </div>
    );
}