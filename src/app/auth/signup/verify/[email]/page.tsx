'use client'

import EmailIcon from "@/yap/components/icons/EmailIcon";
import WarningIcon from "@/yap/components/icons/WarningIcon";
import Loading from "@/yap/components/Loading";
import ContentAsPageWrapper from "@/yap/components/Wrappers/ContentAsPageWrapper";
import getURL from "@/yap/libs/getURL";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SendVerificationEmail() {
    const [feedback, setFeedback] = useState<{ ok: boolean, message: string } | undefined>();
    const { email } = useParams();

    useEffect(() => {
        fetch(getURL('/api/email/send'), { method: "POST", body: JSON.stringify({ email: email })})
            .then(async (response) => {
                const body: { message?: string, error?: string } = await response.json();
                if (response.ok) {
                    setFeedback({
                        ok: response.ok,
                        message: body.message || "Email verification has been sent",
                    });
                } else {
                    setFeedback({
                        ok: response.ok,
                        message: body.error || "Something went wrong",
                    });
                }
            }, (reason) => {
                console.log(reason);
            });
    }, [email]);

    return (
        <ContentAsPageWrapper>
            { !feedback ? <Loading/> :
                <div className="w-full flex flex-col items-center md:gap-y-8 gap-y-4">
                    <div className="md:w-36 w-24 animate-pulse">
                        {feedback.ok ? <EmailIcon/> : <WarningIcon/>}
                    </div>
                    <h1 className="md:text-3xl text-xl">{feedback.message}</h1>
                    <p className="text-gray-500">{ feedback.ok ? "Check your inbox for verification link" : "Email verification not successful"}</p>
                </div>
            }
        </ContentAsPageWrapper>
    );
}