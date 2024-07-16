'use client'

import ContentAsPageWrapper from "@/yap/components/Wrappers/ContentAsPageWrapper";

export default function EmailVerificationSent() {
    return (
        <ContentAsPageWrapper>
            <div className="w-full flex flex-col items-center md:gap-y-8 gap-y-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="md:w-36 w-24 animate-pulse">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                <h1 className="md:text-3xl text-xl">Email verification has been sent</h1>
                <p className="text-gray-500">Check your inbox for verification link</p>
            </div>
        </ContentAsPageWrapper>
    );
}