'use client';

import ResetPasswordForm from "@/yap/components/Auth/ResetPasswordForm";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ResetPassword() {
    const router = useRouter();
    const [email, setEmail] = useState('');

    return (
        <div className="justify-self-center h-fit sm:w-1/2 md:w-1/2 lg:w-1/4 w-full flex flex-col gap-4 md:pt-24 lg:pt-32">
            <h1 className="sm:text-4xl text-3xl">Forgot password</h1>
            <span className="h-px w-full bg-gray-500"></span>
            { email !== '' ? 
            <div className="flex flex-col gap-4">
                <p className="bg-green-200 text-green-950 p-4">
                    Reset password link was sent successfully to {email}
                </p>
                <div className="py-3 px-5 rounded-md bg-amber-500 w-fit h-fit select-none hover:cursor-pointer" onClick={() => router.back()}>Go Back</div>
            </div>

                :
            <ResetPasswordForm onSuccess={(email) => setEmail(email)}></ResetPasswordForm>
            }
        </div>
    );
}