'use client'

import ChangePasswordForm from "@/yap/components/Auth/form/ChangePasswordForm";
import Loading from "@/yap/components/Loading";
import ContentAsPageWrapper from "@/yap/components/Wrappers/ContentAsPageWrapper";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ChangePassword() {
    const { tokenId, resetToken } = useParams();
    // null means token verification failed, undefined is base state when username is being processed
    const [username, setUsername] = useState<string | null | undefined>();
    useEffect(() => {
        fetch(`/api/password-token/verify?tokenId=${tokenId}&token=${resetToken}`)
            .then(async response => {
                const { name } = await response.json();
                setUsername(name || '');
            }, () => {
                setUsername(null);
            })
            .catch(() => {
                setUsername(null);
            })
    }, [tokenId, resetToken]);

    return (
        <>
            { username === undefined ? <Loading></Loading> : username === null ? <div className="text-red-600 text-2xl">Something went wrong...</div> :
                <ContentAsPageWrapper>
                    <h1 className="sm:text-3xl text-2xl pb-4">Changing {`'${username}'`} password</h1>
                    <div className="md:w-96 w-60">
                        <ChangePasswordForm></ChangePasswordForm>
                    </div>

                </ContentAsPageWrapper>
            }
        </>
    );
}