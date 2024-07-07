'use client'

import SingupForm from "@/yap/components/Auth/SingupForm";

export default function Signup() {
    return (
        <div className="justify-self-center h-fit pt-32 w-3/6 flex flex-col gap-4">
            <h2 className="sm:text-6xl text-5xl p-3 text-center">Sign up</h2>
            <div className="w-1/2 self-center">
                <SingupForm>
                </SingupForm>
            </div>
        </div>
    );
}