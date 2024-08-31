'use server'

import SigninForm from "@/yap/components/Auth/form/SigninForm";
import ErrorInfo from "@/yap/components/error/ErrorInfo";
import { getCsrfToken } from "@/yap/libs/auth/getCsrfToken";
import Link from "next/link";

export default async function Signin() {
    const csrfToken = await getCsrfToken();

    return (
        <div className="justify-self-center h-fit lg:w-1/4 flex flex-col gap-4 md:pt-24 lg:pt-32">
            <h2 className="sm:text-6xl text-5xl p-3 text-center">Sign in</h2>
            <div className="w-full self-center">
                { csrfToken ? (<SigninForm csrfToken={csrfToken}/>) : <ErrorInfo error="Something went wrong..."></ErrorInfo>}
            </div>
            <div className="self-center flex flex-col gap-8">
                <Link href="/auth/reset/password"><span className="text-emerald-300 text-nowrap">Forgot password?</span></Link>
                <div className="h-px bg-white w-4/5 self-center"></div>
                <Link href="/auth/signup" className="justify-self-center">New here? <span className="text-emerald-300 text-nowrap">Sign up</span></Link>
            </div>
        </div>
    );
}