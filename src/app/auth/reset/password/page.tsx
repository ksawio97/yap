'use client';

import ResetPasswordForm from "@/yap/components/Auth/form/ResetPasswordForm";
import SuccessInfoGoBack from "@/yap/components/Auth/SuccessInfoWithButton";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ResetPassword() {
    const router = useRouter();
    const [email, setEmail] = useState('');

    return (
        <div className="justify-self-center h-fit sm:w-1/2 md:w-1/2 lg:w-1/4 w-full flex flex-col gap-4 md:pt-24 lg:pt-32">
            <h1 className="sm:text-4xl text-3xl">Reset password</h1>
            <span className="h-px w-full bg-gray-500"></span>
            { email !== '' ?  <SuccessInfoGoBack text={`Reset password link was sent successfully to ${email}`} buttonText="Go Back" onClick={() => router.back()}></SuccessInfoGoBack> :
            <ResetPasswordForm onSuccess={setEmail}></ResetPasswordForm>
            }
        </div>
    );
}